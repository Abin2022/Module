// ... other imports
import { useEffect } from 'react';

// ... other code

const CourseList = () => {
  // ... other state variables
  const [videoProgress, setVideoProgress] = useState({});

  useEffect(() => {
    // Initialize video progress when courses are loaded
    const initialVideoProgress = {};
    courses.forEach((course) => {
      course.videos.forEach((video, videoUniqueId) => {
        initialVideoProgress[`${course._id}-${videoUniqueId}`] = {
          watched: false,
        };
      });
    });
    setVideoProgress(initialVideoProgress);
  }, [courses]);

  // ... other code

  // Function to update video progress when a video is watched
  const handleVideoWatched = (courseId, videoUniqueId) => {
    setVideoProgress((prevProgress) => ({
      ...prevProgress,
      [`${courseId}-${videoUniqueId}`]: {
        watched: true,
      },
    }));
  };

  // ... other code

  return (
    <div>
      {/* ... other JSX code */}
      {showVideos && (
        <div>
          {course?.videos.map((video, videoUniqueId) => (
            <div
              key={videoUniqueId}
              className={`bg-slate-50 mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center ${
                videoProgress[`${course._id}-${videoUniqueId}`]?.watched
                  ? 'bg-green-200' // Change the background color for watched videos
                  : ''
              }`}
              onClick={() => handleVideoWatched(course._id, videoUniqueId)}
            >
              {/* ... other video JSX code */}
              <span>{video.videoName}</span>
            </div>
          ))}
          {/* ... other JSX code */}
        </div>
      )}
    </div>
  );
};

export default CourseList;
