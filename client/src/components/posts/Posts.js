import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import Spinner from '../layouts/Spinner';
import PostForm from './PostForm';
import { getProfiles } from '../../actions/profile';

const Post = ({
	auth,
	getPosts,
	getProfiles,
	profiles,
	post: { posts, loading },
}) => {
	useEffect(() => {
		getProfiles();
		getPosts();
	}, []);
	const ids = profiles.profiles.map(pro => pro.user._id);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i>Welcome to the community
			</p>
			<PostForm />
			<div className='posts'>
				{posts.map(post => (
					<PostItem
						key={post._id}
						post={post}
						profile={ids.includes(post.user) ? true : false}
					/>
				))}
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	post: state.post,
	profiles: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, getProfiles })(Post);
