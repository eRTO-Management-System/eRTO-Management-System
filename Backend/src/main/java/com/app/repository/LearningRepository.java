package com.app.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.LearningLicense;
import com.app.entities.User;

@Repository
public interface LearningRepository extends JpaRepository<LearningLicense, Integer> {

	LearningLicense findByAadharNo(String aadharNo);

	// to find user details using userId
	@Query("SELECT l FROM LearningLicense l WHERE l.user = :a")
	public LearningLicense findByUserId(@Param("a") User user);

	
//	@Query("SELECT l FROM LearningLicense l WHERE l.appointmentDate = :date")
//	ArrayList<LearningLicense> findAllApplicants(@Param("date") LocalDate date);

//	@Query("SELECT l FROM LearningLicense l WHERE l.appointmentDate = :date")
//	ArrayList<LearningLicense> findAllApplicants(@Param("date") java.time.LocalDate date);

	// to find all the applicants today at a specific time
	@Query("SELECT l FROM LearningLicense l WHERE l.appointmentDate = CURRENT_DATE AND l.appointmentTime = :time")
	ArrayList<LearningLicense> findAllApplicantsWithTime(@Param("time") LocalTime time);

	// to find all the applicants having appointment today at 1:30 PM
	@Query("SELECT l FROM LearningLicense l WHERE l.appointmentDate = CURRENT_DATE AND l.appointmentTime = '13:30:00'")
	public ArrayList<LearningLicense> findAllApplicantsWithTime130();
	
	@Query("SELECT l FROM LearningLicense l WHERE l.slotDate = :date") // ✅ CORRECT
	ArrayList<LearningLicense> findAllApplicants(@Param("date") LocalDate date);


	// to find all the applicants having appointment today at 3:30 PM
	@Query("SELECT l FROM LearningLicense l WHERE l.appointmentDate = CURRENT_DATE AND l.appointmentTime = '15:30:00'")
	public ArrayList<LearningLicense> findAllApplicantsWithTime330();
}
