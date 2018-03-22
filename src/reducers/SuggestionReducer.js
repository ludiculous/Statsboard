import {FETCH_SUGGESTIONS, TYPING_SUGGESTIONS, CLEAR_SUGGESTIONS} from 'actions/types';
const Initial_State = {suggestions:[],value:''}

export default (state = Initial_State, action) => {
	switch (action.type) {
		case FETCH_SUGGESTIONS:
			console.log(action.payload);
			return Object.assign({}, state, {suggestions:action.payload});
		case TYPING_SUGGESTIONS:
			console.log("typing in reducer")
			return Object.assign({}, state, {value:action.payload});
		case CLEAR_SUGGESTIONS:
			console.log("Cleared")
			return Object.assign({}, state, {suggestions:[]});
		default:
			return state
	}
}