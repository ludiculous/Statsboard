import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import {Card} from 'components/Card/Card.jsx';
import {fetchStockNews} from 'actions';
import {StatsCard} from 'components/StatsCard/StatsCard.jsx';


class Dashboard extends Component {

componentWillMount() {
 this.props.fetchStockNews()  
 
}

renderStockNews(){
    return this.props.stock.stocknews.map(function(news, index){
        var size = 4;
        index == 0 ?size = 12: size=4;
        return (
             <Col md={size}>
                <a href={news.url} key={index}>
                    <Card 
                        title={news.headline}
                        category={news.source}
                        content={news.summary}
                        className="table-full-width"
                    />
                </a>
            </Col>
        )
    });
}

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                       {this.renderStockNews()}
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        stock: state.stock    
    }
}

export default connect(mapStateToProps,{fetchStockNews})(Dashboard);
