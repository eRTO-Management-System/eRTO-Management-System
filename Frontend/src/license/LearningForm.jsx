
import axios from "axios";
import { useState, useEffect } from 'react'
import { url } from "../component/common/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import './learningForm.css'
import { Link } from "react-router-dom";
import { signinAction } from "../actions/signinActions";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const LearningForm =()=>{
    

	const isSignin = useSelector((state) => state.isSignin);
  const history = useHistory();
  const[image,setImage]=useState(undefined)

	if(isSignin.status === false){
		alert('please signin first!!')
		history.push('/user/login')
	  }


	  //const email = isSignin.user.email;
	  console.log("8.4675210430.1450.34053");
	  console.log(isSignin.user.email);








    var today = new Date();
    var date = today.getFullYear() + '-'
            + (today.getMonth() + 1) + '-'
            + today.getDate();
    var time = today.getHours() + ":"
            + today.getMinutes() + ":"
            + today.getSeconds();
    var date = date + ' ' + time;
	//  const[max,setMax]=useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [aadharNo, setAadharNo] = useState('')
	const [mobileNo, setMobileNo] = useState('')
	const [dob, setDob] = useState('')
	const [gender, setGender] = useState('')
	const [bloodGroup, setBloodGroup] = useState('')
	const [identificationMark, setIdentificationMark] = useState('')
	const [state, setState] = useState('')
	const [district, setDistrict] = useState('')
	const [village, setVillage] = useState('')
	const [landmark, setLandmark] = useState('')
	const [pincode, setPincode] = useState('')
	const [street, setStreet] = useState('')
	const [appointmentDate, setAppointmentDate] = useState('')
	const [appointmentTime, setAppointmentTime] = useState('')
	const [flag,setFlag]=useState(0)
	

	//for age verification
	var todayTime = new Date();
	var month = todayTime.getMonth() + 1;
	var day = todayTime.getDate();
	var year = todayTime.getFullYear();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}

	var maxdate = (year - 18) + "-" + month
			+ "-" + day;

	//for appointment date 
	var todayTime = new Date();
	var month = todayTime.getMonth() + 2;
	var day = todayTime.getDate();
	var year = todayTime.getFullYear();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}

	var mindate = (year) + "-" + (month)
			+ "-" + day;

			useEffect(()=>{
				verify()
			})

			const verify=()=>{
				
				axios.get(url + '/license/lverify/'+isSignin.user.userId).then((response) => {
					const res = response.data
					console.log(res)
					if (res==="User Already Registered for Learning"){
						//alert(res)
					//	toast(res)
						toast.info(res,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
						history.push("/user/status")
					}
					 
			
					})
			}
	
			useEffect(() => {
				const unloadCallback = (event) => {
				  event.preventDefault();
				  event.returnValue = "";
				  return "";
				};
				window.addEventListener("beforeunload", unloadCallback);
				return () => window.removeEventListener("beforeunload", unloadCallback);
			  }, []);


			  const SaveImage=()=>{
				console.log(isSignin.user.userId)
			  const email = isSignin.user.email
			  const data =new FormData()
			  data.append('profile',image)
			  data.append('email',email)
			  console.log(image)
			  console.log(email)
			  console.log(data)
			  axios.post(url + '/user/addimage',data).then((response) => {
				  const res = response.data
				  if (res.status === 'OK'){
					  if(res.message==='Success'){
						//  alert("Image Uploaded Succesfully")
						  toast.info("Image Uploaded Succesfully",{position:toast.POSITION.TOP_RIGHT,autoClose:false})
								setFlag(1);
					  }
		  
					  else
					  toast.info(res.message,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
					  //alert(res.message)
				  }
				   
		  
				  })
		  
			}

			const onFileSelect = (event) => {
				setImage(event.target.files[0])
			  }

	const license=()=>{

		let data ={
			firstName : firstName,
			lastName : lastName,
			email : isSignin.user.email,
			aadharNo : aadharNo,
			mobileNo : mobileNo,
			dob : dob,
			gender : gender,
			bloodGroup : bloodGroup,
			identificationMark : identificationMark,
			state : state,
			district : district,
			village : village,
			landmark : landmark,
			pincode : pincode,
			street : street,
			appointmentDate:appointmentDate,
			appointmentTime:appointmentTime
		};

		console.log(data);
		// send user info to the API
		axios.post(url + "/license/learning", data).then((response) => {
		  const result = response.data;
		  console.log("**********************");
		  console.log(result);
		  if (result === "Registered Successfully!!"){
			// dispatch(signinAction(result));
			//alert("Registered Successfully for learning license");
			toast.info("Registered Successfully for learning license",{position:toast.POSITION.TOP_RIGHT,autoClose:8000})
			//used to redirect to another component
			history.push('/user/status')
	}else{
		//alert(response.error)
		toast.info(response.error,{position:toast.POSITION.TOP_RIGHT,autoClose:false})
		
	}
});
	}


    return(
        <div >

<div className="container-fluid p-1 my-3 bg-success text-white">
		<h1 style={{textAlign:"center"}}>eRTO System</h1>
		<p style={{textAlign:"center"}}>Welcome to the eRTO System.The
			place where transparency is the main moto.</p>
	</div>



	<nav
		className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
		<ul className="navbar-nav mr-auto">
			<li className="nav-item"><Link className="nav-link" to={ { pathname: "/user/home"}}>Home</Link></li>

			<li className="nav-item dropdown"><a
				className="nav-link dropdown-toggle active" href="#" id="navbardrop"
				data-toggle="dropdown"> License </a>
				<div className="dropdown-menu">

						<Link className="dropdown-item"  to={ { pathname: "/license/learning"}}>Learning License</Link>
       <Link className="dropdown-item"  to={ { pathname: "/license/permanent"}}>Permanent License</Link>
				</div></li>

			 {/* <li class="nav-item "><a class="nav-link"
				href="<spring:url value='/user/mocktest'/>">Mock Test </a></li> */}

			<li className="nav-item "><Link className="nav-link" to={ { pathname: "/user/status"}}>Status </Link></li>

		</ul>

		<ul className="navbar-nav ml-auto">
			<li className="nav-item"><a className="nav-link"
				href="/user/logout">
					<button type="button" className="btn btn-info btn-sm">Log Out</button>
			</a></li>

		</ul>
	</nav>


	<hr />
	<div className="row">
		<div className="col"></div>

		<div className="col">
			<div className="card bg-light " style={{width:"600px", height:"1250px"}} >
				<div className="card-header" style={{textAlign:"center"}}>
					<h5>Apply For Learning License</h5>
				</div>
				<div className="card-body">

					<div className="was-validated"  >
						<div className="row">
							<div className="col">
								<div className="form-group">
									<label for="firstName">First Name</label> <input type="text"
										className="form-control" placeholder="Enter First name"
										id="firstName" name="firstName" pattern="[A-Za-z]{3,15}" required onChange={(event) => {
											setFirstName(event.target.value)
										  }}/>

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="lastname">Last Name</label> <input type="text"
										className="form-control" placeholder="Enter Last name"
										id="lastName" name="lastName" pattern="[A-Za-z]{3,15}" required onChange={(event) => {
											setLastName(event.target.value)
										  }} />

								</div>
							</div>
						</div>

						<div className="form-group">
							<label for="email">Email Id :</label> <input type="email"
								className="form-control" placeholder="Enter email" id="email"
								name="email" required value={isSignin.user.email} onChange={(event) => {
									setEmail(event.target.value)
								  }}/>


						</div>
						<div className="form-group">
							<label for="aadharNo">Aadhar No.</label> <input type="text"
								className="form-control" placeholder="Enter Aadhar No" id="aadharNo"
								name="aadharNo" pattern="[1-9]{1}[0-9]{11}" required onChange={(event) => {
									setAadharNo(event.target.value)
								  }} />
						</div>

						<div className="form-group">
							<label for="mobileNo">Mobile No.</label> <input type="text"
								className="form-control" placeholder="Eg. +918888888888"
								id="mobileNo" name="mobileNo" pattern="^[+]91(9|8|7)\d{9}$" required onChange={(event) => {
									setMobileNo(event.target.value)
								  }}/>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<label for="dob">Choose Birth Date</label> <input type="date"
										className="form-control" id="dob" name="dob" max={maxdate}
										onChange={(event) => {
											setDob(event.target.value)
										  }} required/><span></span>

									{/* <script type="text/javascript">
										var todayTime = new Date();
										var month = todayTime.getMonth() + 1;
										var day = todayTime.getDate();
										var year = todayTime.getFullYear();
										if (month < 10) {
											month = "0" + month;
										}
										if (day < 10) {
											day = "0" + day;
										}

										var maxdate = (year - 18) + "-" + month
												+ "-" + day;

										document.getElementById("dob")
												.setAttribute("max", maxdate);
									</script> */}


								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="gender" >Gender</label> <select class="form-control"
										id="gender" name="gender" required onChange={(event) => {
											setGender(event.target.value)
										  }}>
										<option value="">Choose...</option>
										<option value="MALE">MALE</option>
										<option value="FEMALE">FEMALE</option>
										<option value="PreferNotToSay">Prefer Not to Say</option>
										<option value="Other">Other</option>
									</select>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<label for="bloodGroup">Blood Group</label> <select
										className="form-control" id="bloodGroup" name="bloodGroup" required onChange={(event) => {
											setBloodGroup(event.target.value)
										  }}>
										<option value="">Choose...</option>
										<option value="A+">A+</option>
										<option value="A-">A-</option>
										<option value="B+">B+</option>
										<option value="B-">B-</option>
										<option value="O+">O+</option>
										<option value="O-">O-</option>
										<option value="AB+">AB+</option>
										<option value="AB-">AB-</option>
									</select>

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="identificationMark" >Identification Mark</label> <input
										type="text" class="form-control"
										placeholder="Identification Mark" id="identificationMark"
										name="identificationMark" pattern="[A-Za-z\s]{1,}" required onChange={(event) => {
											setIdentificationMark(event.target.value)
										  }} />

								</div>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<div className="form-group">
										<label for="state">State</label> <select class="form-control"
											id="state" name="state" required onChange={(event) => {
												setState(event.target.value)
											  }}>
											<option value="">Choose...</option>
											<option value="Maharashtra">Maharashtra</option>
											<option value="Uttar Pradesh" disabled>Uttar Pradesh</option>
											<option value="Uttar Pradesh" disabled>Madhya Pradesh</option>
											<option value="Uttar Pradesh" disabled>Goa</option>
											<option value="Gujarat" disabled>Gujarat</option>
											<option value="Rajasthan" disabled>Rajasthan</option>
											<option value="West Bengal" disabled>West Bengal</option>
											<option value="Tamil Naduh" disabled>Tamil Nadu</option>
											<option value="Telangana" disabled>Telangana</option>
										</select>
									</div>

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="district">District</label> <select
										className="form-control" id="district" name="district" required onChange={(event) => {
											setDistrict(event.target.value)
										  }}>
										<option value="">Choose...</option>
										<option value="Pune">Pune</option>
										<option value="Jalgaon">Jalgaon</option>
										<option value="Nagpur">Nagpur</option>
										<option value="Beed">Beed</option>
										<option value="Latur">Latur</option>
										<option value="Hingoli">Hingoli</option>
										<option value="Jalna">Jalna</option>
										<option value="Chandrapur">Chandrapur</option>
										<option value="Gadchiroli">Gadchiroli</option>
										<option value="Ahmednagar">Ahmednagar</option>
										<option value="Amravati">Amravati</option>
										<option value="Mumbai Suburban">Mumbai Suburban</option>
										<option value="Aurangabad">Aurangabad</option>
										<option value="Dhule">Dhule</option>
										
									</select>
								</div>
							</div>
						</div>


						<div className="row">
							<div className="col">
								<div className="form-group">
									<div className="form-group">

										<label for="pincode">PinCode</label> <input type="text"
											className="form-control" placeholder="Enter PinCode" id="pincode"
											name="pincode" pattern="[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}"
											maxlength="6" required onChange={(event) => {
												setPincode(event.target.value)
											  }} />

									</div>

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="village">Village/City</label> <input type="text"
										className="form-control" placeholder="Enter Village/City"
										id="village" name="village" pattern="[A-Za-z]{1,}" required onChange={(event) => {
											setVillage(event.target.value)
										  }}/>

								</div>
							</div>
						</div>



						<div className="row">
							<div className="col">
								<div className="form-group">
									<div className="form-group">

										<label for="landmark">Landmark</label> <input type="text"
											className="form-control" placeholder="Enter Landmark"
											id="landmark" name="landmark" required onChange={(event) => {
												setLandmark(event.target.value)
											  }} />

									</div>

								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<label for="street">Street</label> <input type="text"
										className="form-control" placeholder="Enter Street" id="street"
										name="street" required onChange={(event) => {
											setStreet(event.target.value)
										  }}/>

								</div>
							</div>
						</div>

						<div className="row">
							<div className="col">
								<div className="form-group">
									<div className="form-group">
										<label for="appointmentDate">Test Date:</label> <input
											type="date" name="appointmentDate" id="appointmentDate"
											className="form-control" min={mindate} required onChange={(event) => {
												setAppointmentDate(event.target.value)
											  }}/>
									</div>
								</div>
							</div>

							{/* <script type="text/javascript">
								var todayTime = new Date();
								var month = todayTime.getMonth() + 1;
								var day = todayTime.getDate();
								var year = todayTime.getFullYear();
								if (month < 10) {
									month = "0" + month;
								}
								if (day < 10) {
									day = "0" + day;
								}

								var todaydate = year + "-" + month + "-" + day;
								document.getElementById("appointmentDate")
										.setAttribute("min", todaydate);
							</script> */}


							<div className="col">
								<div className="form-group">
									<div className="form-group">
										<div className="form-group">
											<label for="appointmentTime">Test Time</label> <select
												className="form-control" id="appointmentTime"
												name="appointmentTime" required onChange={(event) => {
													setAppointmentTime(event.target.value)
												  }} >
												<option value="">Slot</option>

												<option value="11:00">11:00 AM</option>
												<option value="01:30">01:30 PM</option>
												<option value="03:30">03:30 PM</option>

											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label for="createdAt">Created At</label> <input type="text"
								className="form-control" id="createdAt" disabled value={date} />
							{/* <script>
								var today = new Date();
								var date = today.getFullYear() + '-'
										+ (today.getMonth() + 1) + '-'
										+ today.getDate();
								var time = today.getHours() + ":"
										+ today.getMinutes() + ":"
										+ today.getSeconds();
								var dateTime = date + ' ' + time;
								document.getElementById("createdAt").value = dateTime;
							</script> */}
						</div>

						<div className="form-group">
   {/* <h5 style="font-family:redressed,georgia,garamond,serif;"> */}
       <h5 style={{fontFamily:"redressed georgia garamond serif"}}> 
   <label for="passportImage">Upload Passport Size Photo:</label></h5>
    <input type="file" name="passportImage" className="form-control-file" id="passportImage" accept="image/png,image/jpeg" required="required"
          onChange={onFileSelect}/>
  </div>
  <button className="btn btn-outline-success" onClick={SaveImage} >Upload Image</button>
  <br />
 <br/>

					{	
						flag>0?(<button  className="btn btn-primary mx-auto d-block"
						value="Next" onClick={license}>Next</button>):(<p style={{fontFamily:"redressed georgia garamond serif"}}> 
						<label for="passportImage">Upload Photo First To Move Further</label></p>)
					}

						 <p style={{textAlign:"center"}}>
							<br /> Already Applied For Learning License ? <Link className="text-success"  to={ { pathname: "/license/permanent"}}>
								 Click Here to Apply for Permanent</Link>
						</p> 


					</div>

				</div>
			</div>
		</div>
		<div className="col"></div>

	</div>
	<hr />

	<div className="container-fluid  pt-1 p-1 my-1 bg-dark text-white  ">
		<p
			style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>©Copyright-2024
			eRTO System</p>
	</div>
	
        </div>
    )
}

export default LearningForm