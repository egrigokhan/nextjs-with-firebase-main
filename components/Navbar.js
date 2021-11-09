import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useAPI } from "../context/APIContext";
import { useStudio } from "../context/StudioContext";

export default function Navbar({ props }) {
  const {
    studioState,
    setStudioState,
    unsavedChanges,
    setUnsavedChanges
  } = useStudio();
  const { isInPreview, setIsInPreview } = useRoomDesign();
  const { createUser, updateStudio } = useAPI();
  return (
    <div class="navbar">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1", display: "flex", flexDirection: "row" }}>
          <span
            style={{ fontSize: 18, lineHeight: "32px", marginRight: "3px" }}
          >
            Shil.me |
          </span>
          <span
            style={{ fontFamily: "Inter", fontSize: 14, lineHeight: "32px" }}
          >
            @{props.params.userId}
          </span>
        </div>
        {true && (
          <div
            style={{
              float: "right",
              marginRight: "0px",
              marginLeft: "auto"
            }}
          >
            {isInPreview ? (
              <FontAwesomeIcon
                style={{ marginRight: "8px" }}
                onClick={() => {
                  setIsInPreview(false);
                }}
                icon={faEyeSlash}
              />
            ) : (
              <FontAwesomeIcon
                style={{ marginRight: "8px" }}
                onClick={() => {
                  setIsInPreview(true);
                }}
                icon={faEye}
              />
            )}
            {!isInPreview && (
              <span
                style={{
                  backgroundColor: "rgba(41, 41, 42, 0.07)",
                  fontFamily: "Inter",
                  fontWeight: "regular",
                  fontSize: "13px",
                  border: "none",
                  padding: "8px",
                  borderRadius: "8px",
                  color: "black",
                  marginRight: "8px",
                  display: "inline-block",
                  width: "300px",
                  padding: "8px 16px",
                  cursor: "pointer"
                }}
              >
                <b>https://shil.me/</b>
                {props.params.userId}
                <button
                  style={{
                    float: "right",
                    background: "none",
                    fontWeight: "bold",
                    border: "none",
                    fontSize: "10px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    display: "block",
                    height: "16px",
                    color: "black",
                    cursor: "pointer"
                  }}
                >
                  <FontAwesomeIcon onClick={() => {}} icon={faTwitter} />
                </button>
              </span>
            )}

            {!isInPreview && (
              <button
                onClick={() => {
                  console.log("updateStudio");
                  updateStudio({ studioState: studioState })
                    .then(async (res) => {
                      console.log("success changes");
                      setUnsavedChanges(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                style={{
                  backgroundColor: unsavedChanges
                    ? "rgba(41, 41, 42)"
                    : "rgba(41, 41, 42, 0.07)",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  fontSize: "11px",
                  border: "none",
                  padding: "8px",
                  borderRadius: "8px",
                  color: unsavedChanges ? "white" : "black",
                  marginRight: "0px",
                  display: "inline-block",
                  cursor: "pointer"
                }}
              >
                {unsavedChanges ? "Save Changes" : "All changes saves"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
