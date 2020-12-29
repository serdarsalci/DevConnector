import axios from 'axios';
import { setAlert } from './alert';
import { v4 as uuid } from 'uuid';
import {
	ADD_POST,
	DELETE_POST,
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	GET_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from './types';

// GET posts

export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
		console.log('getPosts called');
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add Like
export const addLike = postId => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postId: postId, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Remove like
export const removeLike = postId => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/unlike/${postId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Post
export const deletePost = id => async dispatch => {
	try {
		await axios.delete(`/api/posts/${id}`);
		dispatch({
			type: DELETE_POST,
			payload: { id },
		});
		dispatch(setAlert('Post removed', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add Post
export const addPost = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(`/api/posts`, formData, config);
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});
		dispatch(setAlert('Post created', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});

		console.log(err.response.data.errors[0].msg);

		err.response.data.errors.forEach(e => {
			dispatch(setAlert(e.msg, 'danger'));
		});
	}
};

// GET post

export const getPost = id => async dispatch => {
	try {
		const res = await axios.get(`/api/posts/${id}`);
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
		console.log('getPost called');
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add Comment
export const addComment = (postId, formData) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			config
		);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
		dispatch(setAlert('Comment added', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});

		err.response.data.errors.forEach(e => {
			dispatch(setAlert(e.msg, 'danger'));
		});
	}
};

export const replyCom = (postId, _id, text) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}/${_id}`,
			text,
			config
		);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
		dispatch(setAlert('Comment added', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});

		//console.log(err.response.data.errors[0].msg);

		// err.response.data.errors.forEach(e => {
		// 	dispatch(setAlert(e.msg, 'danger'));
		// });
	}
};

// replyTo Comment
export const replytoComment = (
	postid,
	commentId,
	formData
) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.put(
			`/api/posts/comment/${postid}/`,
			formData,
			config
		);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
		dispatch(setAlert('Comment added', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});

		//console.log(err.response.data.errors[0].msg);

		err.response.data.errors.forEach(e => {
			dispatch(setAlert(e.msg, 'danger'));
		});
	}
};

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
	try {
		const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId,
		});
		dispatch(setAlert('Comment removed', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});

		//console.log(err.response.data.errors[0].msg);

		err.response.data.errors.forEach(e => {
			dispatch(setAlert(e.msg, 'danger'));
		});
	}
};
