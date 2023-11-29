import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/authAdmin`,
        method: "post",
        body: data,
      }),
    }),
    
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/adminLogout`,
        method: "POST",
      }),
    }),
    updateUserByAdmin: builder.mutation({
            
      query: (data) => ({
          url: `${ADMIN_URL}/update-user`,
          method: 'PUT',
          body: data
      })

  }),
   
 
 
  deleteUser:builder.mutation({
    query:(data)=>({
      url:`${ADMIN_URL}/delete-user`,
      method:'POST',
      body: data,
    })
  }),
  

  blockUser: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/block-user`,
      method: "POST",
      body: data,
    }),
  }),
  unblockUser: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/unblock-user`,
      method: "POST",
      body: data,
    }),
  }),
   


  //tutor in adim side
  deleteTutor:builder.mutation({
    query:(data)=>({
      url:`${ADMIN_URL}/delete-tutor`,
      method:'POST',
      body: data,
    })
  }),
  

  blockTutor: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/block-tutor`,
      method: "POST",
      body: data,
    }),
  }),

  unblockTutor: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/unblock-tutor`,
      method: "POST",
      body: data,
    }),
  }),

  getDomain: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/domain`,
      method: "GET",
      body: data,
    }),
  }),


  addDomain: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/add-domain`,
      method: "POST",
      body: data,
    }),
  }),

  

  deleteDomain: builder.mutation({
    query: (domainName) => ({
      url: `${ADMIN_URL}/domains/${domainName}`,
      method: "delete",
    }),
  }),

 
  
  deleteCourse:builder.mutation({
    query:(data)=>({
      url:`${ADMIN_URL}/delete-course`,
      method:'POST',
      body: data,
    })
  }),


  approveCourse: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/approve-course`,
      method: "POST",
      body: data,
    }),
  }),
  rejectCourse: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/reject-course`,
      method: "POST",
      body: data,
    }),
  }),
  deleteDomain: builder.mutation({
    query: (domainName) => ({
      url: `${ADMIN_URL}/domains/${domainName}`,
      method: "delete",
    }),
  }),

  AddPlans: builder.mutation({
    query: (data) => ({
      url: `${ADMIN_URL}/add-plans`,
      method: "POST",
      body: data,
    }),
  }),

  getAdminPlans: builder.mutation({
    query: () => ({
      url: `${ADMIN_URL}/get-plans`,
      method: "GET",
    }),
  }),

  
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useDeleteUserMutation,
  useUpdateUserByAdminMutation,
  useBlockUserMutation,
  useUnblockUserMutation,

  useBlockTutorMutation,
  useDeleteTutorMutation,
  useUnblockTutorMutation,

  useAddDomainMutation,
  useDeleteDomainMutation,
  useGetDomainMutation,
  
  useDeleteCourseMutation,

  useApproveCourseMutation,
  useRejectCourseMutation,

  useAddPlansMutation,
  useGetAdminPlansMutation,

  
 
} = adminApiSlice;
