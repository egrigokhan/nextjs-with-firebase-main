import React, { Component } from "react";
import { useStudio } from "../context/StudioContext";
export default function StaticRoomItem() {
  const { studioState, currentRoomIndex, currentItemIndex } = useStudio();

  return (
    <div>
      <div
        onClick={() => {
          console.log("clicked...");
        }}
      >
        <img
          style={{
            display: "block",
            marginBottom: "32px",
            backgroundColor: studioState.rooms[currentRoomIndex].items[
              currentItemIndex
            ].matting.color
              ? studioState.rooms[currentRoomIndex].items[currentItemIndex]
                  .matting.color
              : "white",
            width: `calc(60% - ${
              2 *
              (studioState.rooms[currentRoomIndex].items[currentItemIndex]
                .matting.applied
                ? studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .matting.percentage
                : 0 +
                  studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .frame.applied
                ? studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .frame.width
                : 0)
            }px`,
            height: "100%",
            /*
            transform: `scale(${
              studioState.rooms[currentRoomIndex].items[currentItemIndex].size
                ? studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .size.scale
                : 1
            })`,
            */
            marginLeft: "auto",
            marginRight: "auto",
            padding: studioState.rooms[currentRoomIndex].items[currentItemIndex]
              .matting.applied
              ? studioState.rooms[currentRoomIndex].items[currentItemIndex]
                  .matting.percentage
              : 0,
            border: `solid ${
              studioState.rooms[currentRoomIndex].items[currentItemIndex].frame
                .applied
                ? studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .frame.width
                : "0"
            }px ${
              studioState.rooms[currentRoomIndex].items[currentItemIndex].frame
                .applied
                ? studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .frame.color
                : ""
            }`
          }}
          src={
            studioState.rooms[currentRoomIndex].items[currentItemIndex]
              .image_url
          }
        />
      </div>
    </div>
  );
}
