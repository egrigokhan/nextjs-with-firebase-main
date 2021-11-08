import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      console.log("auth changed");
      console.log(user ? user : "Nothing");
      if (!user) {
        setUser(null);
        nookies.set(undefined, "firebase-token", "", {});
        return;
      }

      const token = await user.getIdToken();
      console.log(token);
      setUser(user);
      nookies.set(undefined, "firebase-token", token, {});
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
