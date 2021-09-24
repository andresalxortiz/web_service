import axios from "axios";
import { 
  DELETE_VEHICLE, 
  HANDLE_ERRORS, 
  RETRIEVE_VEHICLE, 
  RETRIEVE_VEHICLES,
} from "./actions/types";

export const createVehicle = ( add_vehicle, history ) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/vehicles", add_vehicle);
    history.push("/vehicles");
    dispatch({
      type: HANDLE_ERRORS,
      payload: {}
    })
  }
  catch (error) {
    dispatch({
      type: HANDLE_ERRORS,
      payload: error.response.data
    })
  }
}

export const retrieveVehicles = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8080/vehicles");
  dispatch({
    type: RETRIEVE_VEHICLES,
    payload: res.data
  });
}

export const deleteVehicle = (vehicle_id) => async (dispatch) => {
  if(window.confirm(`You are deleting vehicle ID:${vehicle_id}. This action cannot be undone.`)) {
    await axios.delete(`http://localhost:8080/vehicles/${vehicle_id}`);
  }
  dispatch ({
    type: DELETE_VEHICLE,
    payload: vehicle_id
  })
}

export const retrieveVehicle = (vehicle_id, history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8080/vehicles/${vehicle_id}`);
  dispatch({
    type: RETRIEVE_VEHICLE,
    payload: res.data
  });
}

export const filterVehicle = (filter, path, history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8080/filter/${path}/${filter}`);
  dispatch({
    type: RETRIEVE_VEHICLES,
    payload: res.data
  })
  history.push(`/filter/${path}/${filter}`)
}