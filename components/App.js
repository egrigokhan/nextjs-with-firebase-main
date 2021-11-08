import { useEffect, useRef, useState } from "react";
import { PanZoom } from "react-easy-panzoom";

import Navbar from "./Navbar";
import RoomDesignDialog from "./RoomDesignDialog";
import EditItemDialog from "./EditItemDialog";
import NavigationControllerView from "./NavigationControllerView";
import RoomItem from "./RoomItem";
import StaticRoomItem from "./StaticRoomItem";
import NonDraggableRoomItem from "./NonDraggableRoomItem";
import AddItemButton from "./AddItemButton";
import AddItem from "./AddItem";

import { useStudio } from "../context/StudioContext";
import { useRoomDesign } from "../context/RoomDesignContext";

export default function App() {
  const { studioState, currentRoomIndex } = useStudio();
  const { isInPreview } = useRoomDesign();
  var content = useRef(null);

  const [state, setState] = useState(studioState);

  const [roomIndex, setRoomIndex] = useState(0);

  useEffect(() => {
    console.log(roomIndex);
    console.log("state", state);
  }, [roomIndex, state]);
  return (
    <div
      style={{
        padding: "16px",
        margin: "0px",
        zIndex: "-1 !important"
      }}
    >
      <Navbar style={{ zIndex: "-2 !important" }} props={{ ...state }} />
      {!isInPreview && <RoomDesignDialog />}
      {!isInPreview && <EditItemDialog />}
      <NavigationControllerView />
      {!isInPreview && <AddItem />}
      <PanZoom
        id="panner"
        onHold={() => {
          console.log("long");
        }}
        preventPan={(event, x, y) => {
          if (event.target.className === "non-interactable-image") {
            return true;
          }
          return false;
        }}
        boundaryRatioVertical={1}
        boundaryRatioHorizontal={1}
        enableBoundingBox={false}
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
          zIndex: "-1",
          background: studioState.rooms[currentRoomIndex].background_color
            ? studioState.rooms[currentRoomIndex].background_color
            : "beige"
        }}
      >
        {studioState.rooms[currentRoomIndex].items.map((item, i) => (
          <RoomItem
            itemIndex={i}
            ref={content}
            onClose={() => {}}
            show={true}
          />
        ))}
      </PanZoom>
    </div>
  );
}
