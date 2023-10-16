package com.masai.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.masai.entity.Task;
import com.masai.exception.TaskException;
import com.masai.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Task task) {
        if (!taskRepository.existsById(task.getId())) {
            throw new TaskException("Task not found with ID: " + task.getId());
        }
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(int taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new TaskException("Task not found with ID: " + taskId);
        }
        taskRepository.deleteById(taskId);
    }

    @Override
    public Task getTaskById(int taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            return optionalTask.get();
        } else {
            throw new TaskException("Task not found with ID: " + taskId);
        }
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    @Override
    public List<Task> findTasksByUserId(Integer userId) {
        return taskRepository.findByAssignedTeamMember_Id(userId);
    }
    
    @Override
    public Task updateTaskStatusToCompleted(Integer taskId, String status) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);

        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            if (!task.getStatus().equalsIgnoreCase(status)) {
                task.setStatus(status);
                return taskRepository.save(task);
            }
        }

        return null;
    }
    
    // Additional methods as needed
}
