import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
	(alerts !== null && alerts.length) > 0 ? (
		alerts.map(alert => (
			<div
				key={alert.id}
				className={`alert alert-${alert.alertType}`}
				style={{ minHeight: '3rem' }}>
				{alert.msg}
			</div>
		))
	) : (
		<div style={{ minHeight: '3rem' }}></div>
	);

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	// reducer / index.js in icinde alert from root reducer (index)
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
