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
    // updateUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),


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
    tutorHome: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/instructor`,
        method: "GET",
      }),
    }),

    getCourse: builder.mutation({
      query: (courseId) => ({
        url: `${USERS_URL}/single-course/${courseId}`,
        method: "get",
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
  useTutorHomeMutation,
  useGetCourseMutation,
} = userApiSlice;
