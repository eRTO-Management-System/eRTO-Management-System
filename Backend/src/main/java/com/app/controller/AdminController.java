package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.entities.LearningLicense;
import com.app.entities.LearningStatus;
import com.app.entities.PermanentLicense;
import com.app.entities.PermanentStatus;
import com.app.repository.LearningRepository;
import com.app.repository.PermanentRepository;
import com.app.service.IEmailSenderService;
import com.app.service.ILearningService;
import com.app.service.IPermanentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

	// dependency : learning repository
	@Autowired
	private LearningRepository learningRepo;

	// dependency : permanent repository
	@Autowired
	private PermanentRepository permanentRepo;

	// dependency : service layer i/f
	@Autowired
	private ILearningService learningService;

	// dependency : service layer i/f
	@Autowired
	private IPermanentService permanentService;

	// dependency : email service layer i/f
	@Autowired
	private IEmailSenderService emailSenderService;

	// default constr
	public AdminController() {
		System.out.println(getClass().getName());
	}

	// Get method for showing learning list
	@GetMapping("/llist")
	public ResponseDTO<?> getALLLearning(){
		List<LearningLicense> licenses = learningRepo.findAll();
		return new ResponseDTO(HttpStatus.OK,"Successfully collected All PEnding Licenses",licenses);
	}
	@GetMapping("/plist")
	public ResponseDTO<?> getALLPermanent(){
		List<PermanentLicense> licenses = permanentRepo.findAll();
		return new ResponseDTO(HttpStatus.OK,"Successfully collected All PEnding Licenses",licenses);
	}
	// Get method for showing learning 
	@GetMapping("/learning")
	public ResponseDTO<?> getLearning(@RequestParam("id") int id){
		System.out.println(id);
		LearningLicense ll = learningService.findById(id).orElseThrow(()-> new RuntimeException());
		System.out.println(ll);
		
		return new ResponseDTO(HttpStatus.OK,"License collected successfully",ll);
	}
	// Get method for showing permanent
	@GetMapping("/permanent")
	public ResponseDTO<?> getPermanent(@RequestParam("id") int id){
		System.out.println(id);
		PermanentLicense pl = permanentService.findById(id).orElseThrow(()-> new RuntimeException());
		System.out.println(pl);
		
		return new ResponseDTO(HttpStatus.OK,"License collected successfully",pl);
	}


	// Post method for editing the LL status
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("/ledit")
	public ResponseDTO<?> editLearningTable(@RequestBody LearningLicense l)
			throws MailException, InterruptedException {
		LearningStatus status = l.getLearningStatus();
		int id = l.getApplicantId();
		//LearningStatus status = LearningStatus.valueOf(l.getLearningStatus());
		LearningLicense ll = learningService.findById(id).get();
		ll.setLearningStatus(status);
		if (status == LearningStatus.WRITTENTESTPASSED || status == LearningStatus.COMPLETED) {
			ll.setWrittenTestFlag("Y");
		}

		learningService.updateLicense(ll);

	//	 checks whether written test slot is issued or not
		if (ll.getLearningStatus() == LearningStatus.WRITTENSLOTISSUED) {
			// if issued then sends the mail to the applicant
			emailSenderService.sendSimpleEmail(ll.getEmail(),
					"Dear " + ll.getFirstName() + " " + ll.getLastName() + ",\n\n"
							+ "Your Learning License Test will be held on " + ll.getAppointmentDate() + " at "
							+ ll.getAppointmentTime() + "\n" + "Wish you the Best of Luck for the test process.\n"
							+ "In case you have any query, you can connect us at ertomanagementmarchdac2022@gmail.com\n" + "\n"
							+ "\n" + "Warm Regards,\n" + "eRTO Group,\n" + "CDAC Pune Services",
					"eRTO Learning Test");
		}

		// checks whether written test passed/Completed or not
		if (ll.getLearningStatus() == LearningStatus.WRITTENTESTPASSED
				|| ll.getLearningStatus() == LearningStatus.COMPLETED) {
			// if passed then sends the mail to the applicant
			emailSenderService.sendSimpleEmail(ll.getEmail(), "Dear " + ll.getFirstName() + " " + ll.getLastName()
					+ ",\n\n" + "Congratulations, You have successfully cleared the Written Exam For License.\n"
					+ "Learning License is valid for next 6 months only. So, apply for permanent license within the due date.\n"
					+ "\n" + "Warm Regards,\n" + "eRTO Group,\n" + "CDAC Pune Services\n" + "",
					"eRTO Learning Test");
		}

		// checks whether written test failed or not
		if (ll.getLearningStatus() == LearningStatus.WRITTENTESTFAILED) {
			// if failed then sends the mail to the applicant
			emailSenderService.sendSimpleEmail(ll.getEmail(),
					"Dear " + ll.getFirstName() + " " + ll.getLastName() + ",\n\n"
							+ "We are Sorry, but you just failed the Written Exam for License\n"
							+ "Your application form is cancelled. Please apply again.\n" + "\n" + "Warm Regards,\n"
							+ "eRTO Group,\n" + "CDAC Pune Services",
					"eRTO Learning Test");
		}

		// checks whether applicant is rejected or not
		if (ll.getLearningStatus() == LearningStatus.REJECTED) {
			// if rejected then sends the mail to the applicant
			emailSenderService.sendSimpleEmail(ll.getEmail(), "Dear " + ll.getFirstName() + " " + ll.getLastName()
					+ ",\n\n"
					+ "Your learner license application form is rejected, Please fill the form again carefully.\n"
					+ "Warm Regards,\n" + "eRTO Group,\n" + "CDAC Pune Services", "eRTO Driving Test");
		}

		return new ResponseDTO(HttpStatus.OK,"successfully updated",ll);
	}


	// Post method for editing the PL applicant STATUS
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@PostMapping("/pedit")
	public ResponseDTO<?> editPermanentTable(@RequestBody PermanentLicense p)
			throws MailException, InterruptedException {
		
		PermanentStatus status = p.getPermanentStatus();

		PermanentLicense permanentLicense = permanentService.findById(p.getApplicantId()).get();
		permanentLicense.setPermanentStatus(status);

		if (status == PermanentStatus.DRIVINGPASS || status == PermanentStatus.COMPLETED) {
			permanentLicense.setWrittenTestFlag("Y");
		}

		permanentService.updateLisence(permanentLicense);

		// checks whether driving test slot is issued or not
		if (permanentLicense.getPermanentStatus() == PermanentStatus.DRIVINGSLOTISSUED) {
			// if issued then sends the mail to the applicant
			if(permanentLicense.getDistrict().equalsIgnoreCase("JALGAON")) {
			emailSenderService.sendSimpleEmail(permanentLicense.getEmail(),
					"Dear " + permanentLicense.getFirstName() + " " + permanentLicense.getLastName() + ",\n\n"
							+ "Your Driving License Test will be held on " + permanentLicense.getAppointmentDate()
							+ " at " + permanentLicense.getAppointmentTime() + "\n"
							+ "Test Centre : MH-19, RTO Office Jalgaon\n"
							+ "Plot No 7, Mahabal Colony Rd, near SP Chowk, Adarsh Nagar, Ganapati Nagar, Jalgaon,\n\n"
							+ "Wish you the Best of Luck for the test process.\n"
							+ "In case you have any query, you can connect us at ertomanagementmarchdac2022@gmail.com\n" + "\n"
							+ "Warm Regards,\n" + "eRTO Group,\n" + "IACSD pune Services",
					"eRTO Driving Test");
			}
			
			if(permanentLicense.getDistrict().equalsIgnoreCase("Pune")) {
				emailSenderService.sendSimpleEmail(permanentLicense.getEmail(),
						"Dear " + permanentLicense.getFirstName() + " " + permanentLicense.getLastName() + ",\n\n"
								+ "Your Driving License Test will be held on " + permanentLicense.getAppointmentDate()
								+ " at " + permanentLicense.getAppointmentTime() + "\n"
								+ "Test Centre : MH-43, RTO Office Navi Pune\n"
								+ "Sector 19B, Kopri, B-63, Groma Marg, APMC Market 2, APMC Market, Sector 26, Vashi, Navi Pune,\n\n"
								+ "Wish you the Best of Luck for the test process.\n"
								+ "In case you have any query, you can connect us at ertomanagementmarchdac2022@gmail.com\n" + "\n"
								+ "Warm Regards,\n" + "eRTO Group,\n" + "IACSD pune Services",
						"eRTO Driving Test");
				}

		}

		// checks whether driving test passed or not
		if (permanentLicense.getPermanentStatus() == PermanentStatus.DRIVINGPASS) {
			// if passed then sends the mail to the applicant
			emailSenderService.sendSimpleEmail(permanentLicense.getEmail(),
					"Dear " + permanentLicense.getFirstName() + " " + permanentLicense.getLastName() + ",\n\n"
							+ "Congratulations, You have successfully passed the Driving Test For License.\n"
							+ "In case you have any query, you can connect us at ertomanagementmarchdac2022@gmail.com\n" + "\n"
							+ "Warm Regards,\n" + "eRTO Group,\n" + "IACSD pune Services",
					"eRTO Driving Test");

		}

		// checks whether status is completed or not
		if (permanentLicense.getPermanentStatus() == PermanentStatus.COMPLETED) {
			// if completed then sends the mail to the applicant
			emailSenderService.sendSimpleEmail(permanentLicense.getEmail(),
					"Dear " + permanentLicense.getFirstName() + " " + permanentLicense.getLastName() + ",\n\n"
							+ "Your Permanent Driving License is out for delievery, and will reach you in some days.\n"
							+ "Track Your License from here: google.com"
							+ "In case you have any query, you can connect us at ertomanagementmarchdac2022@gmail.com\n" + "\n"
							+ "Warm Regards,\n" + "eRTO Group,\n" + "IACSD pune Services",
					"eRTO Permanent Driving License");

		}

		// checks whether driving test failed or not
		if (permanentLicense.getPermanentStatus() == PermanentStatus.DRIVINGFAIL) {
			// if failed then sends the mail to the applicant
			emailSenderService.sendSimpleEmail(permanentLicense.getEmail(), "Dear " + permanentLicense.getFirstName()
					+ " " + permanentLicense.getLastName() + ",\n\n"
					+ "We are Sorry, but you just failed the Written Exam for License\n"
					+ "Your permanent license application form is cancelled,Please fill again to apply for re-test.\n"
					+ "Warm Regards,\n" + "eRTO Group,\n" + "IACSD pune Services", "eRTO Driving Test");

		}

		// checks whether applicant is rejected or not
		if (permanentLicense.getPermanentStatus() == PermanentStatus.REJECTED) {
			// if rejected then sends the mail to the applicant
			emailSenderService.sendSimpleEmail(permanentLicense.getEmail(), "Dear " + permanentLicense.getFirstName()
					+ " " + permanentLicense.getLastName() + ",\n\n"
					+ "Your permanent license application form is cancelled,Please fill the form again carefully.\n"
					+ "Warm Regards,\n" + "eRTO Group,\n" + "IACSD pune Services", "eRTO Driving Test");
		}
		return new ResponseDTO(HttpStatus.OK,"successfully updated",permanentLicense);
	}

	// Get method for deleting the PL applicant
	@DeleteMapping("/pdelete/{id}")
	public ResponseDTO<?> deletePermanenttable(@PathVariable("id") int id) {

		permanentService.deletePermanentLicenseById(id);

		return new ResponseDTO(HttpStatus.OK,"successfully deleted",null);
	}
	@DeleteMapping("/ldelete/{id}")
	public ResponseDTO<?> deleteLearningtable(@PathVariable("id") int id) {
		
		learningService.deleteLearningLicenseById(id);
		
		return new ResponseDTO(HttpStatus.OK,"successfully deleted",null);
	}
}
