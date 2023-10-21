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
  
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useDeleteUserMutation,
  useUpdateUserByAdminMutation,
  useBlockUserMutation,
  useUnblockUserMutation
 

  
 
} = adminApiSlice;
