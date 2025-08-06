package com.app.pojos;

import javax.persistence.*;


@Entity
@Table(name = "images")
public class Images {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//@SequenceGenerator(name="id")
	private int id;
	
	@MapsId
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(name = "profile_picture")
	private String profilePhoto;
	
	

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	
	
	public Images( String profilePhoto) {
	
		this.profilePhoto = profilePhoto;
	}

	public Images() {
		
	}

	@Override
	public String toString() {
		return "Images [profilePhoto=" + profilePhoto + "]";
	}
	
	
	
	
}
