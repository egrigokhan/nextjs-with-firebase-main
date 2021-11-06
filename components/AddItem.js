import { useState, useEffect } from "react";
import { useRoomDesign } from "../context/RoomDesignContext";
import { useOpenSea } from "../context/OpenSeaContext";
import { useStudio } from "../context/StudioContext";

export default function AddItemButton() {
  const { studioState } = useStudio();
  const { retrieveAssets } = useOpenSea();

  const [assets, setAssets] = useState([]);

  useEffect(async () => {
    retrieveAssets(studioState["wallet_address"]).then(async (data) => {
      console.log("assets", await data.json());
    });
  });

  return (
    <div class="room-design-dialog-container">
      <p>{assets}</p>
    </div>
  );
}
