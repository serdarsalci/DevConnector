import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as actionCreators from './actions/profile';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = composeWithDevTools({
	actionCreators,
	trace: true,
	traceLimit: 10,
});

const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(...middleWare))
);

export default store;
