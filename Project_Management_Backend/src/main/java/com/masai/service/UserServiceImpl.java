package com.masai.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.masai.entity.Users;
import com.masai.exception.CustomException;
import com.masai.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Users registerUser(Users users) {
        // Add logic for user registration (e.g., password hashing)
        return userRepository.save(users);
    }

    @Override
    public Users updateUser(int userId, Users users) {
    	Users existingUser = userRepository.findById(userId).orElseThrow(() -> new CustomException("User does not exist"));

        if (existingUser != null) {
            existingUser.setName(users.getName());
            existingUser.setEmail(users.getEmail());
            existingUser.setRole("ROLE_" +users.getRole().toUpperCase());;
            return userRepository.save(existingUser);
        }
        return null;
    }

    @Override
    public void deleteUser(int userId) throws CustomException {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found with ID: " + userId));
        
        if (user.getRole().equals("ROLE_ADMIN")) {
            throw new CustomException("Admin cannot be deleted.");
        }
        
        userRepository.delete(user);
    }

    @Override
    public Users getUserById(int userId) {
     
    	return userRepository.findById(userId).orElseThrow(() ->  new CustomException("User not found with ID: " + userId));
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

	@Override
	public Users getUserByUsername(String username) {
		return userRepository.findByUsername(username).orElseThrow(() -> new CustomException("User Not Found"));
	}
    
	@Override
    public List<Users> getManagers() {
        return userRepository.findByRole("ROLE_MANAGER");
    }
	
	@Override
    public List<Users> getEmployees() {
        return userRepository.findByRole("ROLE_EMPLOYEE");
    }
	
	 public void updateProfilePicture(int userId, String newProfilePictureUrl) {
	        userRepository.updateProfilePicture(userId, newProfilePictureUrl);
	    }
}

