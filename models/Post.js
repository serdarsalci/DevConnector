const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},

	text: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},

	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],

	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},

			text: {
				type: String,
				required: true,
			},

			postedto: {
				type: String,
				// ref: 'post',
				default: '5feabb2e4725765b08b2a64f',
			},

			name: {
				type: String,
			},
			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Post = mongoose.model('post', PostSchema);
