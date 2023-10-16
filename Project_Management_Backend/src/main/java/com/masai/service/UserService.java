package com.masai.service;

import java.util.List;

import com.masai.entity.Users;
import com.masai.exception.CustomException;

public interface UserService {
	 Users registerUser(Users users);
	 Users updateUser(int userId, Users users);
	 void deleteUser(int userId) throws CustomException;
	 Users getUserById(int userId);
	 Users getUserByUsername(String username);
	 List<Users> getAllUsers();
	 List<Users> getManagers();
	 List<Users> getEmployees();
	 void updateProfilePicture(int userId, String newProfilePictureUrl);
}
