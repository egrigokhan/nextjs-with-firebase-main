const admin = require("firebase-admin");
const serviceAccount = require("../../../secret.json");

const checkIfCustomURLExists = async (url) => {
  const db = admin.firestore();
  console.log(
    (await db.collection("rooms").where("custom_url", "==", url).get()).empty
  );
  return !(await db.collection("rooms").where("custom_url", "==", url).get())
    .empty;
};

const createRoom = (data) => {
  console.log("create room");
  const db = admin.firestore();
  console.log(data);
  if (!data.user_id || !data.custom_url || !data.wallet_address) {
  }
  return db.collection("rooms").add({
    user_id: data.user_id,
    wallet_address: data.wallet_address,
    custom_url: data.custom_url,
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

  if (!req.body.custom_url || req.body.custom_url == "") {
    res.status(300).json({
      type: "Missing information.",
      message: `Please enter a valid URL.`
    });
    return;
  }
  if (!req.body.wallet_address) {
    res.status(300).json({
      type: "Missing information.",
      message: `Please connect your wallet.`
    });
    return;
  }
  const db = admin.firestore();
  const user = db.collection("users").doc(req.body.uid);
  const userData = (await user.get()).data();
  if (userData && userData.custom_url) {
    res.status(300).json({
      type: "User exists.",
      message: `You are already shilling at ${userData.custom_url}`,
      href: `/${userData.custom_url}`
    });
  } else {
    // TO-DO: Check if custom url available
    if (await checkIfCustomURLExists(req.body.custom_url)) {
      res.status(300).json({
        type: "Custom URL not available.",
        message: `The custom url shil.me/${req.body.custom_url} has already been taken.`
      });
    } else {
      console.log(user);
      createRoom({
        user_id: req.body.uid,
        custom_url: req.body.custom_url,
        wallet_address: req.body.wallet_address
      })
        .then((data) => {
          console.log("added room");
          user.set({
            room_id: data.id,
            custom_url: req.body.custom_url
          });
          res.status(200).json({
            success: true,
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
