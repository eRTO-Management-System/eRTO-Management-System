package com.app.serviceimpl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.UserHandlingException;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.UserRepository;
import com.app.service.IEmailSenderService;
import com.app.service.IUserService;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private IEmailSenderService emailSenderService;

	@Override
	public User findUserDetails(String email) {
		return userRepo.findByEmail(email);
	}

	@Override
	public User findUserPassword(String email) throws MailException, InterruptedException {
		User user = userRepo.findByEmail(email);
		if (user != null) {
			emailSenderService.sendSimpleEmail(
					user.getEmail(),
					"Hello " + user.getFirstName() + ",\nYour password is: " + user.getPassword()
							+ "\nKeep Your Password Secure and Protected\n\nWarm Regards,\neRTO Group,\nSunbeam Institute",
					"eRTO - Forgot Password"
			);
		}
		return user;
	}

	@Override
	public User registerUser(User transientUser) throws MailException, InterruptedException {
		String email = transientUser.getEmail();
		User existingUser = userRepo.findByEmail(email);

		if (existingUser != null) {
			throw new UserHandlingException("Email already registered!");
		}

		transientUser.setRole(Role.CITIZEN);

		User savedUser = userRepo.save(transientUser);
		if (savedUser != null) {
			emailSenderService.sendSimpleEmail(
					savedUser.getEmail(),
					"Dear " + savedUser.getFirstName() + " " + savedUser.getLastName() + ",\n"
							+ "Congratulations! You have successfully registered on the eRTO Portal.\n\n"
							+ "Warm Regards,\neRTO Group,\nSSBT Jalgaon Services",
					"eRTO Registration Successful"
			);
		}

		return savedUser;
	}

	@Override
	public ArrayList<User> getAllUsers() {
		return userRepo.findAll();
	}
}
