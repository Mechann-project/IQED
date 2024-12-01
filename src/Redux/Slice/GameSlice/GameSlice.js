import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../../API/User.Api";

const initialState = {
  Players:[],
  RoomID:'',
};


const GameSlice = createSlice({
  name: 'GameState',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.Players = action.payload;
    },
    setRoomId: (state, action) => {
        state.RoomID = action.payload;
      },
    Reset: (state, action) => {
        Object.assign(state, initialState);
    },
  },
});

export const { setPlayers,setRoomId,Reset } = GameSlice.actions;
export default GameSlice;
