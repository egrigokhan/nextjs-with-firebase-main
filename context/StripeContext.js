import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase";

import { useAuth } from "../auth";

const StripeContext = createContext({});

export const StripeProvider = ({ state, children }) => {
  const { user } = useAuth();

  const subscribeToPacket = async (product) => {
    const docRef = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: "price_1JwYNeDOIYv25yULPx5nHOWI",
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });
    // Wait for the CheckoutSession to get attached by the extension
    docRef.onSnapshot((snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  };

  return (
    <StripeContext.Provider
      value={{
        subscribeToPacket
      }}
    >
      {children}
    </StripeContext.Provider>
  );
};
export const useStripe = () => useContext(StripeContext);
