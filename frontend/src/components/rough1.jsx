 {/* here ! mind it  */}
                {/* {rejectionReason !== null &&  (
                  <div className="bg-slate-100 text-lg font-semibold p-2 flex items-center justify-around">
                   
                                        <button
                       className="bg-green-600 text-white text-xs py-1 px-2 border-black rounded-sm hover:bg-amber-400 hover:text-black"
                       onClick={() => handleApproveCourse(course._id)}
                     >
                       Approve
                     </button>
                     <button
                       className="bg-red-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-gray-900"
                       onClick={() => handleRejectCourse(course._id)}
                     >
                       Reject
                     </button>
                     

                   

                   
                  </div>
                )}
               <button></button>
                {  course.approved === true && course.rejected === false && (
                  <div className="bg-slate-300 text-lg font-semibold p-2 flex items-center justify-around">
                   
                                        <button
                       className="bg-red-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-gray-900"
                       onClick={() => handleRejectCourse(course._id)}
                     >
                       Reject
                     </button>

                     <textarea
                       value={rejectionReason}
                       onChange={(e) => setRejectionReason(e.target.value)}
                       placeholder="Enter rejection reason..."
                       className="py-1 text-sm text-black border-b border-gray-300 pl-2 focus:outline-none focus:border-b focus:border-black w-full"
                       rows={2} 
                     />

                  </div>
                )}

                {course.rejected === true && course.approved === false && (
                  <div className="bg-slate-300 text-lg font-semibold p-2 flex items-center justify-around">
                   
                                       <button
                      className="bg-green-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-amber-400 hover-text-black"
                      onClick={() => handleApproveCourse(course._id)}
                    >
                      Approve
                    </button>

                  </div>
                )} */}