const express = require("express");
const bankRoutes = express.Router();
const dbo = require("../db/conn");

// directly coppied from auth.js
// gets user based on username and hash. used when auto logging in with session
async function get_user_by_hash(username, hash) {
  const db_connect = dbo.getDb();
  const userRecord = await db_connect
    .collection("users")
    .findOne({ userName: username, passwordHash: hash });

  if (!userRecord) {
    return null;
  }

  return userRecord;
}

// logs a transaction, needs the user record, and a json object of the details to be logged
async function logTransaction(userRecord, transaction) {
  const db_connect = dbo.getDb();
  const query = { _id: userRecord._id }; // Find the user document by userId
  transaction.date = new Date();
  const defaults = {
    account: null,
    type: null,
    amount: null,
    description: null,
  };
  const standardizedTransaction = { ...defaults, ...transaction }; // unpack the transaction ontop of default values. this should make the history standardized

  const update = {
    $push: {
      history: standardizedTransaction, // append the transaction object
    },
  };

  try {
    const result = await db_connect
      .collection("users")
      .updateOne(query, update);
    if (result.matchedCount === 0) {
      console.log("No user matches the provided record.");
    } else if (result.modifiedCount === 1) {
      console.log("Transaction successfully logged.");
    }
  } catch (err) {
    console.error("Error logging transaction:", err);
  }
}

// gets the account information, Note from Joel use this
bankRoutes.get("/accounts", async (req, res) => {
  if (req.session.userName && req.session.passwordHash) {
    const userRecord = await get_user_by_hash(
      req.session.userName,
      req.session.passwordHash
    );

    if (!userRecord) {
      res.json({ message: "user not found" });
    }

    // user found
    res.json({
      account1: userRecord.account1,
      account2: userRecord.account2,
      account3: userRecord.account3,
    });
  } else {
    console.log("not logged int");
    res.json({ message: "not logged in" });
  }
});

// returns the users entire history, Note from Joel use this
bankRoutes.get("/history", async (req, res) => {
  if (req.session.userName && req.session.passwordHash) {
    const userRecord = await get_user_by_hash(
      req.session.userName,
      req.session.passwordHash
    );

    if (!userRecord) {
      res.json({ message: "user not found" });
    }

    // user found
    res.json({
      history: userRecord.history,
    });
  } else {
    console.log("not logged int");
    res.json({ message: "not logged in" });
  }
});

// used to test, deposits 500 into account1
bankRoutes.get("/deposit500", async (req, res) => {
  if (req.session.userName && req.session.passwordHash) {
    const userRecord = await get_user_by_hash(
      req.session.userName,
      req.session.passwordHash
    );

    if (!userRecord) {
      return res.json({ message: "user not found" });
    }

    // found a record
    const update = {
      $inc: {
        account1: 500.02,
      },
    };

    const db_connect = dbo.getDb();
    const result = await db_connect
      .collection("users")
      .updateOne(userRecord, update);

    if (result.modifiedCount === 1) {
      console.log("The document was successfully updated.");

      let transactionRecord = {
        account: "account1",
        type: "deposit",
        amount: 500.02,
      };
      logTransaction(userRecord, transactionRecord);
    } else if (result.matchedCount === 0) {
      console.log("No document matches the provided query.");
    }
  } else {
    // unable to log in through session
    console.log("not logged int");
    res.json({ message: "not logged in" });
  }
});

// have not tested yet, but it is based on the get so it should be close, note from Joel use this 
bankRoutes.post("/deposit", async (req, res) => {
  if (req.session.userName && req.session.passwordHash) {
    const userRecord = await get_user_by_hash(
      req.session.userName,
      req.session.passwordHash
    );

    if (!userRecord) {
      return res.json({ message: "user not found" });
    }

    const accountToUpdate = req.body.account; 
    const amount = parseFloat(req.body.amount);

    const update = {
      $inc: {
        [accountToUpdate]: amount,
      },
    };

    const db_connect = dbo.getDb();
    const result = await db_connect
      .collection("users")
      .updateOne({ _id: userRecord._id }, update);

    if (result.modifiedCount === 1) {
      console.log("The document was successfully updated.");
      const transactionType = amount >= 0 ? "deposit" : "withdraw";
      const transactionRecord = {
        account: accountToUpdate,
        type: transactionType,
        amount: amount,
      };
      logTransaction(userRecord, transactionRecord);
    } else {
      res.json({ message: "Failed to update the account" });
    }
  } else {
    // unable to log in through session
    console.log("not logged int");
    res.json({ message: "not logged in" });
  }
});

// helper function for josh. I use it to go to localhost5000/user, to see my changes in the browser.
bankRoutes.get("/user", async (req, res) => {
  if (req.session.userName && req.session.passwordHash) {
    const userRecord = await get_user_by_hash(
      req.session.userName,
      req.session.passwordHash
    );

    if (userRecord) {
      console.log("user found");
      res.json({ user: userRecord });
    } else {
      // User not found
      res.json({ message: "user not found" });
    }
  } else {
    console.log("not logged int");
    res.json({ message: "not logged in" });
  }
});

module.exports = bankRoutes;
