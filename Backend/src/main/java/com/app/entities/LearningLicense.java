package com.app.entities;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString(exclude = "user")
@Entity
@Table(name = "learning")
public class LearningLicense {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_id")
    @SequenceGenerator(name = "app_id", initialValue = 12300)
    private int applicantId;

    @Column(length = 20)
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 15, message = "Invalid name length")
    private String firstName;

    @Column(length = 20)
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 15, message = "Invalid name length")
    private String lastName;

    @Column(length = 50)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email Format")
    private String email;

    @Column(length = 20, name = "aadhar_no", unique = true)
    @NotBlank(message = "Aadhar_no is required")
    @Size(max = 12, message = "Invalid aadhar no length")
    private String aadharNo;

    @Column(length = 20, name = "mobile_no")
    @NotBlank(message = "Mobile_no is required")
    @Size(max = 20, message = "Invalid mobile no length")
    private String mobileNo;

    @Column(name = "dob")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Past
    private LocalDate dob;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "blood_group", length = 20)
    private String bloodGroup;

    @Column(name = "identification_mark", length = 50)
    @NotBlank(message = "Identification mark is required")
    @Size(min = 1, max = 50, message = "Invalid")
    private String identificationMark;

    @Column(length = 20)
    @NotBlank(message = "State is required")
    @Size(min = 1, max = 25, message = "Invalid State")
    private String state;

    @Column(length = 20)
    @NotBlank(message = "District is required")
    @Size(min = 1, max = 25, message = "Invalid district")
    private String district;

    @Column(length = 20)
    @NotBlank(message = "Village/Town is required")
    @Size(min = 1, max = 25, message = "Invalid village/town")
    private String village;

    @Column(length = 20)
    @NotBlank(message = "Landmark is required")
    @Size(min = 1, max = 25, message = "Invalid landmark")
    private String landmark;

    @Column(length = 20)
    @NotBlank(message = "Pincode is required")
    @Size(min = 1, max = 6, message = "Invalid Pincode")
    private String pincode;

    @Column(length = 50)
    @NotBlank(message = "Street is required")
    @Size(min = 1, max = 50, message = "Invalid Street")
    private String street;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "created_at")
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    @Column(name = "appointment_date")
    @DateTimeFormat(iso = ISO.DATE)
    private LocalDate appointmentDate;

    @Column(name = "appointment_time")
    @DateTimeFormat(iso = ISO.TIME)
    private LocalTime appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_status")
    private LearningStatus learningStatus = LearningStatus.BOOKED;

    @Column(name = "written_test_flag", length = 1)
    private String writtenTestFlag = "N";
}
