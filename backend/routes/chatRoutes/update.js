/*
     _____ _           _       
   /  __ \ |         | |      
  | /  \/ |__   __ _| |_ ___ 
 | |   | '_ \ / _` | __/ __|
 | \__/\ | | | (_| | |_\__ \
 \____/_| |_|\__,_|\__|___/
 
 */

const express = require("express");
const chatController = require("../../controller/chatController");
const { userAuth } = require("../../middleware/userAuth");
const { check } = require("express-validator");
const app = express();
const router = express.Router();

router.put(
	"/renameGroupChat",
	[
		userAuth.isLoggedIn,
		check("chatName").notEmpty().withMessage("Group name is required.").trim(),
		check("chatID").notEmpty().withMessage("Chat ID is required."),
	],
	chatController.renameGroup
);
router.put(
	"/addToGroup",
	[
		userAuth.isLoggedIn,

		check("chatID").notEmpty().withMessage("Chat ID is required."),
		check("userID").notEmpty().withMessage("User ID is required."),
	],
	chatController.addToGroup
);
router.put(
	"/removeFromGroup",
	[
		userAuth.isLoggedIn,

		check("chatID").notEmpty().withMessage("Chat ID is required."),
		check("userID").notEmpty().withMessage("User ID is required."),
	],
	chatController.removeFromGroup
);

module.exports = router;