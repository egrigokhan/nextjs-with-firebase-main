import { useRoomDesign } from "../context/RoomDesignContext";
import { useStudio } from "../context/StudioContext";

export default function RoomDesignDialog() {
  const {
    studioState,
    currentRoomIndex,
    updateShadow,
    updateRoomBackground
  } = useStudio();
  const { BACKGROUND_COLORS } = useRoomDesign();

  return (
    <div class="room-design-dialog-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 11,
            fontFamily: "Inter",
            fontWeight: "bold",
            marginBottom: "6px"
          }}
        >
          Background Color
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "12px"
          }}
        >
          {BACKGROUND_COLORS.map((COLOR) => (
            <div
              onClick={() => {
                updateRoomBackground(COLOR, currentRoomIndex);
              }}
              style={{
                backgroundColor:
                  studioState.rooms[currentRoomIndex].background_color == COLOR
                    ? COLOR
                    : "rgba(41, 41, 42, 0.07)",
                width: 24,
                height: 24,
                borderRadius: 6,
                marginRight: 6,
                cursor: "pointer",
                transitionDuration: "0.2s"
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
                updateRoomBackground(newBackgroundColor, currentRoomIndex);
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
                marginTop: "0px",
                textAlign: "center",
                display: "block"
              }}
            >
              +
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <span
            style={{ fontSize: 11, fontFamily: "Inter", fontWeight: "bold" }}
          >
            Shadows
          </span>
          {studioState.rooms[currentRoomIndex] && (
            <input
              type="checkbox"
              checked={studioState.rooms[currentRoomIndex].shadow}
              onChange={() => {
                updateShadow(
                  !studioState.rooms[currentRoomIndex].shadow,
                  currentRoomIndex
                );
              }}
              style={{ marginLeft: "auto" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
