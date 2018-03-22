import {FETCH_STOCKS} from './types';

export const fetchStockData = (symbol) => {
	console.log('fetchingStockData');
    let time = ''	
    let url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/${time}`
    //let url = 'https://api.iextrading.com/1.0/stock/aapl/chart/1m';    
	return (dispatch)=>{
		fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            dispatch({
            type: FETCH_STOCKS,
            payload: data
            })
        })
        .catch((err) => err)
        
        
	}
}