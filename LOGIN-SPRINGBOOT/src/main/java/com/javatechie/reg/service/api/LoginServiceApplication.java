package com.javatechie.reg.service.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import com.javatechie.reg.service.api.dao.UserRepository;
import com.javatechie.reg.service.api.model.User;

import connect.Connect;

import org.springframework.http.MediaType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Service
@SpringBootApplication
@RestController
//This @CrossOrigin annotation enables cross-origin resource sharing only for this specific method.
@CrossOrigin(origins = "*")

/**														
 * receive request from client											
 *														
 * @author ivs 														
 */	
public class LoginServiceApplication {

	@Autowired
	//inject một instance của UserRepository vào thuộc tính này khi khởi tạo LoginServiceApplication
	private UserRepository repository;

	//request mapping from client with post medthod, data types is json or xml
	@RequestMapping(value = "/login/api/v1/XXXXXXXXXX", //
			method = RequestMethod.POST, //
			produces = { MediaType.APPLICATION_JSON_VALUE, //
					MediaType.APPLICATION_XML_VALUE })
	
	/**
	 * login: implement and response
	 * @param user
	 * @return false or true
	 * @throws Exception
	 * @throws SQLException
	 */
	@ResponseBody
	public Boolean login(@RequestBody User user) throws Exception, SQLException {
		String email = user.getEmail(); //get email from body api
		System.out.println("\n\n Email nhap vao: " + email);
		String pass = user.getPassword(); //get passwork from body api	
		System.out.println("\n Password nhap vao: " + pass);

		//implement search into database with condition is email, passwork
		Connection con = Connect.getMySQLConnection();
		PreparedStatement statement = con.prepareStatement("select * from user where email=? and password=?");
		statement.setString(1, email);
		statement.setString(2, pass);
		ResultSet in = statement.executeQuery();
		in.next();
		if (in.getRow() == 1) { //found into database
			return false; //return for client is found
		} else {
			return true; //return for client is not found
		}

	}

	/**
	 * user registration
	 * @param user
	 * @return
	 */
	@PostMapping("/register/api/v1/XXXXXXXXXX")
	public String register(@RequestBody User user) {
		repository.save(user);
		return "Hi " + user.getName() + " your Registration process successfully completed"; //show success
	}

	/**
	 * get all user
	 * @return
	 */
	@GetMapping("/getAllUsers/api/v1/XXXXXXXXXX")
	public List<User> findAllUsers() {
		
		return repository.findAll(); //return all user for client
	}

	/**
	 * Find user with email
	 * @param email
	 * @return
	 */
	@GetMapping("/findUser/api/v1/XXXXXXXXXX/{email}")
	public List<User> findUser(@PathVariable String email) {

		return repository.findByEmail(email); //return info of emaill for client
	}

	/**
	 * delete user with id
	 * @param id
	 * @return
	 */
	@DeleteMapping("/cancel/api/v1/XXXXXXXXXX/{id}")
	public List<User> cancelRegistration(@PathVariable int id) {
		repository.deleteById(id);

		return repository.findAll();//return list deleted
	}

	/**
	 * main
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(LoginServiceApplication.class, args);
	}

}
