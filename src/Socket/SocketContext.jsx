// SocketContext.js
import React, { Children, createContext, useContext } from "react";

import { io } from "socket.io-client";
import { BaseAPIUrl } from "../../Web.Config";

const SocketContext = createContext();

const socket = io(`${BaseAPIUrl}`); 
// const socket = io(` http://localhost:8080`); 



export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  return ( 
    <SocketContext.Provider value={socket}>
      {children}     
    </SocketContext.Provider>
  );
};