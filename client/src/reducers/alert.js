import { SET_ALERT, REMOVE_ALERT } from '../actions/types.js';

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (action.type) {
		case SET_ALERT:
			// gelen alert ile ayni mesaja sahip olan alert var ise filtre edip yeni mesaji ekle
			return [...state.filter(alert => alert.msg !== payload.msg), payload];

		// gelen mesajin icerigi halihazirda statede yok  ise state'e ekle var ise statei oldugu gibi gonder
		// if (!state.map(er => er.msg).includes(payload.msg))
		// 	return [...state, payload];
		// else return [...state];
		case REMOVE_ALERT:
			return state.filter(alert => alert.id !== payload);

		default:
			return state;
	}
}
