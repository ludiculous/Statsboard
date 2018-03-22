import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import Card from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {thArray, tdArray} from 'variables/Variables.jsx';
import StockSymbol from 'variables/StockSymbol.json';
import GraphData from 'variables/GraphData.json';
import GraphTheme from 'variables/GraphTheme';
import {fetchStockData, onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested} from 'actions'
import { VictoryBar, VictoryChart, VictoryLine, VictoryAxis } from 'victory';

const StockData = []
var count = 0
var Dates = []
var table_title = ''
/*
if(StockData.length < 1){
  while(count < 10) {
  count++
  Dates.push(GraphData.dataset.data[count][0])
  console.log(Dates)
  var time = GraphData.dataset.data[count][0].split("-")
  StockData.push(
    {
      x: new Date(time[0], time[1], time[2]),
      y: GraphData.dataset.data[count][1]
    }
  )
  }
  console.log(StockData.length)
}
*/
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

class Statsboard extends React.Component {
  componentWillMount() {
    
  }


  onSuggestionSelected (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
  table_title = suggestion.name
  console.log(suggestion.symbol)
    this.props.fetchStockData(suggestion.symbol)
  }

  renderStockData() { 
    return this.props.stock.stockdata.map(function(stock,index) {
      console.log(stock.date)
      return(
        <tr key={index}>
          <td>{stock.date}</td>
          <td>{stock.open}</td>
          <td>{stock.high}</td>
          <td>{stock.low}</td>
          <td>{stock.volume}</td>
          <td>{stock.changePercent}</td>                                         
        </tr>
        )
    })
  }

  renderStockChart() {
    var stockData = [];
    var max = '';
    

    this.props.stock.stockdata.map(function(stock,index) {
      
      var time = stock.date
      var newTime = time.split("-");
      var date = new Date(newTime[0],Number(newTime[1]-1).toString(),Number(newTime[2]).toString());
      
      console.log(date);
      stockData.push({
        x: date,
        y: stock.high
      })

      if(max == '') {
        max = stock.high
      }

      if(stock.high > max){
        max = stock.high
      }
    })

    if(stockData.length > 1){

      return (
          <VictoryChart theme={GraphTheme} scale={{x:"time"}} domainPadding={25} >
            <VictoryLine
              domain ={{y:[0,Math.round(max)]}}
              data={stockData}
            />
          </VictoryChart>
      )
    }
  }

  render() {

    const inputProps = {
      placeholder: 'Type a programming language',
      value: this.props.suggestions.value,
      onChange: this.props.onChange
    };

    return (
       <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                          <h1> StatsBoard </h1>
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


                        <Col md={12}>
                            <Card
                                plain
                                title={table_title}
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                               <th>Date</th>
                                               <th>Open</th>
                                               <th>High</th>
                                               <th>Low</th>
                                               <th>Volume</th>
                                               <th>Change Percent</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                              this.renderStockData()
                                            }
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>

                        <Col md={12}>
                           {this.renderStockChart()}
                        </Col>

                    </Row>
                </Grid>
            </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.suggestions,
    stock: state.stock
  }
}

export default connect(mapStateToProps,{onChange, onSuggestionsFetchRequested, onSuggestionsClearRequested, fetchStockData})(Statsboard);