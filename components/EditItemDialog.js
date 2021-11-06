import { useState, useEffect } from "react";
import StaticRoomItem from "./StaticRoomItem";
import { useStudio } from "../context/StudioContext";
import { useRoomDesign } from "../context/RoomDesignContext";
export default function EditItemDialog({ itemIndex }) {
  const {
    studioState,
    currentRoomIndex,
    currentItemIndex,
    updateItem
  } = useStudio();

  const { MATTING_COLORS } = useRoomDesign();

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
  }, [studioState, currentRoomIndex, currentItemIndex]);

  const [matting, setMatting] = useState({});
  const [size, setSize] = useState({});

  if (
    studioState.rooms[currentRoomIndex] &&
    studioState.rooms[currentRoomIndex].items &&
    studioState.rooms[currentRoomIndex].items[currentItemIndex] &&
    currentItemIndex >= 0
  ) {
    return (
      <div class="edit-item-dialog-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
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
          <span
            style={{
              fontSize: 11,
              fontFamily: "Inter",
              fontWeight: "bold",
              marginBottom: "6px"
            }}
          >
            Frames
          </span>
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
                  updateItem(COLOR, currentRoomIndex);
                }}
                style={{
                  backgroundColor: "rgba(41, 41, 42, 0.07)",
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  marginRight: 6,
                  cursor: "pointer"
                }}
              >
                <div
                  onClick={() => {
                    updateItem(COLOR, currentRoomIndex);
                  }}
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
                  updateItem(newBackgroundColor, currentRoomIndex);
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

          <span
            style={{
              fontSize: 11,
              fontFamily: "Inter",
              fontWeight: "bold",
              marginBottom: "6px"
            }}
          >
            Matting Color
          </span>
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
              marginBottom: "32px"
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontFamily: "Inter",
                fontWeight: "bold",
                marginBottom: "8px",
                display: "block"
              }}
            >
              Scale
            </span>
            <input
              type="range"
              min={2}
              max={100}
              step={0.01}
              value={size.scale ? 10 * size.scale : 10}
              onChange={(e) => {
                setSize({
                  ...size,
                  scale: parseFloat(e.target.value) / 10
                });
                updateItem(
                  {
                    size: {
                      ...studioState.rooms[currentRoomIndex].items[
                        currentItemIndex
                      ].size,
                      scale: parseFloat(e.target.value) / 10
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
