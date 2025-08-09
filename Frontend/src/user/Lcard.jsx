import axios from 'axios'
import React, { useRef } from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../page/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $, { data } from 'jquery'
//import pic from '../images/team/team lead.jpg'
import './Lcard.css'
import SJ from '../images/SJ.jpg'
import ReactToPrint from 'react-to-print'
import { ComponentToPrint } from './ComponentToPrint';
//import reactToprint from react-to-print;
//import { useLocation } from 'react-router'

const Lcard =()=>{

 const [license, setLicense] = useState('')
 const isSignin = useSelector((state) => state.isSignin);
 const history = useHistory();
 const [status,setStatus]=useState('')
 const[image,setImage]=useState('')
 const[name,setName]=useState('')
 const[exDate,setExDate]=useState('')
 const componentRef = useRef();


//   if(isSignin.status === false){
//     alert('please signin first!!')
//     history.push('/user/login')
//   }

useEffect(() => {
    console.log(`All Learning License Details`)
    getLearning()
    getImage()
  }, [])


  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  

  const getLearning = () => {
    const id = isSignin.user.userId
      axios.get(url + '/license/learningg/'+id).then((response) => {
            const res = response.data
            if (res.status === 'OK'){
              
             // const fullName = isSignin.user.firstName+" "+isSignin.user.lastName
              const fullName = res.result.firstName+" "+res.result.lastName
          setName(fullName)
          console.log(license)

          var date = new Date(res.result.createdAt);
          var month = date.getMonth() + 7;
          var year = date.getFullYear();
          if((date.getMonth()+7)>12){
            month=  (date.getMonth()+7)% 12
            year=date.getFullYear()+1

          }
          var day = date.getDate();
          
          if (month < 10) {
            month = "0" + month;
          }
          if (day < 10) {
            day = "0" + day;
          }
        
        
          var maxdate = (year) + "-" + (month)
              + "-" + day;
        
                    setExDate(maxdate)

                    setLicense(res.result)

            }
              //console.log(res.result.firstName)
              //console.log(license.firstName)
        //     setFirstName(res.result.firstName)
        //   setLastName(res.result.lastName)
        //   setDob(res.result.dob)
        //   setAadharNo(res.result.aadharNo)
        //   setMobileNo(res.result.mobileNo)
        //   setLandmark(res.result.landmark)
          })
          
          
  }

  const getImage = () => {
    const id = isSignin.user.userId
      axios.get(url + '/user/getimage/'+id).then((response) => {
            const res = response.data
            if (res.status === 'OK')
              setImage(res.result)

          })
          
  }




return(
<div id='body'>

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

			  <li class="nav-item "><Link className="nav-link"  to={ { pathname: "/user/mocktest"}}>MockTest</Link></li> 

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

<br />
{/* <div style={{textAlign:'right', marginRight:'90pt', marginTop:'130pt'}}> */}
<div style={{alignContent:"center"}}>
<ReactToPrint 
                trigger={() => <a class="btn text-light bg-dark" role="button" href="#">Print Learning License</a>}
                content={() => componentRef.current}
            />
            {/* <ComponentToPrint ref={componentRef} /> */}
            </div>
            
              

{
license!=''?(
    <div className='container-fluid' ref={componentRef}>

<section id="div1" className='container-fluid' >
<img className='img5' src={SJ} style={{width:"70px",height:"110px", position:"relative",marginLeft:"0px",marginTop:"0px"}}></img><p id="p1">INDIAN UNION DRIVING LICENSE</p>
<p id="p5"><p id='p6'>MAHARASTRA STATE</p></p>

        
       <div id="div2">
           <p id="p2"><label id="label1">Name:</label> <label id="label2">{name}</label></p>
           <p id="p2" style={{marginTop:"0px"}}><label id="label1">City:</label> <label id="label2">{license.district}</label></p>
           <p id="p2"><label id="label1">D.O.B:</label> <label id="label2">{license.dob}</label></p>
           <p id="p2"><label id="label1">ID NO:</label> <label id="label2">{license.applicantId}</label></p>
           <p id="p2"><label id="label1">Expiry:</label> <label id="label2">{exDate}</label></p>
           <p id="p2"><label id="label1">Gender:</label> <label id="label2">{license.gender}</label></p>
           
      
       </div>
       {
image!=''?
(<img className='img5' src={'/Uimages/'+image} alt=""/>):(<div id='a1'><Link className="nav-link" to={ { pathname: "/user/addimage"}}>Upload Photo</Link></div>)
}
       <table id='table'>
           <tr><td className='td5' >Vehicle Class</td><td td className='td5'>LMV</td><td td className='td5'>MCWG</td><td td className='td5'></td><td td className='td5'></td></tr>
           <tr><td td className='td5'>Date Of Issue</td><td td className='td5'></td><td td className='td5'></td><td td className='td5'></td><td td className='td5'></td></tr>
       </table>
       
       {/* <h1>ABCD Tech Services Limited, Dhaka</h1>
       <h3 style={{marginLeft:"60px"}}>www.abcdtechbd.com,</h3>
       <h3>abcdtechbd@gmail.com</h3> */}

   
    

{/* {
    img=''?(

        ):''       
    } */}
		<hr />
</section>
<h5 id='h5' >LEARNING LICENCE VALID FOR 6 MONTHS</h5>
</div>
):''
}
<br />
<hr />

	<div className="container-fluid  pt-1 p-1 my-1 bg-dark text-white  ">
		<p
			style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>©Copyright-2024
			eRTO System</p>
	</div>
</div>
)
}

export default Lcard