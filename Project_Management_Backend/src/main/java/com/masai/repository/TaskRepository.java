package com.masai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masai.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

	List<Task> findByAssignedTeamMember_Id(Integer userId);
}
