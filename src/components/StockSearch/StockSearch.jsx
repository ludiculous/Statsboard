import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import StockSymbol from 'variables/StockSymbol.json';
import {
	update_stock_status,
	onChange, 
	onSuggestionsFetchRequested, 
	onSuggestionsClearRequested, 
	fetchStockData
} from 'actions';

const getSuggestionValue = function(suggestion){
  return suggestion.symbol;
  console.log(suggestion)
}

const renderSuggestion = suggestion => (
  <ul>
    <li>{suggestion.symbol}</li>
    <li>{suggestion.name}</li>
  </ul>
);

const inputProps = {
      placeholder: 'Enter Company Symbol',
      value: this.props.suggestions.value,
      onChange: this.props.onChange
    };

class StatsSearch extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			CompanyTime:''
		}
	}

	onSuggestionSelected (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
	  table_title = suggestion.name
	  console.log(suggestion.symbol)
	  this.props.fetchStockData(suggestion.symbol)
	}

	render(){
		return(
			<Col md={12}>
				<Autosuggest
		            suggestions={this.props.suggestions.suggestions}
		            onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
		            onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
		            onSuggestionSelected = {this.onSuggestionSelected.bind(this)} 
		            getSuggestionValue={getSuggestionValue}
		            renderSuggestion={renderSuggestion}
		            inputProps={inputProps}
	          	/>
          	</Col>
		)
	}

}

function mapStateToProps(state) {
	return {
		suggestions: state.suggestions,
    	stock: state.stock
	}
}


export default connect(mapStateToProps, {onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested, fetchStockData, update_stock_status})(StatsSearch);