package com.masai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.masai.entity.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
	Optional<Users> findByUsername(String username);
	List<Users> findByRole(String role);
	@Modifying
	@Query("UPDATE Users u SET u.profilePicture = :profilePicture WHERE u.id = :userId")
	void updateProfilePicture(@Param("userId") int userId, @Param("profilePicture") String profilePicture);
}
