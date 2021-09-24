import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {Provider} from 'react-redux';
import store from './store';

import Client from "./Client";
import AddVehicle from "./components/AddVehicle.component";
import UpdateVehicle from "./components/UpdateVehicle.component";
import VehiclesList from "./components/VehiclesList.component";
import FilterVehicle from './components/FilterVehicle.component';
import FilteredList from './components/FilteredList.component';

class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Client} />
            <Route exact path="/vehicles" component={VehiclesList} />
            <Route exact path="/addvehicles" component={AddVehicle} />
            <Route exact path="/vehicles/:id" component={UpdateVehicle} />
            <Route exact path="/filter/:input" component={FilterVehicle} />
            <Route exact path="/filter/:input/:filter" component={FilteredList} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
