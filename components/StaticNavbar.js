import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useAPI } from "../context/APIContext";
import { useStudio } from "../context/StudioContext";
import { useAuth } from "../auth";
import { useEffect } from "react";

export default function StaticNavbar({ props }) {
  const {
    studioState,
    setStudioState,
    unsavedChanges,
    setUnsavedChanges
  } = useStudio();
  const { isInPreview, setIsInPreview } = useRoomDesign();
  const { createUser, updateStudio } = useAPI();
  const { user } = useAuth();

  useEffect(() => {
    console.log("USER", user);
  }, [user]);

  return (
    <div class="navbar">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1", display: "flex", flexDirection: "row" }}>
          <span
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              fontSize: 18,
              lineHeight: "32px",
              marginRight: "3px",
              cursor: "pointer !important"
            }}
          >
            Shil.me |
          </span>
          <span
            style={{ fontFamily: "Inter", fontSize: 14, lineHeight: "32px" }}
          >
            @{props.params.userId}
          </span>
        </div>
        <div
          style={{
            float: "right",
            marginRight: "0px",
            marginLeft: "auto",
            display: "inherit"
          }}
        >
          {user && user.providerData && (
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
                padding: "8px 16px",
                cursor: "pointer"
              }}
            >
              <button
                style={{
                  float: "left",
                  background: "none",
                  fontWeight: "bold",
                  border: "none",
                  fontSize: "10px",
                  marginTop: "auto",
                  marginBottom: "auto",
                  display: "block",
                  height: "16px",
                  color: "black",
                  cursor: "pointer",
                  paddingLeft: "0px"
                }}
              >
                <FontAwesomeIcon onClick={() => {}} icon={faTwitter} />
              </button>
              {user.providerData[0].displayName}
            </span>
          )}

          {!user && (
            <button
              onClick={() => {
                console.log("updateStudio");
                window.location.href = "/join";
              }}
              style={{
                transitionDuration: "0.3s",
                backgroundColor: "rgba(41, 41, 42)",
                fontFamily: "Inter",
                fontWeight: "bold",
                fontSize: "11px",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                color: "white",
                marginRight: "0px",
                display: "inline-block",
                cursor: "pointer"
              }}
            >
              Start shilling with{" "}
              <FontAwesomeIcon onClick={() => {}} icon={faTwitter} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
