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
                    width="200px"
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
                  style={{ background: "none", border: "none" }}
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
                  Load more
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
