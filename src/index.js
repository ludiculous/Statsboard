import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from 'containers/App/App.jsx';
import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/css/styles.css';
//import './assets/sass/styles.css';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render((
  <Provider store={store}>   
    <HashRouter>
        <Switch>
            <Route path="/" name="Home" component={App}/>
        </Switch>
    </HashRouter>
  </Provider>  

),document.getElementById('root'));
