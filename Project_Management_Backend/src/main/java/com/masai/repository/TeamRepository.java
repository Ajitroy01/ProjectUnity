package com.masai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masai.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Integer> {
	 List<Team> findByMembers_Id(Integer userId);
}
