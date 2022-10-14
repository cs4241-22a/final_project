const router = require("express").Router();
const passport = require("passport");
const client = require("../config/mongodbSetup");
const Utils = require("../Utils/Utils.js");

const DB = client.db("finalproject");
const collection = DB.collection("User");

const UpdateFriendPending = async function (value, _id) {
  try {
    const filter = { _id: _id };
    const updateDoc = {
      $set: {
        Friend_Pending: value,
      },
    };
    const result = await collection.updateOne(filter, updateDoc);
    if (result.matchedCount == 0) {
      return false;
    } else {
      return true;
    }
  } catch {
    (err) => console.log(err);
  }
};

const UpdateFriend = async function (value, _id) {
  try {
    const filter = { _id: _id };
    const updateDoc = {
      $set: {
        Friends: value,
      },
    };
    const result = await collection.updateOne(filter, updateDoc);
    if (result.matchedCount == 0) {
      return false;
    } else {
      return true;
    }
  } catch {
    (err) => console.log(err);
  }
};

const UpdateFriendReq = async function (value, _id) {
  try {
    const filter = { _id: _id };
    const updateDoc = {
      $set: {
        Friend_Request: value,
      },
    };
    const options = { upsert: true };
    const result = await collection.updateOne(filter, updateDoc, options);
    if (result.matchedCount == 0) {
      return false;
    } else {
      return true;
    }
  } catch {
    (err) => console.log(err);
  }
};

const putIntoList = async function (result) {
  let friends = [];
  let friend_requests = [];
  let friend_pending = [];
  for (i in result.Friends) {
    let Friend_Uname = await Utils.ID_to_Uname(collection, result.Friends[i]);
    friends.push([Friend_Uname, result.Friends[i]]);
  }
  for (i in result.Friend_Request) {
    let Req_Friend_Uname = await Utils.ID_to_Uname(
      collection,
      result.Friend_Request[i]
    );
    friend_requests.push([Req_Friend_Uname, result.Friend_Request[i]]);
  }
  for (i in result.Friend_Pending) {
    let Pending_Friend_Uname = await Utils.ID_to_Uname(
      collection,
      result.Friend_Pending[i]
    );
    friend_pending.push([Pending_Friend_Uname, result.Friend_Pending[i]]);
  }
  return [friends, friend_requests, friend_pending];
};

router.get("/", async (req, res) => {
  let place, friends, friend_requests;
  const _id = req.user._id;
  const result = await Utils.FindUserID(collection, _id);
  place = await putIntoList(result);
  friends = place[0];
  friend_requests = place[1];
  friend_pending = place[2];
  res.render("friends", {
    myName: req.user.username,
    myID: _id,
    friend_list: friends,
    friend_req: friend_requests,
    friend_pending: friend_pending,
  });
});

const Adding_check = function (me, friend_id, my_id) {
  let Continue = true;
  for (i in me.Friend_Pending) {
    if (friend_id == me.Friend_Pending[i]) {
      Continue = false;
    }
  }
  for (i in me.Friends) {
    if (friend_id == me.Friends[i]) {
      Continue = false;
    }
  }
  for (i in me.Friend_Request) {
    if (friend_id == me.Friend_Request[i]) {
      Continue = false;
    }
  }
  if (friend_id == my_id) {
    Continue = false;
  }
  return Continue;
};

router.post("/add_friend", async (req, res) => {
  const my_id = req.user._id;
  let friend_id = req.body.friend_id;
  const me = await Utils.FindUserID(collection, my_id);
  let Continue = Adding_check(me, friend_id, my_id);
  if (Continue) {
    friend_id = Utils.toMongodbOBJ(friend_id);
    let MyFriendPending = me.Friend_Pending;
    MyFriendPending.push(friend_id);
    const updated = await UpdateFriendPending(MyFriendPending, my_id);
    if (updated) {
      console.log("success");
    } else {
      console.log("Failed");
    }
    const my_friend = await Utils.FindUserID(collection, friend_id);
    let my_friend_friend_request_list = my_friend.Friend_Request;
    my_friend_friend_request_list.push(my_id);
    const req_updated = await UpdateFriendReq(
      my_friend_friend_request_list,
      friend_id
    );
    if (req_updated) {
      console.log("success");
    } else {
      console.log("Failed");
    }
    res.redirect("/friends");
  } else {
    res.redirect("/friends");
  }
});

const accept_friend_request_helper = function (frList, friend_id) {
  let return_list = [];
  for (i in frList) {
    if (!(frList[i] == friend_id)) {
      return_list.push(frList[i]);
    }
  }
  return return_list;
};

router.post("/accept_friend_request", async (req, res) => {
  const my_id = req.user._id;
  let friend_id = req.body.friend_id;
  // friend_id = Utils.toMongodbOBJ(friend_id);
  const me = await Utils.FindUserID(collection, my_id);
  let frList = me.Friend_Request;
  let new_frList = await accept_friend_request_helper(frList, friend_id);
  let updated = UpdateFriendReq(new_frList, my_id);
  if (updated) {
    console.log("success /friends/accept_friend_request");
  } else {
    console.log("Failed /friends/accept_friend_request");
  }

  let fList = me.Friends;
  let M_friend_id = Utils.toMongodbOBJ(friend_id);
  fList.push(M_friend_id);
  updated = UpdateFriend(fList, my_id);
  if (updated) {
    console.log("success /friends/accept_friend_request");
  } else {
    console.log("Failed /friends/accept_friend_request");
  }

  let friend = await Utils.FindUserID(collection, my_id);
  let friend_friend = friend.Friends;
  let friend_friend_pending = friend.Friend_Pending;
  let new_friend_friend_pending = accept_friend_request_helper(
    friend_friend_pending,
    my_id
  );
  friend_friend.push(my_id);
  updated = UpdateFriendPending(new_friend_friend_pending, M_friend_id);
  updated2 = UpdateFriend(friend_friend, M_friend_id);
  res.redirect("/friends");
});

module.exports = router;
