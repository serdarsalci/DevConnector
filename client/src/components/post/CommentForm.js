import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState('');

	const onChan = e => setText(e.target.value);

	const Submit = e => {
		e.preventDefault();
		addComment(postId, { text });
		setText('');
	};

	return (
		<div class='post-form'>
			<div class='bg-primary p'>
				<h4>Leave a comment</h4>
			</div>
			<form className='form my-1' onSubmit={e => Submit(e)}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Comment on this post'
					value={text}
					onChange={e => onChan(e)}></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
