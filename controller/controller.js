const Transaction = require("../model/Transaction.js");

exports.getTransactions = async (req, res, next) => {
	try {
		const transitions = await Transaction.find();
		return res.status(200).json({
			success: true,
			count: transitions.length,
			data: transitions,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: "Server Error",
		});
		console.log(e);
	}
};

exports.addTransaction = async (req, res, next) => {
	try {
		const { text, amount } = req.body;

		const transition = await Transaction.create(req.body);

		return res.status(201).json({
			success: true,
			data: transition,
		});
	} catch (e) {
		console.log(e.errors);
		if (e.name === "ValidationError") {
			const messages = Object.values(e.errors).map((val) => val.message);
			res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			res.status(500).json({
				success: false,
				error: "Server Error",
			});
		}
	}
};

exports.deleteTransaction = async (req, res, next) => {
	try {
		const transition = await Transaction.findById(req.params.id);
		if (!transition) {
			return res.status(404).json({
				success: false,
				error: "No Transaction Found",
			});
		}
		await transition.remove();
		res.status(200).json({
			success: true,
			data: transition,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: "Server Error",
		});
	}
};
