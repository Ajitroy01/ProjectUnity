package com.masai.service;

import java.util.List;

import com.masai.entity.Task;

public interface TaskService {

    Task createTask(Task task);
    Task updateTask(Task task);
    void deleteTask(int taskId);
    Task getTaskById(int taskId);
    List<Task> getAllTasks();
    List<Task> findTasksByUserId(Integer userId);
    Task updateTaskStatusToCompleted(Integer taskId, String status);
}
