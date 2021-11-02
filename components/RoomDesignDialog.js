export default function RoomDesignDialog() {
  return (
    <div class="room-design-dialog-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 14,
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
          <div
            style={{
              backgroundColor: "#FF0000",
              width: 40,
              height: 40,
              borderRadius: 12,
              marginRight: 6
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#2DA771",
              width: 40,
              height: 40,
              borderRadius: 12,
              marginRight: 6
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#00A1FF",
              width: 40,
              height: 40,
              borderRadius: 12,
              marginRight: 6
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#FFBD00",
              width: 40,
              height: 40,
              borderRadius: 12,
              marginRight: 6
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#C31162",
              width: 40,
              height: 40,
              borderRadius: 12,
              marginRight: 6
            }}
          ></div>
          <div
            style={{
              backgroundColor: "rgba(41, 41, 42, 0.07)",
              width: 40,
              height: 40,
              borderRadius: 12
            }}
          >
            <span
              style={{
                width: "100%",
                margin: "auto",
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "5px",
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
            style={{ fontSize: 14, fontFamily: "Inter", fontWeight: "bold" }}
          >
            Shadows
          </span>
          <input
            type="checkbox"
            checked={true}
            onChange={() => {}}
            style={{ marginLeft: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
