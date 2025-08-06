package com.app.service;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;

import com.app.entities.User;

public interface IUserService {
	
	//method to save details of newly registerd user
	//public String registerUser(User transientUser) throws MailException, InterruptedException;
	
	public User findUserDetails(String email) ;
	
	public User findUserPassword(String email) throws MailException, InterruptedException;
	
	public User registerUser(User transientUser) throws MailException, InterruptedException;

	public ArrayList<User> getAllUsers();

}
