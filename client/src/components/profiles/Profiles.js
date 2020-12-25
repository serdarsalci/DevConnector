import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfieItem';
import { getProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i> Browse and connect with
						developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map(profile => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>no profile found</h4>
						)}
					</div>
					{/* <Link to='testLink' className='btn btn-success'>
						test link
					</Link> */}
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
