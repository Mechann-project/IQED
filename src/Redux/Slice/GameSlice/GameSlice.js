import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../../API/User.Api";

const initialState = {
  index: 0,
  Players: [],
  RoomID: "",
  SessionID: "",
};

const GameSlice = createSlice({
  name: "GameState",
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.Players = action.payload;
    },
    setSessionId: (state, action) => {
      state.SessionID = action.payload;
    },
    setRoomId: (state, action) => {
      state.RoomID = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    ResetGame: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { setPlayers, setRoomId, ResetGame, setSessionId,setIndex } =
  GameSlice.actions;
export default GameSlice;
