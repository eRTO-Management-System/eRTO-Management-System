import axios from "axios";
import { useState, useEffect } from 'react'
//import { url } from "../common/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './page.css';
import uicon from '../images/usericon.png'


const Page = () =>{


  const isSignin = useSelector((state) => state.isSignin);
	const history = useHistory();
  
	  if(isSignin.status === false){
		  alert('please signin first!!')
		  history.push('/user/login')
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




    return(
        <div className="container">
<div className ="container-fluid pt-3 p-1 my-3  bg-success text-white">
<h1 style={{textAlign:"center"}}>eRTO System</h1>
<p style={{textAlign:"center"}}>Welcome to the eRTO System.The place where transparency is the main moto.</p>
</div>



<nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
  <ul className="navbar-nav mr-auto">
    
        
    <li className="nav-item">
    <Link className="nav-link active"  to={ { pathname: "/user/home"}}>Home</Link>
      {/* <a className="nav-link active" href="/user/page">Home </a> */}
    </li>
    
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
        License
      </a>
      <div className="dropdown-menu">
       <Link className="dropdown-item"  to={ { pathname: "/license/learning"}}>Learning License</Link>
       <Link className="dropdown-item"  to={ { pathname: "/license/permanent"}}>Permanent License</Link>
      </div>
    </li>
    
    <li className="nav-item ">
      <Link className="nav-link"  to={ { pathname: "/user/mocktest"}}>Mock Test </Link>
    </li>

	<li className="nav-item ">
	<Link className="nav-link" to={ { pathname: "/user/status"}}>Status </Link>
	</li>
    
	</ul>


  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
     <b style={{color:"ActiveBorder",textAlign:"right",fontFamily:""}}>Welcome {isSignin.user.firstName}</b>
      
    </li>
    
  </ul>

   <ul className="navbar-nav ml-auto">
    
    <li className="nav-item">
      <a className="nav-link"  href="/user/logout" > <button type="button" class="btn btn-info btn-sm">Log Out</button></a>
    </li>
    
  </ul>
</nav>


<div className="container LL bg-dark text-white">
	<h1>Learning License</h1>
	<hr />
	<div className="row">
       <div className="col-md-6">
       	<h4>Need for a Driving License</h4>
       	<p>No person shall drive a motor vehicle in any public place unless he holds an effective driving license issued to him by the licensing authority , authosrising him to drive the vehicle.</p>
		<br />
		<h4>Licensing Authorities</h4>
		<p>The joint commisioner/deputy commisioner and the regional transport officers are the licensing authorities. The administrative officers and motor vehicle inspectors are the additional licensing authorities.</p>
	   </div>

       <div className="col-md-6">
       	<h4>Age limit to obtain Driving License</h4>
         <p>-An applicant who has completed sixteen years of age is eligible to apply for a driving license to drive a motor cycle with engine capacity below 55 cc subject to the condition that the parent or guardian should furnish a declaration in the manner prescribed.</p>
		 <p>-The applicant who has completed the age of eighteen years of age is eligible to apply for a driving license to drive a motor vehicle other than a transport vehicle.</p>
		 <p>-An applicant who has completed twenty years of age will be eligible for applying for a license to drive a transport vehicle.</p>
       </div>
    </div>
</div>


<div className="container DL bg-dark text-white">
	<h1>Permanent License</h1>
	<hr />
	<div className="row">
       <div className="col-md-6">
       	<p>The faculty of online slot booking for test of completence of driving license has been provided. Please visit the website for scheduling an appointment.</p>
		<br />
		<h4>Procedure:</h4>
		<p>-Schedule an appointment for the test of competence online by visiting the website or any RTO office where such facility exists. In other cases schedule an appointment directly at the office concerned.</p>
		<p>-An application in Form 4, for a permanent driving license shall be made along with the learner's license obtained for such class of vehicle.</p>
		<p>-The applicant who has held a valid Learner's license, for a period of at least 30 days, shall be competent to appear for the test of competence.</p>
	 </div>

       <div className="col-md-6">
         <p>-The test of competence will be conducted by the competent authority.</p>
		 <p>-The applicant should bring a vehicle of the type to which the application relates.</p>
		 <p>-The application should satisfy the officer conducting the test regarding his capability to drive the vehicle and his ability to perform the tasks specified in Rule-15(2) of the CMVR.</p>
		 <p>-The candidate who passes the test of competence successfully will be issued with a driving license and sent through speed post to the address furnished.</p>
		 <p>-Fees as prescribed along with user charges.</p>
       </div>
    </div>
</div>


<hr />

	<div class ="container-fluid  pt-2 p-1 my-1 bg-dark text-white footer ">
<p style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>©Copyright-2025 eRTO System<br /></p>
</div>

        </div>
    )
}

export default Page;