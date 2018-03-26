import {TYPING_SUGGESTIONS, FETCH_SUGGESTIONS, CLEAR_SUGGESTIONS, SELECT_SUGGESTIONS} from './types';
import StockSymbol from 'variables/StockSymbol.json';

export const onChange = (event, {newValue}) => {
	console.log(newValue);
	console.log(event);
	return (dispatch) => {
		dispatch({
			type: TYPING_SUGGESTIONS,
			payload: newValue
		});    
	}	
};

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : StockSymbol.filter(Stock =>
    Stock.symbol.toLowerCase().slice(0, inputLength) === inputValue
  ).slice(0,10);
};

export const updateSelected = (value) => {
	return (dispatch) => {
		dispatch({
			type: SELECT_SUGGESTIONS,
			payload: value
		})
	}
}

export const onSuggestionsFetchRequested = ({value, reason}) => {
	console.log(value);
	
	return (dispatch) => {
		dispatch({
			type: FETCH_SUGGESTIONS,
			payload: getSuggestions(value)
		})
	}	
};

export const onSuggestionsClearRequested = () => {
	return (dispatch) => {
		dispatch({
			type: CLEAR_SUGGESTIONS,
		  	payload: []
		});
	} 
};
