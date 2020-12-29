import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

// component level state lazim cunku form datasi var bu nedenle useState aldik

const PostForm = ({ addPost }) => {
	const initalFormData = {
		title: '',
		text: '',
	};
	const [formData, setFormData] = useState(initalFormData);

	const { title, text } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const Submit = e => {
		e.preventDefault();
		addPost(formData);
		setFormData(initalFormData);
	};
	return (
		<div class='post-form'>
			<div class='bg-primary p'>
				<h3>Create a post</h3>
			</div>
			<form className='form my-1' onSubmit={e => Submit(e)}>
				<input
					type='text'
					name='title'
					placeholder='Post Title'
					onChange={e => onChange(e)}
					value={title}
					className='my-1'
				/>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Comment on this post'
					value={text}
					onChange={e => onChange(e)}></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

// state import etmedigimiz icin null
export default connect(null, { addPost })(PostForm);
