import React, { Component } from "react";
import { Link } from "react-router-dom";
import { retrieveVehicle, createVehicle } from '../apiconfig';
import { connect } from "react-redux";
import PropTypes from "prop-types";


class UpdateVehicle extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: "",
            year: "",
            make: "",
            model: ""
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.retrieveVehicle(id);
    }

    componentWillReceiveProps(nextProps) {
        const {
            id,
            year,
            make,
            model
        } = nextProps.vehicle;

        this.setState({
            id,
            year,
            make,
            model
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const updatedVehicle = {
            id: this.state.id,
            year: this.state.year,
            make: this.state.make,
            model: this.state.model,
        };
        // console.log(newVehicle);
        this.props.createVehicle(updatedVehicle, this.props.history);
      }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value });
    }

    render() {
        return (
          <div className="addVehicle">
            <Link to={"/vehicles"} className="btn btn-outline-primary" style={{margin: 5}}>
                Back
            </Link>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 m-auto">
                        <h4 className="display-5 text-center">
                            View/Update Vehicle ID:{this.state.id}
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
};

UpdateVehicle.propTypes = {
    retrieveVehicle: PropTypes.func.isRequired,
    createVehicle: PropTypes.func.isRequired,
    vehicle: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    vehicle: state.vehicleReducer.vehicle
});

export default connect(mapStateToProps, {retrieveVehicle, createVehicle})(UpdateVehicle);