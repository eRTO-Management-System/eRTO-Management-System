import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../page/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $, { data } from 'jquery'
import { useLocation } from 'react-router'

const Status=()=>{

    const isSignin = useSelector((state) => state.isSignin);
	const history = useHistory();
  
	//   if(isSignin.status === false){
	// 	  alert('please signin first!!')
	// 	  history.push('/user/login')
	// 	}

        const [msg1, setMsg1] = useState('')
        const [msg2, setMsg2] = useState('')
        const [msg3, setMsg3] = useState('')
        const [msg4, setMsg4] = useState('')
        const [msgs, setMsgs] = useState([])
		const[check,setCheck]=useState('')
		const check1 = "LEARNER LICENSE ALLOTED"
		const check2="DRIVING PERMANENT LICENSE ISSUED "

		useEffect(() => {
			console.log(`All Learning License Details`)
			//getStatus()
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
		const id = isSignin.user.userId

		  const getStatus = () => {
			  
			// axios.get(url + '/admin/learning/',{ params: { id:id  } }).then((response) => {
			//   const res = response.data
			//   if (res.status === 'OK') {
			// 	//setLicenses(res.result)
			// 	setLicense(res.result)
			//   } else {
			// 	alert('error while loading  License data')
			//   }
			// })
			const userId = isSignin.user.userId
           
			const role = isSignin.user.role
			  // send user info to the API
			  console.log(role)
			  console.log(userId)
	
	
			  axios.get(url + "/user/status/"+userId).then((response) => {
				const result = response.data;
				console.log("**********************");
				console.log(result);
				setMsgs(result)
				// console.log(result.m1.m1);
				// console.log(result.m2);
				// console.log(result.m3);
				// console.log(result.m4);
				setMsg1(result.m1)
				setMsg2(result.m2)
				setMsg3(result.m3)
				setMsg4(result.m4)
				// console.log(result.m1)
				// console.log(result.m3)
				// console.log(result.m1)
				// console.log(result.m4)
				if (result.m1==="Please apply for Learning License first!") {
				  
				  alert("Please apply for Learning License first!");
				  //used to redirect to another component
				  history.push('/user/home')
				  
				}
				if(result.m1==="LEARNER LICENSE ALLOTED")
				setCheck("LEARNER LICENSE ALLOTED")
				
			  });
		  }




return(
    <div>
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



<div className="container" align="center">
    <div className="card">
	<div className="card-header text-body" ><h5 className="text-body" style={{ fontFamily: "redressed georgia garamond serif" }}> Know Your Status</h5></div>
	<div className="card-body">
    <div className="row">
        <div className="col-md-12">
            <div className="error-template">
                
                <div id="accordion">
                
                    <div className="card">
                    <a className="card-link" data-toggle="collapse" href="#collapseLearning" onClick={getStatus}>
  					<div className="card-header text-body" >
  					<h5 className="text-body" style={{ fontFamily: "redressed georgia garamond serif" }}> Click Here To Know Your Learning License Status</h5>
  					</div></a>
  					
  					<div id="collapseLearning" className="collapse" data-parent="#accordion">
  					<div className="card-body"> 
                    {/* <h5 hidden="true">isSignin.user.email </h5> */}
                    <br/>
              
					<div className="alert alert-primary">
 					 <strong>{msg1} &nbsp; : &nbsp; </strong>{msg2} &nbsp; &nbsp;
					</div>
					
					{ msg1.match(check1) ?(
						<button className="btn btn-outline-success" ><Link className="nav-link" to={ { pathname: "/user/lcard"}}>DownLoad your Learning Licence</Link></button>
					):''

					}
					
			 
						
						{/* <div className="alert alert-primary">
 					 <strong>${writtenTestSlot2}&nbsp; : &nbsp; </strong>${writtenTestSlot3}&nbsp; &nbsp;
					</div>
					
					<div className="alert alert-primary">
 					 <strong>${writtenTestStatus2}&nbsp; : &nbsp; </strong>${writtenTestStatus3}&nbsp; &nbsp; 
					</div>
					
					<div className="alert alert-primary">
 					 <strong>${learningCompleted2}&nbsp; : &nbsp; </strong>${learningCompleted3}&nbsp; &nbsp; 
					</div> */}
             		   
                		</div>
                		</div>
                		</div>
                		
                		<br />
                		
                	<div className="card">
                    <a className="card-link" data-toggle="collapse" href="#collapsePermanent" onClick={getStatus}>
  					<div className="card-header text-body" >
  					<h5 className="text-body" style={{ fontFamily: "redressed georgia garamond serif" }}> Click Here To Know Your Permanent License Status</h5>
  					</div></a>
  					
  					<div id="collapsePermanent" className="collapse" data-parent="#accordion">
  					<div className="card-body"> 
                    <h5 hidden="true">isSignin.user.email </h5>
                    <br />
					{ msg3==null ?(<div className="alert alert-primary">
					 <strong>Not Applied for Permanent License </strong>
				   </div>):(
					<div className="alert alert-primary">
 					 <strong>{msg3} &nbsp; : &nbsp; </strong>{msg4} &nbsp; &nbsp;
					</div>
					 )
	   
					 }
					 
					 { (msg3!==null && msg3.match(check2))  ?
					(<button className="btn btn-outline-success" ><Link className="nav-link" to={ { pathname: "/user/pcard"}}>DownLoad your Permanent License</Link></button>)
							:''
					}
						
						{/* <div className="alert alert-primary">
 					 <strong>${drivingTestSlot1}&nbsp; : &nbsp; </strong>${drivingTestSlot2}&nbsp; &nbsp;
					</div>
					
					<div className="alert alert-primary">
 					 <strong>${drivingTestStatus1}&nbsp; : &nbsp; </strong>${drivingTestStatus2}&nbsp; &nbsp; 
					</div>
					
					<div className="alert alert-primary">
 					 <strong>${permanentCompleted1}&nbsp; : &nbsp; </strong>${permanentCompleted2}&nbsp; &nbsp; 
					</div> */}
             		   
                		</div>
                		</div>
                		</div>	
                		
                		
                		
                		
                		
                		
           </div>
							
            </div>
        </div>
    </div>
</div>
</div>
</div>
    
    </div>
);

}

export default Status