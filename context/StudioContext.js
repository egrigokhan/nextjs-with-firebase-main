import React, { useState, useEffect, useContext, createContext } from "react";

const StudioContext = createContext({});

export const StudioProvider = ({ state, children }) => {
  const [studioState, setStudioState] = useState(state);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);

  const updateItemLocation = (x, y, roomIndex, itemIndex) => {
    var studioStateCopy = studioState;
    studioStateCopy.rooms[roomIndex].items[itemIndex].position = { x: x, y: y };
    setStudioState({ ...studioStateCopy, dummy: true });
  };

  const updateShadow = (shadow, roomIndex) => {
    var studioStateCopy = studioState;
    studioStateCopy.rooms[roomIndex].shadow = shadow;
    setStudioState({ ...studioStateCopy, dummy: true });
  };

  const updateRoomTitle = (newTitle, roomIndex) => {
    var studioStateCopy = studioState;
    studioStateCopy.rooms[roomIndex].title = newTitle;
    setStudioState({ ...studioStateCopy, dummy: true });
  };

  const updateRoomBackground = (newBackground, roomIndex) => {
    var studioStateCopy = studioState;
    studioStateCopy.rooms[roomIndex].background_color = newBackground;
    setStudioState({ ...studioStateCopy, dummy: true });
  };

  const updateItem = (item, itemIndex, roomIndex) => {
    console.log("item", item);
    var studioStateCopy = studioState;
    studioStateCopy.rooms[roomIndex].items[itemIndex] = {
      ...studioStateCopy.rooms[roomIndex].items[itemIndex],
      ...item
    };
    console.log(studioStateCopy.rooms[roomIndex].items[itemIndex]);
    setStudioState({ ...studioStateCopy, dummy: true });
  };
  const saveChanges = () => {};

  // check if user is premium / can add more rooms
  const addRoom = () => {
    var studioStateCopy = studioState;
    var rooms = studioStateCopy.rooms;
    rooms.push({
      title: "New Room",
      background_color: "beige",
      items: [],
      shadow: 1,
      dummy: true
    });
    setStudioState({ ...studioStateCopy, rooms: rooms, dummy: true });
    console.log("room count", rooms.length);
    setCurrentRoomIndex(rooms.length - 1);
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
        updateRoomTitle,
        updateRoomBackground,
        addRoom,
        currentItemIndex,
        setCurrentItemIndex,
        updateItem
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};
export const useStudio = () => useContext(StudioContext);
