import { useRoomDesign } from "../context/RoomDesignContext";
import { useStudio } from "../context/StudioContext";

export default function AddItemButton() {
  const {
    studioState,
    currentRoomIndex,
    updateShadow,
    updateRoomBackground
  } = useStudio();
  const { BACKGROUND_COLORS } = useRoomDesign();

  return (
    <div
      onClick={() => {
        console.log("add");
      }}
      class="add-item-button-container"
    >
      <p
        style={{
          color: "white",
          textAlign: "center",
          width: "100%",
          fontSize: "64px",
          margin: "0px",
          position: "relative",
          top: "-9px"
        }}
      >
        +
      </p>
    </div>
  );
}
