package com.vehicle.service;

public class VehicleNotFoundException extends RuntimeException{
	VehicleNotFoundException(int id) {
		super("Could not find vehicle " + id);
	}
}
