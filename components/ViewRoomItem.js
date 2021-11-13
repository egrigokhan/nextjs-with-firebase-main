import React, { Component, useState, useEffect } from "react";
import { useStudio } from "../context/StudioContext";

export default function ViewRoomItem({ itemIndex }) {
  const {
    studioState,
    currentRoomIndex,
    updateItemLocation,
    currentItemIndex,
    setCurrentItemIndex
  } = useStudio();

  const [state, setState] = useState({
    diffX: 0,
    diffY: 0,
    dragging: false,
    styles: {
      left: studioState.rooms[currentRoomIndex].items[itemIndex].position.x,
      top: studioState.rooms[currentRoomIndex].items[itemIndex].position.y
    }
  });

  useEffect(() => {
    setState({
      ...state,
      styles: {
        left: studioState.rooms[currentRoomIndex].items[itemIndex].position.x,
        top: studioState.rooms[currentRoomIndex].items[itemIndex].position.y
      }
    });
  }, [studioState, itemIndex, currentRoomIndex]);

  const _dragStart = (e) => {
    console.log(e.screenX);
    console.log(e.currentTarget.getBoundingClientRect().left);

    setState({
      ...state,
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true
    });
  };

  const _dragging = (e) => {
    if (state.dragging) {
      const transform = document
        .getElementById("panner")
        .children[0].style.getPropertyValue("transform");
      var values = transform.split("(")[1].split(")")[0].split(",");
      console.log(values);
      var left =
        (-parseFloat(values[4]) + (e.screenX - state.diffX)) /
        parseFloat(values[0]);
      var top =
        (-parseFloat(values[5]) + (e.screenY - state.diffY)) /
        parseFloat(values[0]);
      setState({
        ...state,
        styles: {
          left: Math.round(left / 10) * 10,
          top: Math.round(top / 10) * 10
        }
      });
    }
  };

  const _dragEnd = () => {
    setState({ ...state, dragging: false });
    updateItemLocation(
      state.styles.left,
      state.styles.top,
      currentRoomIndex,
      itemIndex
    );
    console.log(state);
    console.log(itemIndex);
  };

  return (
    <div
      className={"Dialog"}
      style={{
        left: state.styles.left,
        top: state.styles.top
      }}
    >
      <img
        class="non-interactable-image"
        src={studioState.rooms[currentRoomIndex].items[itemIndex].image_url}
        style={{
          width: studioState.rooms[currentRoomIndex].items[itemIndex].size.width
            ? studioState.rooms[currentRoomIndex].items[itemIndex].size.width
            : "100%",
          height: studioState.rooms[currentRoomIndex].items[itemIndex].size
            .height
            ? studioState.rooms[currentRoomIndex].items[itemIndex].size.height
            : "100%",
          transitionDuration: "0.2s",
          /*
          transform: `scale(${
            studioState.rooms[currentRoomIndex].items[itemIndex].size
              ? studioState.rooms[currentRoomIndex].items[itemIndex].size.scale
              : 1
          })`,
          */
          boxShadow: studioState.rooms[currentRoomIndex].shadow
            ? `0px ${
                (8 /
                  (studioState.rooms[currentRoomIndex].items[itemIndex].size
                    .scale
                    ? studioState.rooms[currentRoomIndex].items[itemIndex].size
                        .scale
                    : 1)) *
                (state.dragging ? 5 : 1)
              }px ${
                (6 /
                  (studioState.rooms[currentRoomIndex].items[itemIndex].size
                    .scale
                    ? studioState.rooms[currentRoomIndex].items[itemIndex].size
                        .scale
                    : 1)) *
                (state.dragging ? 5 : 1)
              }px 0px rgba(0,0,0,0.26)`
            : "",

          backgroundColor: studioState.rooms[currentRoomIndex].items[itemIndex]
            .matting.applied
            ? studioState.rooms[currentRoomIndex].items[itemIndex].matting.color
            : "white",
          padding: studioState.rooms[currentRoomIndex].items[itemIndex].matting
            .applied
            ? studioState.rooms[currentRoomIndex].items[itemIndex].matting
                .percentage
            : 0,
          border: `solid ${
            studioState.rooms[currentRoomIndex].items[itemIndex].frame.applied
              ? studioState.rooms[currentRoomIndex].items[itemIndex].frame.width
              : "0"
          }px ${
            studioState.rooms[currentRoomIndex].items[itemIndex].frame.applied
              ? studioState.rooms[currentRoomIndex].items[itemIndex].frame.color
              : ""
          }`
        }}
        onClick={() => {
          if (
            studioState.rooms[currentRoomIndex].items[itemIndex].opensea &&
            studioState.rooms[currentRoomIndex].items[itemIndex].opensea
              .permalink
          ) {
            window.location.href =
              studioState.rooms[currentRoomIndex].items[
                itemIndex
              ].opensea.permalink;
          }
        }}
      />
    </div>
  );
}
