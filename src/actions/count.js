import {INCREMENT, DECREMENT} from 'actions/types';

export const increment = () => {
	console.log("incrementing from actions");
	return (dispatch) => 
		dispatch({
			type: INCREMENT,
			count: 1
		})	
}

export const decrement = () => {
	console.log("decrementing from actions");
	return (dispatch) => {
		dispatch({
			type: DECREMENT,
			count: -1
		})
	}
}
