const firebase = require("firebase");
const { admin, db } = require("../../utils/admin");
const config = require("../../utils/config");
const formatISO = require("date-fns/formatISO");

exports.signup = (req, res) => {
  const { email, password } = req.body;
  const defaultImg = "no-user-pic.png";
  // TODO Validate Data
  // If email not email and if password is not valid

  let token, userId, newUser;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      newUser = {
        userId,
        email,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${defaultImg}?alt=media`,
        createdAt: formatISO(new Date(), { locale: "id" }),
      };

      return db.doc(`users/${userId}`).set(newUser);
    })
    .then(() => {
      return res.status(201).json({
        success: true,
        userId,
        email: newUser.email,
        imageUrl: newUser.imageUrl,
        createdAt: newUser.createdAt,
        token,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ success: true, email, token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    });
};

// Get User Data
exports.getUserData = (req, res) => {
  let userData = {};
  const { uid } = req.params;

  db.doc(`/users/${uid}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        return db
          .collection("roles")
          .where("roleId", "==", userData.roleId)
          .limit(1)
          .get();
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Data tidak ditemukan" });
      }
    })
    .then((data) => {
      userData.role = {};
      data.forEach((doc) => (userData.role = doc.data()));

      return res.json({ success: true, data: userData });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    });
};

// Get All Users
exports.getAllUser = (req, res) => {
  let userData = [];
  db.collection("users")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      data.forEach((doc) => {
        userData.push(doc.data());
      });
      return res.json({ success: true, data: userData });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    });
};

exports.updateUser = (req, res) => {
  const { nama } = req.body;

  const userDetails = {
    nama,
    updatedAt: formatISO(new Date(), { locale: "id" }),
  };

  db.doc(`/users/${req.user.uid}`)
    .update(userDetails)
    .then(() => {
      return res.json({ success: true, message: "Data berhasil diupdate!" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ success: false, message: err.message });
    });
};

exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const { v4: uuidv4 } = require("uuid");

  const busboy = new BusBoy({ headers: req.headers });
  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res
        .status(400)
        .json({ success: false, message: "Tipe file upload salah!" });
    }

    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = filename;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket(config.storageBucket)
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        destination: `images/${req.user.uid}/${imageFileName}`,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            firebaseStorageDownloadTokens: uuidv4(),
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/images%2F${req.user.uid}%2F${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.uid}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({
          success: true,
          message: "Gambar berhasil diupload!",
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
      });
  });

  busboy.end(req.rawBody);
};
