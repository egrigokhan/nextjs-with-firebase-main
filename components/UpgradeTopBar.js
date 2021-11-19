import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useAPI } from "../context/APIContext";
import { useStudio } from "../context/StudioContext";
import { useStripe } from "../context/StripeContext";
import { useAuth } from "../auth";
import Badge from "./Badge";
export default function UpgradeTopNavbar({ props }) {
  const {
    studioState,
    setStudioState,
    unsavedChanges,
    setUnsavedChanges
  } = useStudio();
  const { isInPreview, setIsInPreview } = useRoomDesign();
  const { createUser, updateStudio } = useAPI();
  const { getCustomClaimRole } = useStripe();
  const { user } = useAuth();
  return (
    <div
      class="navbar"
      style={{
        backgroundColor: "rgb(41, 41, 42)",
        height: "48px",
        textAlign: "center",
        boxShadow: "0px 4px 7px 4px rgb(0 0 0 / 20%)"
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1", display: "flex", flexDirection: "row" }}>
          <span
            style={{
              fontFamily: "Inter",
              fontSize: 14,
              marginRight: "4px",
              color: "white",
              textAlign: "center",
              marginTop: "15px",
              fontWeight: "bold",
              marginLeft: "16px"
            }}
          >
            x
          </span>
          <span
            style={{
              fontFamily: "Inter",
              fontSize: 14,
              marginRight: "4px",
              color: "white",
              textAlign: "center",
              width: "100%",
              marginTop: "15px",
              fontWeight: "bold"
            }}
          >
            Upgrade to the Killer Shiller plan for only $9/month to gain access
            to the{" "}
            <a style={{ color: "white" }} href="/#pricing">
              full list of features
            </a>
            ?
          </span>
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
              transitionDuration: "0.3s",
              backgroundColor: "rgba(41, 41, 42, 0.07)",
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
            {unsavedChanges ? "Save Changes" : "All changes saved"}
          </button>
        </div>
      </div>
    </div>
  );
}
