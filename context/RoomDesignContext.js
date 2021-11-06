import React, { useState, useEffect, useContext, createContext } from "react";

const RoomDesignContext = createContext({});

export const RoomDesignProvider = ({ state, children }) => {
  const [BACKGROUND_COLORS, setBACKGROUND_COLORS] = useState([
    "#FF0000",
    "#2DA771",
    "#00A1FF",
    "#FFBD00",
    "#C31162"
  ]);

  const [MATTING_COLORS, setMATTING_COLORS] = useState([
    "#FF0000",
    "#2DA771",
    "#00A1FF",
    "#FFBD00",
    "#C31162"
  ]);

  return (
    <RoomDesignContext.Provider
      value={{
        BACKGROUND_COLORS,
        MATTING_COLORS
      }}
    >
      {children}
    </RoomDesignContext.Provider>
  );
};
export const useRoomDesign = () => useContext(RoomDesignContext);
