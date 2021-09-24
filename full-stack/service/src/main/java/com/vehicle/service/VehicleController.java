package com.vehicle.service;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class VehicleController {
	
	@Autowired
	private VehicleRegistration registration;
	
	VehicleController(VehicleRegistration registration) {
		this.registration = registration;
	}
	
	@GetMapping("/vehicles")
	public List<Vehicle> all() {
		return registration.findAll();
	}
	
	@PostMapping("/vehicles")
	@ResponseStatus(HttpStatus.CREATED)
	public Vehicle newVehicle(@RequestBody Vehicle newVehicle) {
		return registration.save(newVehicle);
	}
	
	@GetMapping("/vehicles/{id}")
	public Vehicle findOne(@PathVariable int id) {
		return registration.findById(id)
				.orElseThrow(() -> new VehicleNotFoundException(id));
	}
	
	@GetMapping("/filter/year/{year}")
	public List<Vehicle> filterYear(@PathVariable int year) {
		return registration.findByYear(year);
	}
	
	@GetMapping("/filter/make/{make}")
	public List<Vehicle> filterMake(@PathVariable String make) {
		return registration.findByMakeIgnoreCase(make);
	}
	
	@GetMapping("/filter/model/{model}")
	public List<Vehicle> filterModel(@PathVariable String model) {
		return registration.findByModelIgnoreCase(model);
	}
	
	@PutMapping("/vehicles/{id}")
	public Vehicle replaceVehicle(@RequestBody Vehicle newVehicle, @PathVariable int id) {
		return registration.findById(id).map(vehicle -> {
			vehicle.setYear(newVehicle.getYear());
			vehicle.setMake(newVehicle.getMake());
			vehicle.setModel(newVehicle.getModel());
			return registration.save(vehicle);
		})
		.orElseGet(() -> {
			newVehicle.setId(id);
			return registration.save(newVehicle);
		});
	}
	
	@DeleteMapping("/vehicles/{id}")
	public void deleteVehicle(@PathVariable int id) {
		registration.deleteById(id);
	}
}
