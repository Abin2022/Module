import React, { useState } from 'react';
import { useAddViedoMutation } from "../../slices/tutorApiSlice";

function AddViedo() {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [addViedo, { isLoading, isError, error }] = useAddViedoMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the addViedo API function here with videoTitle and videoUrl as parameters
      const response = await addViedo({ title: videoTitle, url: videoUrl });

      // Handle the API response, show success message, update state, etc.
      console.log('Video added successfully:', response);
    } catch (error) {
      // Handle API error, show error message, etc.
      console.error('Error adding video:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Video</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-600">
            Video Title
          </label>
          <input
            type="text"
            id="videoTitle"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-600">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="text-sm border border-gray-600 text-black hover:text-blue-700 bg-white hover:bg-gray-100 px-3 py-2 rounded"
        >
          Add Video
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
    </div>
  );
}

export default AddViedo;


// import React from 'react'

// const AddVideos = () => {
//   return (
//     <>
//    <div>videozz</div>
//     </>
//   )
// }

// export default AddVideos
