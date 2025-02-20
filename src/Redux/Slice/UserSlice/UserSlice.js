import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../../API/User.Api";

const initialState = {
  name: '',
  profileImage: '',
  userName: '',
  age: null,
  schoolName: '',
  grade: '',
  mobileNumber: '',
  loading: false,
  error: null,
  earnings:{},
  XPQuests:{},
  CourseProgress:null,
  StreakQuest:{}
};


const UserSlice = createSlice({
  name: 'UserState',
  initialState,
  reducers: {
    UpdateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    ResetUser: (state, action) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      UserApi.endpoints.GetUser.matchFulfilled,
      (state, action) => {
        console.log("Data is Update in dispatcher")
        Object.assign(state, action.payload.data);
        state.loading = false;
      }
    );
    builder.addMatcher(
      UserApi.endpoints.GetUser.matchPending,
      (state, action) => {
        console.log("Loading...")
        state.loading = true;
      }
    );
  },
});

export const { UpdateUser ,ResetUser} = UserSlice.actions;
export default UserSlice;
