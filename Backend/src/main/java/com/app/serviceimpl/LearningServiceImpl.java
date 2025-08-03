package com.app.serviceimpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.LearningLicense;
import com.app.entities.User;
import com.app.repository.LearningRepository;
import com.app.repository.UserRepository;
import com.app.service.IEmailSenderService;
import com.app.service.ILearningService;

@Service
@Transactional
public class LearningServiceImpl implements ILearningService {

    @Autowired
    private LearningRepository learningRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private IEmailSenderService emailSenderService;

    @Override
    public String applyForLearning(LearningLicense ll) throws MailException, InterruptedException {
        if (learningRepo.save(ll) != null) {
            emailSenderService.sendSimpleEmail(
                ll.getEmail(),
                "Dear " + ll.getFirstName() + " " + ll.getLastName() + ",\n\n"
                + "Congratulations! You have successfully filled the Learning license application form.\n\n"
                + "Your Applicant ID is : " + ll.getApplicantId() + "\n"
                + "Login to the system using Registered email ID and Password.\n\n"
                + "You can check your application status from the E-RTO Portal.\n"
                + "Mail Regarding test schedule will reach you within 48 hours.\n"
                + "Wish you the Best of Luck for the test process.\n"
                + "\nIn case you have any query, you can connect with us at ertomanagementmarchdac2022@gmail.com\n"
                + "\nWarm Regards,\n" + "eRTO Group,\n" + "SSBT Jalgaon Services",
                "eRTO Learning License Application"
            );
            System.out.println("applied for learning");
            return "Registered Successfully!!";
        }

        emailSenderService.sendSimpleEmail(ll.getEmail(), "Failed!! Try Again!!", "eRTO Learning License Application");
        return "Registration Failed!!";
    }

    @Override
    public LearningLicense registerForLearning(LearningLicense ll, Integer userId) throws InterruptedException {
        Optional<User> user = userRepo.findById(userId);
        ll.setUser(user.get());
        applyForLearning(ll);
        return ll;
    }

    @Override
    public Optional<LearningLicense> findById(Integer applicantId) {
        return learningRepo.findById(applicantId);
    }

    @Override
    public LearningLicense findByUserId(Integer userId) {
        User user = userRepo.findById(userId).get();
        return learningRepo.findByUserId(user);
    }

    @Override
    public LearningLicense findByUserEmail(String email) {
        User user = userRepo.findByEmail(email);
        return learningRepo.findByUserId(user);
    }

    @Override
    public void deleteLearningLicenseById(Integer applicantId) {
        learningRepo.deleteById(applicantId);
    }

    @Override
    public boolean updateLicense(LearningLicense ll) {
        try {
            learningRepo.save(ll);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    
//    @Override
//    public ArrayList<LearningLicense> getTomorrowApplicants() {
//        LocalDate tomorrow = LocalDate.now().plusDays(1);
//        return learningRepo.findAllApplicants(tomorrow);
//    }

    
    @Override
    public ArrayList<LearningLicense> getTomorrowApplicants() {
        LocalDate tomorrow = LocalDate.now().plusDays(1); // ✅ Correct use of LocalDate
        return new ArrayList<>(learningRepo.findAllApplicants(tomorrow));
    }

    @Override
    public void saveUpdatedLL(LearningLicense ll) {
        learningRepo.save(ll); // simple save (same as update)
    }

  
    @Override
    public ArrayList<LearningLicense> getApplicantsByDate(LocalDate date) {
        return learningRepo.findAllApplicants(date);
    }

    
    
    
}
