package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.mail.MailException;

import com.app.entities.LearningLicense;

public interface ILearningService {

	// for saving LL object 
	String applyForLearning(LearningLicense ll) throws MailException, InterruptedException;

	// for finding LL object associated with the user using userId
	LearningLicense registerForLearning(LearningLicense ll, Integer userId) throws InterruptedException;

	// method to find LL obj by applicationId
	Optional<LearningLicense> findById(Integer applicantId);

	// method to find LL obj by userId
	LearningLicense findByUserId(Integer userId);

	// method to find LL obj by userId
	LearningLicense findByUserEmail(String email);

	// method to delete LL obj
	void deleteLearningLicenseById(Integer applicantId);

	// method for updating LL obj
	boolean updateLicense(LearningLicense ll);

	void saveUpdatedLL(LearningLicense ll);

	ArrayList<LearningLicense> getTomorrowApplicants();

	ArrayList<LearningLicense> getApplicantsByDate(LocalDate date);

}
