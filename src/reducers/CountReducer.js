import {INCREMENT, DECREMENT} from 'actions/types';
const Initial_State = {count:0}

export default (state = Initial_State, action) => {
	switch (action.type) {
		case INCREMENT:
			return Object.assign({}, state, {count: state.count + action.count});
		case DECREMENT:
			return Object.assign({}, state, {count: state.count + action.count});
		default:
			return state
	}
}