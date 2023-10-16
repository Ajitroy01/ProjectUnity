package com.masai.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.masai.entity.Users;
import com.masai.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<Users> opt = userRepo.findByUsername(username);
		
		if(opt.isPresent()) {
			Users users = opt.get();
            List<GrantedAuthority> authorities= new ArrayList<>();	
			
			SimpleGrantedAuthority sga= new SimpleGrantedAuthority(users.getRole());
			authorities.add(sga);
			
			return new User(users.getUsername(), users.getPassword(), authorities);
		
		}else {
			throw new UsernameNotFoundException("User Details not found with this username: "+username);
		}
	}
	}
