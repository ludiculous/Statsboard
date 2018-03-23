import {FETCH_STOCKS, FETCH_STOCKS_RELEVANT, FETCH_STOCKS_NEWS, UPDATE_STOCK_STATUS} from './types';

export const fetchStockData = (symbol, time) => {
    let url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/${time}`
    //let url = 'https://api.iextrading.com/1.0/stock/aapl/chart/1m';    
	return (dispatch) =>{
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

export const fetchStockRelevant = (symbol) => {
    console.log('fetchingStockData');
    let url = `https://api.iextrading.com/1.0/stock/${symbol}`
    return (dispatch) =>{
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            dispatch({
            type: FETCH_STOCKS_RELEVANT,
            payload: data
            })
        })
        .catch((err) => err)
    }
}

export const fetchStockNews = () => {
    console.log('fetching news');
    let url = `https://api.iextrading.com/1.0/stock/market/news/last/5`
    return (dispatch) =>{
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            dispatch({
            type: FETCH_STOCKS_NEWS,
            payload: data
            })
        })
        .catch((err) => err)
        
    }
}

export const update_stock_status = (stockstatus) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_STOCK_STATUS,
            payload: stockstatus
        })
    }
}