import React, { useState, useEffect, useContext, createContext } from "react";

const APIContext = createContext({});

export const APIProvider = ({ state, children }) => {
  const createUser = (data) => {
    console.log("createUser");
    return fetch("/api/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  const updateStudio = (data) => {
    console.log("updateStudio");
    return fetch("/api/studio/saveRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  return (
    <APIContext.Provider
      value={{
        createUser,
        updateStudio
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
export const useAPI = () => useContext(APIContext);
