import {FETCH_SUGGESTIONS, TYPING_SUGGESTIONS, CLEAR_SUGGESTIONS, SELECT_SUGGESTIONS} from 'actions/types';
const Initial_State = {suggestions:[],value:'',selected:{}}

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
		case SELECT_SUGGESTIONS:
			return Object.assign({}, state, {selected:action.payload})
		default:
			return state
	}
}