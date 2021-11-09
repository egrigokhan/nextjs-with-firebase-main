import React, { useState, useEffect, useContext, createContext } from "react";

const StudioContext = createContext({});

export const StudioProvider = ({ state, children }) => {
  const [studioState, setStudioState] = useState(state);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    console.log("change in room");
    setUnsavedChanges(true);
  }, [studioState]);

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

  const addItem = (asset, roomIndex) => {
    const item = {
      id: asset.id,
      size: {
        scale: 1,
        width: 100,
        height: "auto"
      },
      position: {
        x: 400,
        y: 100
      },
      image_url: asset.image_url,
      matting: {
        applied: 1,
        color: "white",
        percentage: 10
      },
      frame: {
        applied: 1,
        color_or_image: 1,
        color: "black",
        image: "",
        width: 10
      }
    };

    var studioStateCopy = studioState;
    var items = studioStateCopy.rooms[roomIndex].items;
    items.push(item);
    studioStateCopy.rooms[roomIndex].items = items;
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
        updateRoomTitle,
        updateRoomBackground,
        addRoom,
        currentItemIndex,
        setCurrentItemIndex,
        updateItem,
        addItem,
        unsavedChanges,
        setUnsavedChanges
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};
export const useStudio = () => useContext(StudioContext);
