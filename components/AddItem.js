import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useOpenSea } from "../context/OpenSeaContext";
import { useStudio } from "../context/StudioContext";

export default function AddItem() {
  const { studioState, currentRoomIndex, addItem } = useStudio();
  const { retrieveAssets } = useOpenSea();
  const { showSelectItemDialog, setShowSelectItemDialog } = useRoomDesign();

  const [assets, setAssets] = useState([]);
  const [loadMoreEnabled, setLoadMoreEnabled] = useState(true);

  useEffect(async () => {
    retrieveAssets(studioState["wallet_address"]).then(async (data) => {
      const assets = await data.json();
      console.log("assets", assets);
      setAssets(assets.assets);
    });
  }, []);

  return (
    <div
      class="add-item-container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div
        onClick={() => {
          setShowSelectItemDialog(true);
        }}
        class="add-item-button-container"
      >
        <p
          style={{
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
      {showSelectItemDialog && (
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
              Select Item
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "100px",
                width: "auto",
                overflowX: "scroll"
              }}
              onScrollEnd={(e) => {
                console.log("scroll end");
              }}
            >
              {assets &&
                assets.map((asset) => (
                  <img
                    src={asset.image_url}
                    width="auto"
                    height="100%"
                    style={{ marginRight: "8px", cursor: "pointer" }}
                    onClick={() => {
                      setShowSelectItemDialog(false);
                      addItem(asset, currentRoomIndex);
                    }}
                  ></img>
                ))}
              {loadMoreEnabled && (
                <button
                  style={{
                    background: "rgba(41, 41, 42, 0.07)",
                    display: "flex",
                    border: "none",
                    width: "100px",
                    borderRadius: "8px"
                  }}
                  onClick={() => {
                    retrieveAssets(
                      studioState["wallet_address"],
                      assets.length
                    ).then(async (data) => {
                      const newAssets = await data.json();
                      if (newAssets.assets.length > 0) {
                        const assetsCopy = assets;
                        assetsCopy = assetsCopy.concat(newAssets.assets);
                        setAssets(assetsCopy);
                      } else {
                        setLoadMoreEnabled(false);
                      }
                    });
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      wordBreak: "none",
                      width: "500px",
                      height: "50px",
                      lineHeight: "50px",
                      marginTop: "calc(50% - 20px)"
                    }}
                  >
                    Load more
                  </span>
                  {false && (
                    <FontAwesomeIcon onClick={() => {}} icon={faPlusCircle} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
