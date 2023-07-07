require("dotenv").config();
const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
require("mongoose-long")(mongoose);

const chatModel = mongoose.Schema(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: SchemaTypes.ObjectId,
				ref: "User",
			},
		],
		recentMessage: {
			type: SchemaTypes.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: SchemaTypes.ObjectId,
			ref: "User",
		},
		groupImage: {
			type: String,
		},
		bio: {
			type: String,
			default: "Hey! Let's Breeze.",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Chat", chatModel);
