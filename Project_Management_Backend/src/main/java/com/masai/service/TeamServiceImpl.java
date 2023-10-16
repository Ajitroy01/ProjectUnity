package com.masai.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.masai.entity.Team;
import com.masai.exception.TeamException;
import com.masai.repository.TeamRepository;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public Team updateTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public void deleteTeam(int teamId) {
        Optional<Team> teamOptional = teamRepository.findById(teamId);
        if (teamOptional.isPresent()) {
            teamRepository.deleteById(teamId);
        } else {
            throw new TeamException("Team not found with ID: " + teamId);
        }
    }

    @Override
    public Team getTeamById(int teamId) {
        Optional<Team> teamOptional = teamRepository.findById(teamId);
        if (teamOptional.isPresent()) {
            return teamOptional.get();
        } else {
            throw new TeamException("Team not found with ID: " + teamId);
        }
    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }
    
    @Override
    public List<Team> findTeamsByUserId(Integer userId) {
        return teamRepository.findByMembers_Id(userId);
    }
    // Additional methods as needed
}
