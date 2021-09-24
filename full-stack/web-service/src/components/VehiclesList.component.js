import React, { Component } from "react";
import { Link } from "react-router-dom";
import { retrieveVehicles } from '../apiconfig';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VehicleInfo from "./VehicleInfo.component";

class VehiclesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      year: "",
      make: "",
      model: ""
    };
  }

  componentDidMount() {
    this.props.retrieveVehicles();
  }

  render() {
    const { vehicles } = this.props.vehicles;

    let PageContent;
    let VehicleContent = [];

    const VehicleAlgorithm = vehicles => {
      if(vehicles.length < 1) {
        return (
          <div className="text-center">
            <div className="alert alert-info" role="alert">
              No Vehicle Information available.
            </div>
            <Link to={"/"} className="btn btn-primary button-center" style={{margin: 5}}>
                Home
            </Link>
          </div>
        )
      }
      else {
        const content = vehicles.map(vehicle => (
          <VehicleInfo key={vehicle.id} vehicle={vehicle}/>
        ));

        VehicleContent.push(content);

        return (
          <React.Fragment>
            <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <Link to={"/"} className="btn btn-outline-primary" style={{margin: 3}}>
                      Home
                    </Link>
                    <Link to={"/filter/year"}
                      className="btn btn-outline-secondary"
                      type="button"
                      style={{margin: 3}}
                    >
                      Search By Year
                    </Link>
                    <Link to={"/filter/make"}
                      className="btn btn-outline-secondary"
                      type="button"
                      style={{margin: 3}}
                    >
                      Search By Make
                    </Link>
                    <Link to={"/filter/model"}
                      className="btn btn-outline-secondary"
                      type="button"
                      style={{margin: 3}}
                    >
                      Search By Model
                    </Link>
                    <Link to={"/addvehicles"} className="btn btn-outline-primary" style={{margin: 3}}>
                      New
                    </Link>
                  </div>
                </div>
              </div>

              { VehicleContent }
            </div>
          </React.Fragment>
        )
      }
    }

    PageContent = VehicleAlgorithm(vehicles);

    return (
      <div className="container">
        {PageContent}
      </div>
    );
  }
}

VehiclesList.propTypes = {
  retrieveVehicles: PropTypes.func.isRequired,
  vehicles: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  vehicles: state.vehicleReducer
})
export default connect(mapStateToProps, {retrieveVehicles}) (VehiclesList);