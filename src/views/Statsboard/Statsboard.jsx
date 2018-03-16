import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';

import Card from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {thArray, tdArray} from 'variables/Variables.jsx';
import StockSymbol from 'variables/StockSymbol.json';
import GraphData from 'variables/GraphData.json'
import { VictoryBar, VictoryChart, VictoryLine } from 'victory';

const StockData = []
var count = 0
var Dates = []

if(StockData.length < 1){
  while(count < 10) {
  count++
  Dates.push(GraphData.dataset.data[count][0])
  console.log(Dates)
  StockData.push(
    {
      x: GraphData.dataset.data[count][0],
      y: GraphData.dataset.data[count][1]
    }
  )
  }
}


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : StockSymbol.filter(Stock =>
    Stock.symbol.toLowerCase().slice(0, inputLength) === inputValue
  ).slice(0,10);
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.symbol;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.symbol}
    {suggestion.name}
  </div>
);

class Statsboard extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  handleSearch () { 
    console.log(this.state.value)
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
       <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                          <h1> StatsBoard </h1>
                          <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                          />
                        <Col md={3}>
                            <i onClick={this.handleSearch.bind(this)} className="fa fa-search"></i><p className="hidden-lg hidden-md">Search</p>
                          </Col>
                        </Col>

                        <Col md={6}>
                            <VictoryChart>
                              <VictoryLine
                                domain ={{y:[0,100]}}
                                data={StockData}
                              />
                            </VictoryChart>
                        </Col>

                        <Col md={12}>
                            <Card
                                plain
                                title="Striped Table with Hover"
                                category="Here is a subtitle for this table"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                {
                                                    thArray.map((prop, key) => {
                                                        return (
                                                        <th  key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tdArray.map((prop,key) => {
                                                    return (
                                                        <tr key={key}>{
                                                            prop.map((prop,key)=> {
                                                                return (
                                                                    <td  key={key}>{prop}</td>
                                                                );
                                                            })
                                                        }</tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
    );
  }
}

export default Statsboard;