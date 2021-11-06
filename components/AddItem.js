import { useState, useEffect } from "react";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useOpenSea } from "../context/OpenSeaContext";
import { useStudio } from "../context/StudioContext";

export default function AddItemButton() {
  const { studioState, currentRoomIndex, addItem } = useStudio();
  const { retrieveAssets } = useOpenSea();

  const [assets, setAssets] = useState([]);

  useEffect(async () => {
    retrieveAssets(studioState["wallet_address"]).then(async (data) => {
      const assets = await data.json();
      console.log("assets", assets);
      setAssets(assets.assets);
    });
  });

  return (
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
                  addItem(asset, currentRoomIndex);
                }}
              ></img>
            ))}
          <button>Load more</button>
        </div>
      </div>
    </div>
  );
}
