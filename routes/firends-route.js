const router = require("express").Router();
const passport = require("passport");
const client = require("../config/mongodbSetup");
const Utils = require("../Utils/Utils.js");

const DB = client.db("finalproject");
const collection = DB.collection("User");

const FindUserID = async function (collection, _id) {
  try {
    const result = await collection.findOne({ _id: _id });
    return result;
  } catch {
    console.log(err);
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

const ID_to_Uname = async function (_id) {
  const result = await FindUserID(collection, _id);
  return result.username;
};

const FindUsersUsername = async function (collection, Username) {
  const options = {
    sort: { title: 1 },
  };
  const query = { username: Username };
  try {
    let cursor = await collection.find(query, options);
    if ((await cursor.count()) === 0) {
      return false;
    } else {
      return cursor;
    }
  } catch {
    (err) => console.log(err);
  }
};

const putIntoList = async function (result) {
  let friends = [];
  let friend_requests = [];
  for (i in result.Friends) {
    let Friend_Uname = await ID_to_Uname(result.Friends[i]);
    friends.push([Friend_Uname, result.Friends[i]]);
  }
  for (i in result.Friend_Request) {
    let Req_Friend_Uname = await ID_to_Uname(result.Friend_Request[i]);
    friend_requests.push([Req_Friend_Uname, result.Friend_Request[i]]);
  }
  return [friends, friend_requests];
};

router.get("/", async (req, res) => {
  let place, friends, friend_requests;
  const _id = req.user._id;
  const result = await FindUserID(collection, _id).then();
  place = await putIntoList(result);
  friends = place[0];
  friend_requests = place[1];
  res.render("friends", {
    myID: _id,
    friend_list: friends,
    friend_req: friend_requests,
  });
});

router.post("/add_friend", async (req, res) => {
  const my_id = req.user._id;
  console.log(my_id)
  let friend_id = req.body.friend_id;
  friend_id = Utils.toMongodbOBJ(friend_id);
  const me = await FindUserID(collection, my_id);
  let MyFriendList = me.Friends;
  MyFriendList.push(friend_id);
  const updated = await UpdateFriend(MyFriendList, my_id);
  if (updated) {
    console.log("success");
  } else {
    console.log("Failed");
  }
  const my_friend = await FindUserID(collection, friend_id);
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
  const me = await FindUserID(collection, my_id);
  let frList = me.Friend_Request;
  let new_frList = await accept_friend_request_helper(frList, friend_id);
  console.log(new_frList);
  let updated = UpdateFriendReq(new_frList, my_id);
  if (updated) {
    console.log("success /friends/accept_friend_request");
  } else {
    console.log("Failed /friends/accept_friend_request");
  }

  let fList = me.Friends;
  let M_friend_id = Utils.toMongodbOBJ(friend_id)
  fList.push(M_friend_id);
  updated = UpdateFriend(fList, my_id);
  if (updated) {
    console.log("success /friends/accept_friend_request");
  } else {
    console.log("Failed /friends/accept_friend_request");
  }
  res.redirect('/friends')
});

module.exports = router;
