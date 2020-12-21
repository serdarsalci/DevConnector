import React, { Fragment } from 'react';
import spinner from './orange_circles.gif';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
	<Fragment>
		<img
			src={spinner}
			style={{
				width: 'auto',
				margin: 'auto',
				display: 'block',
				height: '20vh',
				opacity: '0.7',
			}}
			alt='loading..'
		/>
	</Fragment>
);
