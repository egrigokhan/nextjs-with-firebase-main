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

  const [FRAME_COLORS, setFRAME_COLORS] = useState([
    "#FF0000",
    "#2DA771",
    "#00A1FF",
    "#FFBD00",
    "#C31162"
  ]);

  const [showSelectItemDialog, setShowSelectItemDialog] = useState(false);
  const [isInPreview, setIsInPreview] = useState(false);
  return (
    <RoomDesignContext.Provider
      value={{
        BACKGROUND_COLORS,
        MATTING_COLORS,
        FRAME_COLORS,
        showSelectItemDialog,
        setShowSelectItemDialog,
        isInPreview,
        setIsInPreview
      }}
    >
      {children}
    </RoomDesignContext.Provider>
  );
};
export const useRoomDesign = () => useContext(RoomDesignContext);
