import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteVehicle } from "../apiconfig"

class VehicleInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            year: "",
            make: "",
            model: "",
        };
    }

    onDeleteClick(vehicle_id) {
        this.props.deleteVehicle(vehicle_id);
    }

    render() {
        const { vehicle } = this.props;
        console.log(vehicle)

        return (
          <div className="card mb-1 bg-light">
            <div className="card-header text-primary">ID: {vehicle.id}</div>
            <div className="card-body bg-light">
              {//<h5 className="card-title">make</h5>
              }
              <p className="card-text text-truncate ">Year: {vehicle.year}</p>
              <p className="card-text text-truncate ">Make: {vehicle.make}</p>
              <p className="card-text text-truncate ">Model: {vehicle.model}</p>
              <Link to={`/vehicles/${vehicle.id}`} className="btn btn-primary" style={{margin: 3}}>
                  View/Update
              </Link>
              <button className="btn btn-danger ml-4"
              style={{margin: 3}}
              onClick={this.onDeleteClick.bind(this, vehicle.id)}>
                  Delete
              </button>
            </div>
          </div>
        );
      }
}

VehicleInfo.propType = {
    deleteVehicle: PropTypes.func.isRequired,
}

export default connect(null, {deleteVehicle}) (VehicleInfo);