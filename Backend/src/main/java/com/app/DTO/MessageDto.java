package com.app.dto;

import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor
public class MessageDto {

	
	private String m1;
	private String m2;
	private String m3;
	private String m4;
	

public MessageDto(String a,String b,String c,String d) {
	this.m1=a;
	this.m2=b;
	this.m3=c;
	this.m4=d;
	
}
}
