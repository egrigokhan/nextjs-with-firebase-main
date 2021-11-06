const admin = require("firebase-admin");
const serviceAccount = require("../../../secret.json");

const checkIfCustomURLExists = (url) => {
  return false;
};

const createRoom = (data) => {
  const db = admin.firestore();
  console.log(data);
  return db.collection("rooms").add({
    user_id: data.user_id,
    wallet_address: data.wallet_address,
    rooms: [
      {
        title: "Main Room",
        background_color: "beige",
        shadow: 1,
        items: []
      }
    ]
  });
};

export default async (req, res) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  const db = admin.firestore();
  const user = db.collection("users").doc(req.body.uid);
  const userData = (await user.get()).data();
  if (userData && userData.room_id) {
    res.status(300).json({
      type: "User exists.",
      message: `You are already shilling at ${userData.room_custom_url}`
    });
  } else {
    // TO-DO: Check if custom url available
    if (checkIfCustomURLExists(req.body.customURL)) {
      user
        .set(req.body)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(300).json(err);
        });
    } else {
      console.log(user);
      createRoom({
        user_id: req.body.uid,
        custom_url: req.body.customURL,
        wallet_address: req.body.walletAddress
      })
        .then((data) => {
          user.set({
            room_id: data.id,
            room_custom_url: req.body.customURL
          });
          res.status(200).json({
            type: "Room created.",
            message: "Created room."
          });
        })
        .catch((err) => {
          res.status(300).json({
            type: "Can't create room.",
            message: `Can't create room.`
          });
        });
    }
  }
};
