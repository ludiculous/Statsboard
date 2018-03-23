import {FETCH_STOCKS, FETCH_STOCKS_NEWS, UPDATE_STOCK_STATUS} from 'actions/types';
const Initial_State = {stockdata:[], stocknews:[], stockstatus:[]};

export default (state = Initial_State, action) => {
	switch (action.type) {
		case FETCH_STOCKS:
			console.log(action.payload);
			return Object.assign({}, state, {stockdata:action.payload});
		case FETCH_STOCKS_NEWS:
			return Object.assign({}, state, {stocknews:action.payload});
		case UPDATE_STOCK_STATUS:
			return Object.assign({}, state, {stockstatus:action.payload});
		default:
			return state
	}
}