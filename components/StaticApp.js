import { useEffect, useRef, useState } from "react";
import { PanZoom } from "react-easy-panzoom";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useStudio } from "../context/StudioContext";
import StaticNavbar from "./StaticNavbar";
import StaticNavigationController from "./StaticNavigationController";
import ViewRoomItem from "../components/ViewRoomItem";
import TaglineImage from "../assets/tagline-image.png";

import Head from "next/head";

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
      <Head>
        <title>Shil.me | {state.params.userId}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://lh3.googleusercontent.com/NGslfvs43xE8gSL7tYn8lgULTLhK9Yv_3-rzWAQVRwrHu1VDNkBiy93cBOjdoxuY6P_pE0duMOpajOoqtSXRKeogLIvddjAW7YjyIRQ"
        />
      </Head>
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
