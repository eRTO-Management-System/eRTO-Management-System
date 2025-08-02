package com.app.controller;

import java.io.File;
import java.util.ArrayList;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.UserHandlingException;
import com.app.dto.MessageDto;
import com.app.dto.ResponseDTO;
import com.app.dto.UserDto;
import com.app.pojos.Images;
import com.app.pojos.LearningLicense;
import com.app.pojos.LearningStatus;
import com.app.pojos.PermanentLicense;
import com.app.pojos.PermanentStatus;
import com.app.pojos.User;
import com.app.repository.ImagesRepository;
import com.app.service.IImageService;
import com.app.service.ILearningService;
import com.app.service.IPermanentService;
import com.app.service.IUserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
	
	 @Value("${file.upload-dir}")
     private String FILE;

	// dependency : user service layer
	@Autowired
	private IUserService userService;
	
	// dependency : learning service layer
	@Autowired
	private ILearningService learningService;
	
	// dependency : permanent service layer
	@Autowired
	private IPermanentService permanentService;
	
	@Autowired
	private IImageService imageService;
	
	@Autowired 
	private ImagesRepository imgRepo;
	
	

	// Get method for showing login form
	@PostMapping("/login")
	public ResponseDTO<?> showLoginForm(@RequestBody UserDto user ) {
		System.out.println("In Show Login form.....");
		System.out.println(user);
		try {
		User user1 = userService.findUserDetails(user.getEmail());
		if(user1.getEmail().equalsIgnoreCase(user.getEmail())&& user1.getPassword().equals(user.getPassword()))
		return new ResponseDTO(HttpStatus.OK,"Succesfully Logged in",user1);
		else
			return new ResponseDTO(HttpStatus.BAD_REQUEST,"No User Found",null);
		}catch (Exception e) {
			return new ResponseDTO(HttpStatus.BAD_REQUEST,"failed to Login",null);
		}
		
			
	}
	
	@PostMapping("/forgot")
	public ResponseDTO<?> forgotPassword(@RequestBody UserDto user ) {
		System.out.println("Inside Forgot Password");
		System.out.println(user.getEmail());
		try {
		User user1 = userService.findUserPassword(user.getEmail());
		if(user1.getEmail().equalsIgnoreCase(user.getEmail()))
		return new ResponseDTO(HttpStatus.OK,"Succesfully Logged in",user1);
		else
			return new ResponseDTO(HttpStatus.BAD_REQUEST,"No User Found",null);
		}catch (Exception e) {
			return new ResponseDTO(HttpStatus.BAD_REQUEST,"Some error occured try again",null);
		}
		
			
	}
	
	
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User	 user ) {
		
		try {
			return ResponseEntity.ok().body(userService.registerUser(user));
		} catch (Exception e) {
			
			throw new UserHandlingException(e.getMessage());
		}
	}
	
	@PostMapping("/addimage")
	public ResponseDTO<?> addImage(@RequestParam MultipartFile profile , @RequestParam String email) throws IOException{
		 File imageFile = new File(FILE+profile.getOriginalFilename());
	        imageFile.createNewFile();
	        FileOutputStream fos = new FileOutputStream(imageFile);
	        fos.write(profile.getBytes());
	        fos.close(); 
	        String msg="failed";
		User user1 = userService.findUserDetails(email);
		Images img = imgRepo.findByUserId(user1);
		if(img==null) {
		Images i = new Images(profile.getOriginalFilename());
		i.setUser(user1);
		 msg = imageService.saveImage(i);
		}
		else {
			img.setProfilePhoto(profile.getOriginalFilename());
			 msg = imageService.saveImage(img);	
		}
			
		return new  ResponseDTO<>(HttpStatus.OK,msg,profile.getOriginalFilename());
	}
	
	
	@GetMapping("/getimage/{id}")
	public ResponseDTO<?> getImage(@PathVariable int id){
		Images i = imageService.findImage(id);
		return new ResponseDTO<>(HttpStatus.OK,"success",i.getProfilePhoto());
	}
	
	

	
	
	@GetMapping("/users")
	public ArrayList<User> getAll() {
		
		
		return userService.getAllUsers();
	}


	// Get method for showing status page
	@GetMapping("/status/{id}")
	public ResponseEntity<?> showStatusPage(@PathVariable  int id) {
      System.out.println("in show status page...."+id);

		LearningLicense ll = learningService.findByUserId(id);
		
		if (ll == null) {
			return ResponseEntity.ok().body("Please apply for Learning License first!");
			
		}
		
		LearningStatus s1 = ll.getLearningStatus();
		if (s1 == LearningStatus.BOOKED)
		return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE FORM SUBMITTED ","Your Learning License Application Form is under Process, Confirmation regarding test will reach you within 48 hours.",null,null));

		if (s1 == LearningStatus.WRITTENSLOTISSUED) {
			String msg= "Your schedule has been confirmed.Test Date : " + ll.getAppointmentDate()
						+ " Test Time : " + ll.getAppointmentTime() + ".";
			return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE TEST SLOT ISSUED ",msg,null,null));
		}
		if (ll.getWrittenTestFlag().equalsIgnoreCase("Y")) {
			if (s1 == LearningStatus.WRITTENTESTPASSED)
				return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE WRITTEN TEST PASSED ","Congratulations, You have cleared the written test for Learning license. Please collect your license from the nearest RTO office",null,null));
		} else {
		if (s1 == LearningStatus.WRITTENTESTFAILED)
				return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE WRITTEN TEST FAILED","Sorry, but you have failed in clearing the written test for learning license. Your application form is cancelled. Please apply again.",null,null));
		}

	if (s1 == LearningStatus.COMPLETED) 
			return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE ALLOTED","Your learning license has been issued successfully.The validity for learner's license is 6 months only. So, apply within the due date",null,null));


		if (s1 == LearningStatus.APPLIEDFORPERMANENT) {
			PermanentLicense pl = permanentService.findByUserId(id);
			PermanentStatus s2 = null;
			if (pl != null)
				s2 = pl.getPermanentStatus();

		if (s2 == PermanentStatus.BOOKED)
				return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE ALLOTED","Your learning license has been issued successfully.The validity for learner's license is 6 months only. So, apply within the due date",
						"PERMANENT LICENSE FORM SUBMITTED ","Your Permanent License Application Form is under Process, Confirmation regarding test will reach you within 48 hours."));

		if (s2 == PermanentStatus.DRIVINGSLOTISSUED)
				return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE ALLOTED","Your learning license has been issued successfully.The validity for learner's license is 6 months only. So, apply within the due date",
						"DRIVING TEST SLOT ISSUED ","You Have Been Alloted a schedule for Driving Test.Your schedule has been confirmed, Test Date : "
								+ pl.getAppointmentDate() + " Test Time : " + pl.getAppointmentTime() + "."));


			if (pl.getWrittenTestFlag().equalsIgnoreCase("Y")) {
				if (s2 == PermanentStatus.DRIVINGPASS)
					return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE ALLOTED","Your learning license has been issued successfully.The validity for learner's license is 6 months only. So, apply within the due date",
							"DRIVING TEST PASSED ","Congratulations, You have cleared the driving test, Mail regarding the issue of license will reach you soon."));
			} else {
			if (s2 == PermanentStatus.DRIVINGFAIL)
					return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE ALLOTED","Your learning license has been issued successfully.The validity for learner's license is 6 months only. So, apply within the due date",
							"DRIVING TEST FAILED ","Sorry, but you have failed in clearing the driving test, Please apply again."));
			}

			if (s2 == PermanentStatus.COMPLETED)
				return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE ALLOTED","Your learning license has been issued successfully.The validity for learner's license is 6 months only. So, apply within the due date",
						"DRIVING PERMANENT LICENSE ISSUED ","Your Permanent license has been issued successfully."));
	
		}
	
		return ResponseEntity.ok().body(new MessageDto("LEARNER LICENSE ALLOTED","Your learning license has been issued successfully.The validity for learner's license is 6 months only. So, apply within the due date","PERMANENT","Apply For Parmenent License First."));
	}
}

