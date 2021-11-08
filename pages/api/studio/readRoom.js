const admin = require("firebase-admin");
const serviceAccount = require("../../../secret.json");

const readRoomIfAuthenticated = async (data) => {
  const db = admin.firestore();
  return await db
    .collection("rooms")
    .where("customURL", "==", data.room_custom_url)
    .get();
};

export default async (req, res) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  const db = admin.firestore();
  // const user = db.collection("users").doc(req.body.uid);
  // const userData = (await user.get()).data();

  console.log("heres");
  const roomsSnapshot = await readRoomIfAuthenticated({
    room_custom_url: "asdasd"
  });

  if (roomsSnapshot.empty) {
    res
      .status(300)
      .json({
        type: "no-room",
        message: `No room exists at https://shil.me/${"asdasd"}.`
      });
  } else {
    roomsSnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      res.status(200).json(doc.data());
      return;
    });
  }

  /*
    .then(async (room) => {
      console.log("room", room);
      res.status(200).json(room);
    })
    .catch((err) => {
      console.log("problem", err);
      res.status(300).json({
        type: "Room doesn't exist.",
        message: `A room at https://shil.me/${"sadasda"} doesn't exist.`
      });
    });
    */
  /*
  if (userData && userData.room_id && userData.room_id == req.body.room_id) {
    
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
  */
};
