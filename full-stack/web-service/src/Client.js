import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Client extends Component {
    render() {
        return (
            <div className="container my-5 text-center">
                <h4 className="display-4"> Vehicle Registration </h4>
                <p><strong>This is a basic web service for vehicle registration</strong></p>

                <hr className="mt-5"/>
                    <p className="font-weight-bold"> Click to continue </p>

                    <div className="text-center">
                        <Link to={"/addvehicles"} className="btn btn-primary button-center" style={{margin: 5}}>
                            Add Vehicle
                        </Link>
                        <Link to={"/vehicles"} className="btn btn-primary button-center" style={{margin: 5}}>
                            Search Vehicles
                        </Link>
                    </div>
                <hr className="mb-5"/>

                <p>For more information checkout the GitHub documentation.</p>
                <a class="btn btn-dark me-2" target="_blank" rel="noreferrer" href="https://github.com/andresalxortiz/web_service" role="button">GitHub</a>
            </div>
        );
    }
};

export default Client;