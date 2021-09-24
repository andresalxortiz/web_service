import { combineReducers } from "redux";
import vehicleReducer from "./vehiclesReducer";

export default combineReducers ({
    vehicleReducer: vehicleReducer,
});