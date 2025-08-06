package com.app.serviceimpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.Images;
import com.app.pojos.User;
import com.app.repository.ImagesRepository;
import com.app.repository.UserRepository;
import com.app.service.IImageService;

@Service
@org.springframework.transaction.annotation.Transactional
public class ImageServiceImpl implements IImageService {

	@Autowired
	private ImagesRepository imgRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public String saveImage(Images image) {
		try {
			imgRepo.save(image);
			return "Success";
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return "Faild to upload image";
		}
	}

	@Override
	public Images findImage(Integer userId) {
		
		User user = userRepo.findById(userId).get();
		return imgRepo.findByUserId(user);
	}

}
