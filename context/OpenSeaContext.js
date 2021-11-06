import React, { useState, useEffect, useContext, createContext } from "react";

const OpenSeaContext = createContext({});

export const OpenSeaProvider = ({ state, children }) => {
  const retrieveAssets = (walletAddress, offset = 0) => {
    return fetch(
      `https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=${offset}&limit=50`
    );
  };

  return (
    <OpenSeaContext.Provider
      value={{
        retrieveAssets
      }}
    >
      {children}
    </OpenSeaContext.Provider>
  );
};
export const useOpenSea = () => useContext(OpenSeaContext);
