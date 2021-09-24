import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { filterVehicle } from '../apiconfig';

class FilterVehicle extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            filter: ""
        };
    }

    onChange(e) {
        this.setState({
            filter: e.target.value 
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.filterVehicle(this.state.filter, this.props.match.params.input, this.props.history);
    }

    render() {
        return (
            <div className="filterVehicle">
                <Link to={"/Vehicles"} className="btn btn-outline-primary" style={{margin: 5}}>
                    Back
                </Link>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <h4 className="display-4 text-center">
                                Search by {this.props.match.params.input}
                            </h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="filter"
                                        value={this.state.filter}
                                        placeholder="Search Keyword"
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

FilterVehicle.propTypes = {
    filterVehicle: PropTypes.func.isRequired,
    vehicle: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    vehicle: state.vehicleReducer
});

export default connect(mapStateToProps, {filterVehicle})(FilterVehicle);