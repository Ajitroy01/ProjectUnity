package com.masai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.masai.entity.Team;
import com.masai.service.TeamService;

@RestController
@RequestMapping("/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping("/create")
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        Team createdTeam = teamService.createTeam(team);
        return new ResponseEntity<>(createdTeam, HttpStatus.CREATED);
    }

    @PutMapping("/update/{teamId}")
    public ResponseEntity<Team> updateTeam(@PathVariable int teamId, @RequestBody Team team) {
        team.setId(teamId);
        Team updatedTeam = teamService.updateTeam(team);
        return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{teamId}")
    public ResponseEntity<String> deleteTeam(@PathVariable int teamId) {
        teamService.deleteTeam(teamId);
        return new ResponseEntity<String>("Team with ID " + teamId + " has been deleted successfully.", 	HttpStatus.OK);
    }


    @GetMapping("/by-id/{teamId}")
    public ResponseEntity<Team> getTeamById(@PathVariable int teamId) {
        Team team = teamService.getTeamById(teamId);
        return new ResponseEntity<>(team, HttpStatus.OK);
    }

    @GetMapping("/team-list")
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamService.getAllTeams();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }
    
    @GetMapping("/findTeamsByUserId/{userId}")
    public ResponseEntity<List<Team>> findTeamsByUserId(@PathVariable Integer userId) {
        List<Team> teams = teamService.findTeamsByUserId(userId);
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }
    
}
