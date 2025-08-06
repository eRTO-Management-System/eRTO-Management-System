package com.app.service;

import com.app.pojos.Images;


public interface IImageService {

	public String saveImage(Images image);
	
	public Images findImage(Integer userId);
}
