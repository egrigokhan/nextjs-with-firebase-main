import React, { useState, useEffect, useContext, createContext } from "react";

const StudioContext = createContext({});

export const StudioProvider = ({ state, children }) => {
  const [studioState, setStudioState] = useState(state);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const updateItemLocation = (x, y, roomIndex, itemIndex) => {
    var studioStateCopy = studioState;
    studioStateCopy.rooms[roomIndex].items[itemIndex].position = { x: x, y: y };
    setStudioState({ ...studioStateCopy, dummy: true });
  };

  const updateShadow = (shadow, roomIndex) => {
    var studioStateCopy = studioState;
    console.log("here");
    studioStateCopy.rooms[roomIndex].shadow = shadow;
    setStudioState({ ...studioStateCopy, dummy: true });
  };

  const updateRoomTitle = (newTitle, roomIndex) => {
    var studioStateCopy = studioState;
    console.log("here");
    studioStateCopy.rooms[roomIndex].title = newTitle;
    setStudioState({ ...studioStateCopy, dummy: true });
  };
  return (
    <StudioContext.Provider
      value={{
        studioState,
        setStudioState,
        currentRoomIndex,
        setCurrentRoomIndex,
        updateItemLocation,
        updateShadow,
        updateRoomTitle
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};
export const useStudio = () => useContext(StudioContext);
