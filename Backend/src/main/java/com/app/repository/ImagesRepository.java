package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Images;
import com.app.pojos.User;

public interface ImagesRepository extends JpaRepository<Images, Integer> {

	@Query("SELECT i FROM Images i where i.user = :a")
	public Images findByUserId(@Param(value = "a") User user);
}
