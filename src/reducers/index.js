import { combineReducers } from 'redux'
import Count from './CountReducer'
import Suggestions from './SuggestionReducer'
import Stock from './StockReducer'
	
export default combineReducers({
	count: Count,
	suggestions: Suggestions,
	stock: Stock
})