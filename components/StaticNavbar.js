import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useAPI } from "../context/APIContext";
import { useStudio } from "../context/StudioContext";

export default function StaticNavbar({ props }) {
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
      </div>
    </div>
  );
}
