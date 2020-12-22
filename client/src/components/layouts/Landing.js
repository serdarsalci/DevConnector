import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Developer Connector</h1>
					<p className='lead'>
						Create a developer profile/portfolio, share posts and get help from
						other developers
					</p>

					<Fragment>
						<div className='buttons'>
							<Link to='/register' className='btn btn-primary'>
								Sign Up
							</Link>
							<Link to='/login' className='btn btn-light'>
								Login
							</Link>
						</div>
					</Fragment>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStatesToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatesToProps)(Landing);
