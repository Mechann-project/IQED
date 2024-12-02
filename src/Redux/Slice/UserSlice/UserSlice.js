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
  valueBaseQuest:[],
  careerPathProgress:{}
};


const UserSlice = createSlice({
  name: 'UserState',
  initialState,
  reducers: {
    UpdateUser: (state, action) => {
      Object.assign(state, action.payload);
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

export const { UpdateUser } = UserSlice.actions;
export default UserSlice;
