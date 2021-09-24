package com.vehicle.service;

import java.util.*;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {Vehicle.class, VehicleController.class})
@WebMvcTest(controllers = {VehicleController.class})
class ServiceApplicationTests {
	
	@Autowired
	private MockMvc mvc;
	
	@Autowired
	WebApplicationContext webApplicationContext;
	
	@MockBean
	private VehicleController vehicleController;
	
	@MockBean
	private VehicleRegistration vehicleRegistration;
	
	@Autowired
	private ObjectMapper objectMap;
	
	@Autowired
	private Vehicle userVehicle;
	
	@Before
	public void setup() {
		mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}
	
	@Test
	public void testPostMapping() throws Exception {
		userVehicle = new Vehicle(2012, "Mazda", "Rav4");
		
		when(vehicleController.newVehicle(any(Vehicle.class))).thenReturn(userVehicle);
		
		MvcResult result = mvc.perform(post("/vehicles")
				.content(objectMap.writeValueAsString(userVehicle))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated())
				.andReturn();
		
		String content = result.getResponse().getContentAsString();
		System.out.println("This is the result of POST: " + content);
	}
	
	@Test
	public void testGetMapping() throws Exception {
		userVehicle = new Vehicle(2012, "Mazda", "Rav4");
		List<Vehicle> vehicles = new ArrayList<>();
		vehicles.add(userVehicle);
		
		when(vehicleController.newVehicle(any(Vehicle.class))).thenReturn(userVehicle);
		
		mvc.perform(post("/vehicles")
				.content(objectMap.writeValueAsString(userVehicle))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isCreated());
		
		when(vehicleController.all()).thenReturn(vehicles);
		
		MvcResult result = mvc.perform(get("/vehicles")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();
		
		String content = result.getResponse().getContentAsString();
		System.out.println("This is the result of GET: " + content);
	}
	
	@Test
	public void testSetters() {
		userVehicle = new Vehicle();
		userVehicle.setYear(2049);
		userVehicle.setMake("Toyota");
		userVehicle.setModel("Camry");
	}
	
	@Test
	public void testGetters() {
		userVehicle = new Vehicle(1951, "Nissan", "Altima");
		int year = userVehicle.getYear();
		String mod = userVehicle.getModel();
		String make = userVehicle.getMake();
		
		System.out.println(year + " " + mod + " " + make);
	}

}
