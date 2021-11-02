export default function Navbar({ props, roomIndex, setRoomIndex }) {
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
              roomIndex > 0
                ? "14px solid rgb(41, 41, 42)"
                : "14px solid rgb(41, 41, 42, 0.07)"
          }}
          onClick={() => {
            if (roomIndex > 0) {
              setRoomIndex(roomIndex - 1);
            }
          }}
        ></div>
        <div className="navigation-controller-view-main">
          <span style={{ fontSize: 16, fontFamily: "DM Serif Text" }}>
            {props.rooms[roomIndex].title}
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
              roomIndex < props.rooms.length - 1
                ? "14px solid rgb(41, 41, 42)"
                : "14px solid rgb(41, 41, 42, 0.07)"
          }}
          onClick={() => {
            if (roomIndex < props.rooms.length - 1) {
              setRoomIndex(roomIndex + 1);
            }
          }}
        ></div>
      </div>
    </div>
  );
}
