import StaticRoomItem from "./StaticRoomItem";

export default function EditItemDialog({ props }) {
  return (
    <div class="edit-item-dialog-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: "bold",
            marginBottom: "32px"
          }}
        >
          Edit Item
        </span>
        <StaticRoomItem show={true} style={{ marginBottom: "32px" }} />
        <span
          style={{
            fontSize: 14,
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px"
          }}
        >
          <span
            style={{
              fontSize: 14,
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
            onChange={() => {}}
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
            marginBottom: "32px"
          }}
        >
          <span
            style={{
              fontSize: 14,
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
            onChange={() => {}}
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
}
