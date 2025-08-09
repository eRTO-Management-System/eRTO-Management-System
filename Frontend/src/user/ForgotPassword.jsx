import { useState } from 'react'
import axios from "axios";
import { url } from "../common/constants";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

const ForgotPassword= () => {
    //to maintain the state use useState hook
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
  
    const findPassword = () => {
      
      if (email.length === 0) {
        alert('please enter email')
      } else {
        console.log("**********************");
        let data = {
          email: email,
        };
        console.log(data.email);
        // send user info to the API
        axios.post(url + "/user/forgot", data).then((response) => {
          const result = response.data;
          console.log("**********************");
          console.log(result);
         // console.log("User email fron server")
          //console.log(result.result.email);
         
          //console.log(response)
          if(result.status==="OK"){
        //  alert("Password has been sent to your email please check")
          Swal.fire('Password has been sent to your email please check')
            history.push('/user/login')
            
          } 
         else if(result.status==="BAD_REQUEST"){
        //  alert('please varify your email address If it is not registered please register first')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'please varify your email address If it is not registered please register first',
           // footer: '<a href="">Why do I have this issue?</a>'
          })
          }
          else {
           
          }
      
        });
      }
     
    }
  
    return (
    
  
        <div className="">
        <div className ="container-fluid pt-3 p-1 my-3  bg-success text-white">
        
        <h1 style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>eRTO System</h1>
        <p style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>Welcome to the eRTO System.The place where transparency is the main moto.</p>
        </div>
        
        
        <nav className="navbar navbar-expand-sm sticky-top bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link "  href='/'>Home</a>
            </li>
            <li className="nav-item  "><a className="nav-link" href="#faq">FAQ</a></li>
                            <li className="nav-item "><a className="nav-link" href="#aboutus">About Us</a></li>
                            <li className="nav-item"><a className="nav-link " href="#contactus">Contact
                                Us</a></li>
            </ul>
            <ul className="navbar-nav ml-auto">
					<li className="nav-item"><a className="nav-link"
						href="/user/login"><button type="button" className="btn btn-outline-light my-2 my-sm-0" >Login</button>
							 <Link className="nav-link" to={
                  /* this object inside the  tag */
                   {     
                   pathname: '/users'
                   }
                 } >
                  </Link>
						
					</a></li>
					<li className="nav-item"><a className="nav-link"
						href="/user/register">
						<button type="button" className="btn btn-outline-light my-2 my-sm-0">Register</button>
					</a></li>

				</ul>
           
        </nav>
        
        
        <hr />
          
            
            
            <div className="row" style={{marginTop:"2%" , marginBottom:'2%'}}>
          <div className="col"></div>
          
          <div className="col">
        
          <div className="card bg-light" style={{width:"500px",height:"300px"}}>
          
         
            <div className="card-header text-body" style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}><h4>Forgot Password</h4></div>
           
            <div className="card-body" >
            
            
            <div className='was-validated'>
          <div className="form-group">
            <label for="email">Email Id :</label>
            <input type="email" class="form-control" placeholder="Enter email" id="email" name="email" required onChange={(event) => {//able to type something in textbox : event get generated
                     setEmail(event.target.value)
                   }}/>
          </div>
          </div>
          
          <button  className="btn btn-primary mx-auto d-block"  value="Login" onClick={findPassword}>Submit</button>
          
          <p class="text-body" style={{textAlign:"center"}}> <br />Not Registered ? <a href='/user/register' class="text-primary" style={{textDecoration:"underline"}}>Create an account</a></p>
        
        
            </div>
            </div>
            </div>
            
        
            
            <div className="col"></div>
        </div>
        <div className="container-fluid  pt-1 p-1 my-1 bg-dark text-white  ">
		<p
			style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>©Copyright-2024
			eRTO System</p>
	</div>
        </div>
    )
  }
  
  export default ForgotPassword