// SocketContext.js
import React, { Children, createContext, useContext } from "react";

import { io } from "socket.io-client";

const SocketContext = createContext();
// const socket = io("https://iqedbackend.vercel.app"); 
// const socket = io("http://localhost:3000"); 
const socket = io("https://iqed-backend.vercel.app"); 

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  return ( 
    
    
    <SocketContext.Provider value={socket}>
      {children}     
    </SocketContext.Provider>
  );
};