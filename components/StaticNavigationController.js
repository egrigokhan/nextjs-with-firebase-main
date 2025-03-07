import { useStudio } from "../context/StudioContext";
import { useRoomDesign } from "../context/RoomDesignContext";

export default function Navbar() {
  const {
    studioState,
    currentRoomIndex,
    setCurrentRoomIndex,
    updateRoomTitle,
    addRoom
  } = useStudio();

  const { isInPreview } = useRoomDesign();

  return (
    <div class="navigation-controller-view-container">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          class="arrow-left"
          style={{
            marginRight: "14px",
            marginTop: "9px",
            marginLeft: "auto",
            cursor: "pointer",
            borderRight:
              currentRoomIndex > 0
                ? "14px solid rgb(41, 41, 42)"
                : "14px solid rgb(41, 41, 42, 0.07)"
          }}
          onClick={() => {
            if (currentRoomIndex > 0) {
              setCurrentRoomIndex(currentRoomIndex - 1);
            }
          }}
        ></div>
        <div
          onClick={() => {
            const newRoomTitle = prompt("Please rename your room.");
            if (newRoomTitle && newRoomTitle != "") {
              updateRoomTitle(newRoomTitle, currentRoomIndex);
            }
          }}
          className="navigation-controller-view-main"
        >
          <span style={{ fontSize: 16, fontFamily: "DM Serif Text" }}>
            {studioState.rooms[currentRoomIndex].title}
          </span>
        </div>
        <div
          class="arrow-right"
          style={{
            marginLeft: "14px",
            marginTop: "9px",
            marginRight: "auto",
            cursor: "pointer",
            borderLeft:
              currentRoomIndex < studioState.rooms.length - 1
                ? "14px solid rgb(41, 41, 42)"
                : "14px solid rgb(41, 41, 42, 0.07)"
          }}
          onClick={() => {
            if (currentRoomIndex < studioState.rooms.length - 1) {
              setCurrentRoomIndex(currentRoomIndex + 1);
            }
          }}
        ></div>
      </div>
    </div>
  );
}
