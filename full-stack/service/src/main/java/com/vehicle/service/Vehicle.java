package com.vehicle.service;

import javax.persistence.*;

// Did not want to use lombok.NonNull bc of potential issues
import org.springframework.lang.NonNull;

@Entity
public class Vehicle {
	@Id
	@GeneratedValue
	@Column
	private int id;
	@Column
	private int year;
	@Column
	private String make;
	@Column
	private String model;
	
	public Vehicle() {}
	
	public Vehicle(int year, String make, String model) {
		setYear(year);
		setMake(make);
		setModel(model);
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getYear() {
		return this.year;
	}
	
	public void setYear(@NonNull int year) {
		if(year <= 1950 || year >= 2050) {
			throw new IllegalArgumentException("Invalid year: " + year);
		}
		
		this.year = year;
	}
	
	public String getMake() {
		return this.make;
	}
	
	public void setMake(@NonNull String make) {
		if(make.isBlank()) {
			throw new IllegalArgumentException("Invalid make: " + make);
		}
		
		this.make = make;
	}
	
	public String getModel() {
		return this.model;
	}
	
	public void setModel(@NonNull String model) {
		if(model.isBlank()) {
			throw new IllegalArgumentException("Invalid model: " + model);
		}
		
		this.model = model;
	}
	
	@Override
	public String toString() {
		return "Vehicle{" + "id=" + this.id + ", make='" + this.make + '\'' + ", model='" + this.model + '\'' + '}';
	}
}
