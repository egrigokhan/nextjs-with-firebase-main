const admin = require("firebase-admin");
const serviceAccount = require("./secret.json");

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
      // databaseURL: "https://nextjs-firebase-auth-9bc98.firebaseio.com"
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};

export const checkIfUserAuthorizedForRoom = async (token, roomUrl) => {
  const fs = admin.firestore();

  const rooms = await fs
    .collection("rooms")
    .where("custom_url", "==", roomUrl)
    .get();

  if (rooms.docs.length != 1) {
    return null;
  } else {
    const room = rooms.docs[0].data();
    if (room.custom_url == roomUrl && room.user_id == token.uid) {
      return room;
    } else {
      return null;
    }
  }
};
