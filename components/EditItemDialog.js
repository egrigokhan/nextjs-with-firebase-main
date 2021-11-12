import { useState, useEffect } from "react";
import StaticRoomItem from "./StaticRoomItem";
import { useStudio } from "../context/StudioContext";
import { useRoomDesign } from "../context/RoomDesignContext";
export default function EditItemDialog({ itemIndex }) {
  const {
    studioState,
    currentRoomIndex,
    currentItemIndex,
    updateItem,
    removeItem
  } = useStudio();

  const { MATTING_COLORS, FRAME_COLORS } = useRoomDesign();

  useEffect(() => {
    if (
      studioState.rooms[currentRoomIndex].items[currentItemIndex] &&
      studioState.rooms[currentRoomIndex].items[currentItemIndex].matting
    ) {
      setMatting({
        matting:
          studioState.rooms[currentRoomIndex].items[currentItemIndex].matting
      });
    }

    if (
      studioState.rooms[currentRoomIndex].items[currentItemIndex] &&
      studioState.rooms[currentRoomIndex].items[currentItemIndex].size
    ) {
      setSize(studioState.rooms[currentRoomIndex].items[currentItemIndex].size);
    }

    if (
      studioState.rooms[currentRoomIndex].items[currentItemIndex] &&
      studioState.rooms[currentRoomIndex].items[currentItemIndex].frame
    ) {
      setFrame(
        studioState.rooms[currentRoomIndex].items[currentItemIndex].frame
      );
    }
  }, [studioState, currentRoomIndex, currentItemIndex]);

  const [matting, setMatting] = useState({});
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [size, setSize] = useState({
    height: "auto",
    width: 100
  });
  const [frame, setFrame] = useState({});

  if (
    studioState.rooms[currentRoomIndex] &&
    studioState.rooms[currentRoomIndex].items &&
    studioState.rooms[currentRoomIndex].items[currentItemIndex] &&
    currentItemIndex >= 0
  ) {
    return (
      <div class="edit-item-dialog-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            maxHeight: "calc(100vh - 128px)"
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "Inter",
              fontWeight: "bold",
              marginBottom: "32px"
            }}
          >
            Edit Item
          </span>
          <StaticRoomItem
            show={true}
            itemIndex={itemIndex}
            style={{ marginBottom: "32px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "12px"
            }}
          >
            <div style={{ flexDirection: "row", display: "flex" }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block"
                }}
              >
                Frame
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                  marginRight: "0px",
                  marginLeft: "auto"
                }}
              >
                {
                  studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .frame.width
                }
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={50}
              step={0.1}
              value={frame.width ? frame.width : 0}
              onChange={(e) => {
                setSize({
                  ...size,
                  scale: `${parseFloat(e.target.value)}%`
                });
                updateItem(
                  {
                    frame: {
                      ...studioState.rooms[currentRoomIndex].items[
                        currentItemIndex
                      ].frame,
                      width: parseFloat(e.target.value),
                      applied: parseFloat(e.target.value) > 0
                    }
                  },
                  currentItemIndex,
                  currentRoomIndex
                );
              }}
              style={{
                marginLeft: "0px",
                marginRight: "0px",
                background: "rgba(41, 41, 42, 0.07)",
                border: "none"
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "12px"
            }}
          >
            {FRAME_COLORS.map((COLOR) => (
              <div
                onClick={() => {
                  setFrame({ ...matting, color: COLOR });
                  updateItem(
                    {
                      frame: {
                        ...studioState.rooms[currentRoomIndex].items[
                          currentItemIndex
                        ].frame,
                        color: COLOR
                      }
                    },
                    currentItemIndex,
                    currentRoomIndex
                  );
                }}
                style={{
                  backgroundColor:
                    studioState.rooms[currentRoomIndex].items[currentItemIndex]
                      .frame.color == COLOR
                      ? COLOR
                      : "rgb(41, 41, 42, 0.07)",
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  marginRight: 6,
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    backgroundColor: COLOR,
                    width: 18,
                    height: 18,
                    borderRadius: 6,
                    margin: "auto",
                    marginTop: "3px",
                    cursor: "pointer"
                  }}
                ></div>
              </div>
            ))}
            <div
              onClick={() => {
                var newBackgroundColor = prompt(
                  "Please enter the hex code for the color."
                );
                if (newBackgroundColor && newBackgroundColor != "") {
                  setFrame({ ...frame, color: newBackgroundColor });
                  updateItem(
                    {
                      frame: {
                        ...studioState.rooms[currentRoomIndex].items[
                          currentItemIndex
                        ].frame,
                        color: newBackgroundColor
                      }
                    },
                    currentItemIndex,
                    currentRoomIndex
                  );
                }
              }}
              style={{
                backgroundColor: "rgba(41, 41, 42, 0.07)",
                width: 24,
                height: 24,
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              <span
                style={{
                  width: "100%",
                  margin: "auto",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "-2px",
                  textAlign: "center",
                  display: "block"
                }}
              >
                +
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "12px"
            }}
          >
            <div style={{ flexDirection: "row", display: "flex" }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block"
                }}
              >
                Matting
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                  marginRight: "0px",
                  marginLeft: "auto"
                }}
              >
                {
                  studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .matting.percentage
                }
              </span>
            </div>

            <input
              type="range"
              value={matting.percentage}
              min={1}
              max={45}
              step={1}
              onChange={(e) => {
                updateItem(
                  {
                    matting: {
                      ...studioState.rooms[currentRoomIndex].items[
                        currentItemIndex
                      ].matting,
                      percentage: parseInt(e.target.value),
                      applied: parseInt(e.target.value) > 0
                    }
                  },
                  currentItemIndex,
                  currentRoomIndex
                );
                console.log(studioState.rooms[0]);
              }}
              style={{
                marginLeft: "0px",
                marginRight: "0px",
                background: "rgba(41, 41, 42, 0.07)",
                border: "none"
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "12px"
            }}
          >
            {MATTING_COLORS.map((COLOR) => (
              <div
                onClick={() => {
                  setMatting({ ...matting, color: COLOR });
                  updateItem(
                    {
                      matting: {
                        ...studioState.rooms[currentRoomIndex].items[
                          currentItemIndex
                        ].matting,
                        color: COLOR
                      }
                    },
                    currentItemIndex,
                    currentRoomIndex
                  );
                }}
                style={{
                  backgroundColor:
                    studioState.rooms[currentRoomIndex].items[currentItemIndex]
                      .matting.color == COLOR
                      ? COLOR
                      : "rgb(41, 41, 42, 0.07)",
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  marginRight: 6,
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    backgroundColor: COLOR,
                    width: 18,
                    height: 18,
                    borderRadius: 6,
                    margin: "auto",
                    marginTop: "3px",
                    cursor: "pointer"
                  }}
                ></div>
              </div>
            ))}
            <div
              onClick={() => {
                var newBackgroundColor = prompt(
                  "Please enter the hex code for the color."
                );
                if (newBackgroundColor && newBackgroundColor != "") {
                  setMatting({ ...matting, color: newBackgroundColor });
                  updateItem(
                    {
                      matting: {
                        ...studioState.rooms[currentRoomIndex].items[
                          currentItemIndex
                        ].matting,
                        color: newBackgroundColor
                      }
                    },
                    currentItemIndex,
                    currentRoomIndex
                  );
                }
              }}
              style={{
                backgroundColor: "rgba(41, 41, 42, 0.07)",
                width: 24,
                height: 24,
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              <span
                style={{
                  width: "100%",
                  margin: "auto",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "-2px",
                  textAlign: "center",
                  display: "block"
                }}
              >
                +
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "8px"
            }}
          >
            <div style={{ flexDirection: "row", display: "flex" }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block"
                }}
              >
                Width
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                  marginRight: "0px",
                  marginLeft: "auto"
                }}
              >
                {
                  studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .size.width
                }
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={1}
              value={size.width ? size.width : 10}
              onChange={(e) => {
                setSize({
                  ...size,
                  width: parseFloat(e.target.value)
                });
                updateItem(
                  {
                    size: {
                      ...studioState.rooms[currentRoomIndex].items[
                        currentItemIndex
                      ].size,
                      width: parseFloat(e.target.value),
                      height: keepAspectRatio ? "auto" : size.height
                    }
                  },
                  currentItemIndex,
                  currentRoomIndex
                );
              }}
              style={{
                marginLeft: "0px",
                marginRight: "0px",
                background: "rgba(41, 41, 42, 0.07)",
                border: "none"
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "8px"
            }}
          >
            <div style={{ flexDirection: "row", display: "flex" }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block"
                }}
              >
                Height
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                  marginRight: "0px",
                  marginLeft: "auto"
                }}
              >
                {
                  studioState.rooms[currentRoomIndex].items[currentItemIndex]
                    .size.height
                }
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={1}
              value={size.height ? size.height : 10}
              onChange={(e) => {
                setSize({
                  ...size,
                  height: parseFloat(e.target.value)
                });
                updateItem(
                  {
                    size: {
                      ...studioState.rooms[currentRoomIndex].items[
                        currentItemIndex
                      ].size,
                      height: parseFloat(e.target.value),
                      width: keepAspectRatio ? "auto" : size.width
                    }
                  },
                  currentItemIndex,
                  currentRoomIndex
                );
              }}
              style={{
                marginLeft: "0px",
                marginRight: "0px",
                background: "rgba(41, 41, 42, 0.07)",
                border: "none"
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "32px"
            }}
          >
            <span
              style={{ fontSize: 11, fontFamily: "Inter", fontWeight: "bold" }}
            >
              Keep original aspect ratio
            </span>
            {studioState.rooms[currentRoomIndex] && (
              <input
                type="checkbox"
                checked={keepAspectRatio}
                onChange={(e) => {
                  setKeepAspectRatio(!keepAspectRatio);
                  setSize({
                    ...size,
                    height: "auto"
                  });
                }}
                style={{ marginLeft: "auto" }}
              />
            )}
          </div>
          <div>
            <button
              style={{
                backgroundColor: "rgba(41, 41, 42, 0.07)",
                fontFamily: "Inter",
                fontWeight: "bold",
                fontSize: "18px",
                border: "none",
                padding: "8px",
                width: "100%",
                borderRadius: "8px",
                color: "red"
              }}
              onClick={() => {
                removeItem(currentRoomIndex, currentItemIndex);
              }}
            >
              Remove Item
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
