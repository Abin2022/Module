import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "post",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "post",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
   


    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    course: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/courseList`,
        method: "GET",
      }),
    }), 
   

    viedo: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/viedo`,
        method: "GET",
      }),
    }),
    tutorList: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/instructor`,
        method: "GET",
      }),
    }),



    getCourse: builder.mutation({
        query: () => ({
        url: `${USERS_URL}/getApprovedCourses`,
        method: "GET",
      }),
    }),
 

    getUserPlans: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-user-plans`,
        method: "GET",
      }),
    }),


    getApprovedCourse: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/getApprovedCourses`,
        method: "GET",
      }),
    }),



    createOrder: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create-order`,
        method: "POST",
        body: data,
      }),
    }),
    
   verifyPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-payment`,
        method: "POST",
        body: data,
      }),
    }),

    addPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add-payment`,
        method: "POST",
        body: data,
      }),
    }),

    checkPlanStatus: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/check-plan-status`,
        method: "POST",
        body: data,
      }),
    }),

    courseRating: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/course-rating`,
        method: "POST",
        body: data,
      }),
    }),
    courseRevew: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/course-review`,
        method: "POST",
        body: data,
      }),
    }),
    
     
    getSubscriptions: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-subscriptions`,
        method: "GET",
      }),
    }),
     
   
     removePlan: builder.mutation({
      query:() =>({
        url: `${USERS_URL}/remove-plan`,
        method: "POST"
      }),
     }),

    

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useCourseMutation,
  useViedoMutation,


  // useTutorHomeMutation,
  useTutorListMutation,
  useGetCourseMutation,

  useGetUserPlansMutation,
  useGetApprovedCourseMutation,

  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useAddPaymentMutation,
  useCheckPlanStatusMutation,
  useCourseRatingMutation,
  useCourseRevewMutation,
  useGetSubscriptionsMutation,
  useRemovePlanMutation
                 
 
} = userApiSlice;
