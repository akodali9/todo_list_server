const express = require("express");
const noteupdaterouter = express.Router();
const User = require("../models/user");

noteupdaterouter.post("/update", async (req, res) => {
  console.log("document update requested");

  try {
    const { email, notes } = req.body;

    const conditions = { email: email };
    const update = {
      $set: {
        notes: notes,
      },
    };
    User.findOneAndUpdate(conditions, update, { new: true })
      .then((updatedDocument) => {
        if (updatedDocument) {
          console.log("Document updated:");
        } else {
          console.log("Document not found");
        }
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  } catch (e) {}
});

module.exports = noteupdaterouter;