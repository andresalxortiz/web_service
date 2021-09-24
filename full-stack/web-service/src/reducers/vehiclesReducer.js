import {
    RETRIEVE_VEHICLES,
    CREATE_VEHICLE,
    RETRIEVE_VEHICLE,
    DELETE_VEHICLE,
} from "../actions/types";

const initialState = {
    vehicles: [],
    vehicle: {}
};

function vehicleReducer(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case RETRIEVE_VEHICLES:
            return {
                ...state,
                vehicles: payload,
            };

        case CREATE_VEHICLE:
            return [...state, payload];

        case RETRIEVE_VEHICLE:
            return {
                ...state,
                vehicle: payload,
            };

        case DELETE_VEHICLE:
            return {
                ...state,
                vehicles: state.vehicles.filter(
                    vehicle => vehicle.id !== payload
                )
            };

        default:
            return state;
    }
};

export default vehicleReducer;