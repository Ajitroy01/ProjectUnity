package com.masai.service;

import java.util.List;

import com.masai.entity.Team;

public interface TeamService {

    Team createTeam(Team team);
    Team updateTeam(Team team);
    void deleteTeam(int teamId);
    Team getTeamById(int teamId);
    List<Team> getAllTeams();
    List<Team> findTeamsByUserId(Integer userId);
}
