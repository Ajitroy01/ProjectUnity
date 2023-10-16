package com.masai.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masai.entity.Users;
import com.masai.exception.CustomException;
import com.masai.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/register")
	public ResponseEntity<Users> registerAdmin(@RequestBody Users  user){
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole("ROLE_"+user.getRole().toUpperCase());
		Users registeredAdmin= userService.registerUser(user);
		return new ResponseEntity<>(registeredAdmin,HttpStatus.ACCEPTED);
}
  @PostMapping("/login")
   public ResponseEntity<Users> userLogin(Authentication auth){
	  System.out.println(auth);
	  Users user = userService.getUserByUsername(auth.getName());
	  return new ResponseEntity<Users>(user, HttpStatus.OK);
  }
  
  @GetMapping("/user/{username}")
  public ResponseEntity<Users> getUser(@PathVariable String username){
	  Users user = userService.getUserByUsername(username);
	  return new ResponseEntity<Users>(user, HttpStatus.ACCEPTED);
 }
 
  @GetMapping("/user/managers")
  public ResponseEntity<List<Users>> getManagerIdsAndNames() {
      List<Users> managers = userService.getManagers();
      return new ResponseEntity<>(managers, HttpStatus.OK);
  }
  @GetMapping("/user/employees")
  public ResponseEntity<List<Users>> getEmployeeIdsAndNames() {
      List<Users> employees = userService.getEmployees();
      return new ResponseEntity<>(employees, HttpStatus.OK);
  }
  @PutMapping("/user/update/{userId}")
  public ResponseEntity<?> updateUserAccount(
          @PathVariable int userId,
          @RequestBody Users updatedUser) {
      Users authenticatedUser = userService.getUserById(userId);
      if (authenticatedUser != null &&
          (authenticatedUser.getRole().equals("ROLE_EMPLOYEE") || authenticatedUser.getRole().equals("ROLE_MANAGER"))) {

          Users updatedAccount = userService.updateUser(userId, updatedUser);

          if (updatedAccount != null) {
              return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
          } else {
              return new ResponseEntity<>("User account does not exist.", HttpStatus.NOT_FOUND);
          }
      } else {
          return new ResponseEntity<>("This is an admin account, cannot be updated.",HttpStatus.FORBIDDEN); // User does not have permission.
      }
  }
  
  @PutMapping("/user/update-profile-picture/{userId}")
  public ResponseEntity<String> updateProfilePicture(
      @PathVariable int userId,
      @RequestParam("profilePicture") String newProfilePictureUrl) {

      userService.updateProfilePicture(userId, newProfilePictureUrl);

      return new ResponseEntity<>("Profile picture updated successfully", HttpStatus.OK);
  }
  
  @DeleteMapping("/user/delete/{userId}")
  public ResponseEntity<String> deleteUser(@PathVariable int userId) {
      try {
          userService.deleteUser(userId);
          return new ResponseEntity<String>("User account deleted successfully", HttpStatus.OK);
      } catch (CustomException e) {
          return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
      }
  }
  
  @GetMapping("/user/profile/{userId}")
  public ResponseEntity<?> getUserById(@PathVariable int userId) {
      try {
          Users user = userService.getUserById(userId);
          return new  ResponseEntity<>(user, HttpStatus.OK);
      } catch (CustomException e) {
          return  new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
      }
  }
}
