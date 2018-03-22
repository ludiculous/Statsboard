import {FETCH_STOCKS} from 'actions/types';
const Initial_State = {stockdata:[]}

export default (state = Initial_State, action) => {
	switch (action.type) {
		case FETCH_STOCKS:
			console.log(action.payload);
			return Object.assign({}, state, {stockdata:action.payload});
		default:
			return state
	}
}