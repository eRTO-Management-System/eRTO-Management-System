package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.LearningLicense;
import com.app.pojos.LearningStatus;
import com.app.pojos.PermanentLicense;
import com.app.pojos.PermanentStatus;
import com.app.pojos.User;
import com.app.repository.LearningRepository;
import com.app.service.ILearningService;
import com.app.service.IPermanentService;
import com.app.service.IUserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/license")
public class LicenseController {

	// dependency : learning service layer i/f
	@Autowired
	private ILearningService learningService;

	// dependency : permanent service layer i/f
	@Autowired
	private IPermanentService permanentService;
	
	@Autowired
	private IUserService userService;

	// default constr
	public LicenseController() {
		System.out.println(getClass().getName());
	}

	// Get method for showing learning form
	@GetMapping("/learning/{id}")
	public ResponseDTO<?> showLearningForm(@PathVariable  int id) {
	
		try {
		LearningLicense	ll = learningService.findByUserId(id);
		if(ll.getLearningStatus()==LearningStatus.COMPLETED)
		return new ResponseDTO(HttpStatus.OK,"Learning Data Collected",ll);
		else if(ll.getLearningStatus()==LearningStatus.APPLIEDFORPERMANENT) {
			return new ResponseDTO(HttpStatus.OK,"Already applied for learning license","Already applied for learning license");
		}
		else
			return new ResponseDTO(HttpStatus.OK,"Wait For Learning License Completion","Wait For Learning License Completion");

		} catch (NullPointerException e) {
			System.err.println("No Learnining License Available");
			return new ResponseDTO(HttpStatus.OK,"First Fill The Learning License Form","First Fill The Learning License Form");
//			
		}
	}
	
	@GetMapping("/learningg/{id}")
	public ResponseDTO<?> showLearningForm1(@PathVariable  int id) {
	
		try {
		LearningLicense	ll = learningService.findByUserId(id);
		if(ll.getLearningStatus()==LearningStatus.COMPLETED || ll.getLearningStatus()==LearningStatus.APPLIEDFORPERMANENT )
		return new ResponseDTO(HttpStatus.OK,"Learning Data Collected",ll);
		else
			return new ResponseDTO(HttpStatus.OK,"Wait For Learning License Completion","Wait For Learning License Completion");

		} catch (NullPointerException e) {
			System.err.println("No Learnining License Available");
			return new ResponseDTO(HttpStatus.OK,"First Fill The Learning License Form","First Fill The Learning License Form");
//			
		}
	}
	
	// Get method for showing permanent form
	@GetMapping("/permanent/{id}")
	public ResponseDTO<?> showPermanentForm(@PathVariable  int id) {
	
		try {
		PermanentLicense pl = permanentService.findByUserId(id);
		if(pl.getPermanentStatus()==PermanentStatus.COMPLETED)
		return new ResponseDTO(HttpStatus.OK,"Permanent Data Collected",pl);
		else
			return new ResponseDTO(HttpStatus.OK,"Wait For Permanent License Completion","Wait For Permanent License Completion");

		} catch (NullPointerException e) {
			System.err.println("No Permanent License Available");
			return new ResponseDTO(HttpStatus.OK,"First Fill The Permanent License Form","First Fill The Permanent License Form");
//			
		}
	}

	// Post method for getting details of learning form
	@PostMapping("/learning")
	public ResponseEntity<?> fillLearningForm(@RequestBody LearningLicense ll) throws MailException, InterruptedException {
		if(learningService.findByUserEmail(ll.getEmail())!=null)
			return ResponseEntity.ok().body("User Already Registered for Learning");
		User user = userService.findUserDetails(ll.getEmail());
		ll.setUser(user);
		ll.setLearningStatus(LearningStatus.BOOKED);
		String message = learningService.applyForLearning(ll);
		
		return ResponseEntity.ok().body(message);
	}
	
	@GetMapping("/lverify/{id}")
	public ResponseEntity<?> checkForLearning(@PathVariable int id)  {
		//if(learningService.findByUserEmail(email)!=null)
			if(learningService.findByUserId(id)!=null)
			return ResponseEntity.ok().body("User Already Registered for Learning");
		
		return ResponseEntity.ok().body("done");
	}

	// Post method for getting details of permanent form
	@PostMapping("/permanent")
	public ResponseEntity<?> fillPermanentForm(@RequestBody PermanentLicense p) throws MailException, InterruptedException {

		
		if(permanentService.findByUserEmail(p.getEmail())!=null)
			return ResponseEntity.ok().body("User Already Registered for Permanent");
		
		LearningLicense ll= learningService.findByUserEmail(p.getEmail());
		ll.setLearningStatus(LearningStatus.APPLIEDFORPERMANENT);
		learningService.updateLicense(ll);
		User user = userService.findUserDetails(p.getEmail());
		p.setUser(user);
		p.setPermanentStatus(PermanentStatus.BOOKED);
		String message = permanentService.applyForPermanent(p);
		
		return ResponseEntity.ok().body(message);

	}

}
