package com.masai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.masai.entity.Task;
import com.masai.exception.TaskException;
import com.masai.service.TaskService;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        Task updatedTask = taskService.updateTask(task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable int taskId) {
        taskService.deleteTask(taskId);
        return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/by-id/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable int taskId) {
        Task task = taskService.getTaskById(taskId);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @ExceptionHandler(TaskException.class)
    public ResponseEntity<String> handleTaskException(TaskException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
    
    
    @GetMapping("/findTasksByUserId/{userId}")
    public ResponseEntity<List<Task>> findTasksByUserId(@PathVariable Integer userId) {
        List<Task> tasks = taskService.findTasksByUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    
    @PutMapping("/updateTaskStatus/{taskId}/{status}")
    public ResponseEntity<String> updateTaskStatus(@PathVariable Integer taskId, @PathVariable String status) {
        Task updatedTask = taskService.updateTaskStatusToCompleted(taskId, status);
        if (updatedTask != null) {
            return new ResponseEntity<>("Task status updated to completed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Task not found or already completed", HttpStatus.NOT_FOUND);
        }
    }
    // Additional endpoints and exception handling as needed
}
