import {
  verifyIdToken,
  checkIfUserAuthorizedForRoom
} from "../../../firebaseAdmin";
import nookies from "nookies";

const admin = require("firebase-admin");
const serviceAccount = require("../../../secret.json");

export default async (req, res) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  const db = admin.firestore();

  try {
    console.log("here");
    const cookies = nookies.get({ req, res });
    console.log("token", cookies);
    admin
      .auth()
      .verifyIdToken(cookies["firebase-token"])
      .then(async (token) => {
        console.log("HEYYYYY");
        const room = await checkIfUserAuthorizedForRoom(
          token,
          "gokhan" // req.url.replace("/", "")
        );

        console.log("HERE");
        if (room) {
          await db
            .collection("rooms")
            .doc("2A5an8gKu20xSLdXVMzf")
            .set(req.body.studioState);
          res.writeHead(200, { type: "success" });
          res.end();
        }
      })
      .catch((error) => {
        console.log("error", error);
        res.writeHead(302, { type: "error", message: "error" });
        res.end();
      });
  } catch {
    res.writeHead(302, { type: "error", message: "error" });
    res.end();
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
