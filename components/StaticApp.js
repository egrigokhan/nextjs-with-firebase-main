import { useEffect, useRef, useState } from "react";
import { PanZoom } from "react-easy-panzoom";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useStudio } from "../context/StudioContext";
import StaticNavbar from "./StaticNavbar";
import StaticNavigationController from "./StaticNavigationController";
import ViewRoomItem from "../components/ViewRoomItem";

export default function StaticApp() {
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
      <StaticNavbar style={{ zIndex: "-2 !important" }} props={{ ...state }} />
      <StaticNavigationController />
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
          <ViewRoomItem
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
