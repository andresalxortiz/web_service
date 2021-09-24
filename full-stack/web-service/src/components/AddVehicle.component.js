import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createVehicle } from '../apiconfig';

class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      id: null,
      year: "",
      make: "",
      model: "",
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const newVehicle = {
        year: this.state.year,
        make: this.state.make,
        model: this.state.model,
    };
    this.props.createVehicle(newVehicle, this.props.history);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="addVehicle">
        <Link to={"/"} className="btn btn-outline-primary" style={{margin: 5}}>
          Home
        </Link>
        <Link to={"/Vehicles"} className="btn btn-outline-primary" style={{margin: 5}}>
          Vehicle List
        </Link>
        <div className="container my-4">
            <div className="row">
                <div className="col-md-5 m-auto">
                    <h4 className="display-4 text-center">
                        Add Vehicle
                    </h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="year"
                                value={this.state.year}
                                placeholder="Year of Vehicle"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="make"
                                value={this.state.make}
                                placeholder="Vehicle Make"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="model"
                                value={this.state.model}
                                placeholder="Vehicle Model"
                                onChange={this.onChange}
                            />
                        </div>
                        <input
                            type="submit"
                            className="btn btn-primary btn-block mt-4"
                        />
                    </form>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

AddVehicle.propTypes = {
  createVehicle: PropTypes.func.isRequired,
  vehicles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  vehicles: state.vehicleReducer,
})

export default connect(mapStateToProps, {createVehicle}) (AddVehicle);