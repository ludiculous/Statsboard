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

var CompanyTime = ''

class Statsboard extends React.Component {
  componentWillMount() {
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


  renderStockTable() {
    if(this.props.stock.stockdata.length > 1){
     return(
      <Card
          plain
          title={this.props.suggestions.selected.name}
          ctTableFullWidth ctTableResponsive
          content={
              <Table className="stock-chart-header">
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
      )
    }
  }

  fetchStockTime(CompanySymbol, time){
    if(CompanyTime !== time){
      this.props.fetchStockData(CompanySymbol, time);  
    }
    CompanyTime = time;
  }

  renderStockChart() {
    var stockData = [];
    var max = '';
    var context = this;

    this.props.stock.stockdata.map(function(stock,index) {


      console.log(stock.high);
      var time = stock.date
      var date = new Date(time).toLocaleDateString('en-US');
      
      console.log(date);
      stockData.push({
        x: date,
        y: stock.high || null
      })

      if(max == '') {
        max = stock.high
      }

      if(stock.high > max){
        max = stock.high
      }
      console.log(max)
    })

    if(stockData.length > 1){

      return (
        <Col md={12}>
          <Table hover>
            <thead>
              <tr> 
                <th onClick={()=>{context.fetchStockTime(this.props.suggestions.selected.symbol, '1m')}}>1m</th>
                <th onClick={()=>{context.fetchStockTime(this.props.suggestions.selected.symbol, '3m')}}>3m</th>
                <th onClick={()=>{context.fetchStockTime(this.props.suggestions.selected.symbol, '1y')}}>1y</th>
                <th onClick={()=>{context.fetchStockTime(this.props.suggestions.selected.symbol, '5y')}}>5y</th>
              </tr>
            </thead>
          </Table>                         
          <VictoryChart theme={GraphTheme} scale={{x:"time"}}>
            <VictoryAxis
                tickCount={5}
              />
             <VictoryAxis dependentAxis
              domain={[0,Math.round(max)]}
              offsetX={50}
              orientation="left"
              standalone={false}
            />
            <VictoryLine
              data={stockData}
            />
          </VictoryChart>
        </Col>
      )
    }
  }

  render() {

    return (
       <div className="content">
          <Grid fluid>
            <Row>
              <h3>Stock Search Analysis</h3>
                <Col md={12}>
                  <h2>{this.props.suggestions.selected.name}</h2>
                </Col>
                <Col md={12}>
                   {this.renderStockChart()}
                </Col>  
                   {this.renderStockTable()}
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