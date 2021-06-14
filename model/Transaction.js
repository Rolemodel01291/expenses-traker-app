const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	description: {
		type: String,
		trim: true,
		required: [true, "Please Add Some Text"],
	},
	amount: {
		type: Number,
		required: [true, "Enter any number"],
	},
	date: {
		type: Date,
		default: Date.now,
	},
	comment: {
		type: String,
	}
});

module.exports = mongoose.model("Transaction", TransactionSchema);
