import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	profile,
	showActions,

	post: { _id, text, name, avatar, user, likes, comments, date, title },
}) => {
	return (
		<>
			<div class='post bg-white p-1 my-1'>
				<div>
					<img class='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
					<Link to={profile ? `/profile/${user}` : `/posts`}>
						<h6>{profile && 'view profile'} </h6>
					</Link>
				</div>

				<div>
					<h4 className=''>{title}</h4>
					<p className='mv'>{text}</p>
					<p class='post-date'>
						Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
					</p>
					{showActions && (
						<Fragment>
							<button
								onClick={e => addLike(_id)}
								type='button'
								class='btn btn-light'>
								<i class='fas fa-thumbs-up'></i>{' '}
								<span>
									{likes.length > 0 && (
										<span class='comment-count m-p-h'>{likes.length}</span>
									)}
								</span>
							</button>
							<button
								onClick={e => removeLike(_id)}
								type='button'
								class='btn btn-light'>
								<i class='fas fa-thumbs-down'></i>
							</button>

							<Link to={`/posts/${_id}`} class='btn btn-primary'>
								Discussion
								{comments.length > 0 ? (
									<span class='comment-count m-p-h'>{comments.length}</span>
								) : (
									<span class='m-p-h'></span>
								)}
							</Link>

							{!auth.loading && user === auth.user._id && (
								<button
									type='button'
									onClick={e => deletePost(_id)}
									className='btn btn-danger'>
									<i class='fas fa-times'></i>
								</button>
							)}
						</Fragment>
					)}
				</div>
			</div>
		</>
	);
};

PostItem.defaultProps = {
	showActions: true,
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
