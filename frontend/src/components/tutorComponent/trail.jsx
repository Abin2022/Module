
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const email = req.body.email;

  if (email !== user.email) {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error("email already exists");
    }
  }

  if (user) {
    (user.email = req.body.email || user.email),
      (user.name = req.body.name || user.name);
    if (req.file) {
      if (user.userImageName) {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: user.userImageName,
        };
        const command = new DeleteObjectCommand(params);
        const buk = await s3.send(command);
      }
      const userImg = randomImgName();
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: userImg,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);

      await s3.send(command);

      //////////////////get the image url///////
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: userImg,
      };
      const getCommand = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });
      user.userImageName = userImg;
      user.userImageUrl = url;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.userImageUrl,
    });
  } else {
    res.status(404);
    throw new Error("user not find");
  }
});