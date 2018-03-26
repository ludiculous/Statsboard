import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux';
import StockSymbol from 'variables/StockSymbol.json';
import {
	update_stock_status,
	onChange, 
	onSuggestionsFetchRequested, 
	onSuggestionsClearRequested, 
	fetchStockData,
	updateSelected
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

class StatsSearch extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			CompanyTime:''
		}
	}

	onSuggestionSelected (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
	  this.props.updateSelected({symbol:suggestion.symbol, name:suggestion.name});
	  this.props.fetchStockData(suggestion.symbol, '1m');
	}

	render(){
		const inputProps = {
	      placeholder: 'Enter Company Symbol',
	      value: this.props.suggestions.value,
	      onChange: this.props.onChange
	    };

		return(
			<Grid fluid>
	           <Row>
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
	           </Row>
	         </Grid>
		)
	}

}

function mapStateToProps(state) {
	return {
		suggestions: state.suggestions,
    	stock: state.stock
	}
}


export default connect(mapStateToProps, {onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested, fetchStockData, update_stock_status, updateSelected})(StatsSearch);