import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
	deleteComment,
	replytoComment,
	addComment,
	replyCom,
} from '../../actions/post';

const CommentItem = ({
	auth,
	postId,
	deleteComment,
	addComment,
	replyCom,
	comment: { _id, text, name, avatar, user, date, postedTo },
}) => {
	const [rtext, setrText] = useState('');

	const [reply, setReply] = useState(false);

	const openReply = () => {
		setReply(!reply);
	};

	const onChange = e => {
		setrText(e.target.value);
	};

	const submitComment = e => {
		addComment(postId, _id, text);

		setrText('');
		setReply(false);
		console.log(_id);
	};
	return (
		<div class='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img class='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p class='my-1'>{text}</p>
				<p class='post-date'>
					Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				<p>Comment Id: {_id}</p>
				<p>Posted to {postedTo}</p>

				{reply && (
					<div>
						<input
							style={{ display: 'inline-block', width: '60%' }}
							type='text'
							name='rtext'
							value={rtext}
							className=' mh-1'
							onChange={e => onChange(e)}></input>
						<button onClick={e => openReply(e)} className='btn btn-danger'>
							<i class='far fa-trash-alt'></i>
						</button>
						<button onClick={e => submitComment(e)} className='btn btn-primary'>
							Submit
						</button>
					</div>
				)}
				{!reply && (
					<button onClick={e => openReply(e)} className='btn'>
						reply
					</button>
				)}

				{!auth.loading && user === auth.user._id && (
					<button
						onClick={e => deleteComment(postId, _id)}
						type='button'
						className='btn btn-danger'>
						<i class='far fa-trash-alt'></i>
					</button>
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	postId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
	addComment: PropTypes.func.isRequired,
	replyToComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	deleteComment,
	addComment,
	replyCom,
})(CommentItem);
