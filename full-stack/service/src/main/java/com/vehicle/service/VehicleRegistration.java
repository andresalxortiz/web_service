package com.vehicle.service;

import java.util.*;
import org.springframework.data.jpa.repository.*;

public interface VehicleRegistration extends JpaRepository<Vehicle, Integer>{
	List<Vehicle> findByYear(int year);
	
	List<Vehicle> findByMakeIgnoreCase(String make);
	
	List<Vehicle> findByModelIgnoreCase(String model);
}
