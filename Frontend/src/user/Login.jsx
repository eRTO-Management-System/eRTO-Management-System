// //import './Login.css'
// import { useState } from 'react'
// import axios from "axios";
// import { url } from "../common/constants";
// import { useHistory } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { signinAction } from '../../actions/signinActions';
// import Swal from "sweetalert2";

// const Login= () => {
//   //to maintain the state use useState hook
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const history = useHistory()
//   const dispatch = useDispatch()

//   const LoginUser = () => {
    
//     if (email.length === 0) {
//       alert('please enter email')
//     } else if (password.length === 0) {
//       alert('please enter password')
//     } else {
//       console.log("**********************");
//       let data = {
//         email: email,
//         password: password
//       };
//       console.log(data.email);
//       // send user info to the API
//       axios.post(url + "/user/login", data).then((response) => {
//         const result = response.data;
//         console.log("**********************");
//         console.log(result);
//        // console.log("User email fron server")
//         //console.log(result.result.email);
       
//         //console.log(response)
//         if(result.status==="OK"){
//         //if (result.result.email === email) {
//           dispatch(signinAction(result.result));

//           //alert("successfully logged in!!");
//           //used to redirect to another component
//           const role = result.result.role
//           if(role==='ADMIN'){
//             Swal.fire({
//               // position: 'top-end',
//               icon: 'success',
//               title: 'Login As '+email+' Succesfully',
//               showConfirmButton: false,
//               timer: 1500
//             })
//           history.push('/ladmin')
//           }else{
//           Swal.fire({
//             // position: 'top-end',
//             icon: 'success',
//             title: 'Login As '+email+' Succesfully',
//             showConfirmButton: false,
//             timer: 1500
//           })
//           history.push('/user/home')
//           }
          
//         } 
//        else if(result.status==="BAD_REQUEST"){
//         console.log(result.error);  //Akki
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Something went wrong!',
//           text: 'Email or Password Incorrect!',
//          // footer: '<a href="/admin/signin">Why do I have this issue?</a>'
//         })
//         }
//         else {
//           // console.log(result.error);
//           //alert("failed to login..plz try again!!");
//         console.log(result.error);  //Akki
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Something went wrong!',
//             text: 'Email or Password Incorrect!',
//            // footer: '<a href="/admin/signin">Why do I have this issue?</a>'
//           })
//         }
//      // }
//       // else
//       // {
//       //   console.log(result.error);  //Akki
//       //     Swal.fire({
//       //       icon: 'error',
//       //       title: 'Oops...',
//       //       text: 'Something went wrong!',
//       //       text: 'Email or Password Incorrect!',
//       //      // footer: '<a href="/admin/signin">Why do I have this issue?</a>'
//       //     })
//       // }
//       });
//     }
   
//   }

//   return (
  

//     <div className="container">
// <div className ="container-fluid pt-3 p-1 my-3  bg-success text-white">

// <h1 style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>eRTO System</h1>
// <p style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>Welcome to the eRTO System.The place where transparency is the main moto.</p>
// </div>


// <nav className="navbar navbar-expand-sm sticky-top bg-dark navbar-dark">
//   <ul className="navbar-nav">
//     <li className="nav-item ">
//       <a className="nav-link "  href='/'>Home</a>
//     </li>
//     <li className="nav-item  "><a className="nav-link" href="#faq">FAQ</a></li>
// 					<li className="nav-item "><a className="nav-link" href="#aboutus">About Us</a></li>
// 					<li className="nav-item"><a className="nav-link " href="#contactus">Contact
// 						Us</a></li>
//     </ul>
   
//    {/* <ul className="navbar-nav ml-auto">
//     <li className="nav-item">
//       <a className="nav-link"  href='/user/login'><button type="button" class="btn btn-outline-light my-2 my-sm-0">Login</button></a>
//     </li>
    
//   </ul> */}
// </nav>


// <hr />
// 	{/* <h6 align="center" class="text-success">${requestScope.message}</h6> */}
	
	
// 	<div className="row">
//   <div className="col"></div>
  
//   <div className="col">

//   <div className="card bg-light" style={{width:"500px",height:"400px"}}>
  
 
//     <div className="card-header text-body" style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}><h4>Login</h4></div>
   
//     <div className="card-body" >
    
	
	
//   <div className="form-group">
//     <label for="email">Email Id :</label>
//     <input type="email" class="form-control" placeholder="Enter email" id="email" name="email" required onChange={(event) => {//able to type something in textbox : event get generated
//              setEmail(event.target.value)
//            }}/>
//   </div>
//   <div className="form-group">
//     <label for="password">Password:</label>
//     <input type="password" class="form-control" placeholder="Enter password" id="password" name="password" required  onChange={(event) => {
//              setPassword(event.target.value)
//            }} />
//   </div>
  
//   <button  className="btn btn-primary mx-auto d-block"  value="Login" onClick={LoginUser}>Login</button>
  
//   <p class="text-body" style={{textAlign:"center"}}> <br /><a href='/user/forgot' class="text-primary" style={{textDecoration:"underline"}}>Forgot Password</a> Not Registered ? <a href='/user/register' class="text-primary" style={{textDecoration:"underline"}}>Create an account</a></p>


// 	</div>
// 	</div>
// 	</div>
	

	
// 	<div class="col"></div>
// </div>
// </div>
//   )
// }

// export default Login

//import './Login.css'
import { useState } from 'react'
import axios from "axios";
import { url } from "../common/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signinAction } from '../../actions/signinActions';
import Swal from "sweetalert2";

const Login= () => {
  //to maintain the state use useState hook
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()

  const LoginUser = () => {
    
    if (email.length === 0) {
      alert('please enter email')
    } else if (password.length === 0) {
      alert('please enter password')
    } else {
      console.log("**********************");
      let data = {
        email: email,
        password: password
      };
      console.log(data.email);
      // send user info to the API
      axios.post(url + "/user/login", data).then((response) => {
        const result = response.data;
        console.log("**********************");
        console.log(result);
       // console.log("User email fron server")
        //console.log(result.result.email);
       
        //console.log(response)
        if(result.status==="OK"){
        //if (result.result.email === email) {
          dispatch(signinAction(result.result));

          //alert("successfully logged in!!");
          //used to redirect to another component
          const role = result.result.role
          if(role==='ADMIN'){
            Swal.fire({
              // position: 'top-end',
              icon: 'success',
              title: 'Login As '+email+' Succesfully',
              showConfirmButton: false,
              timer: 1500
            })
          history.push('/ladmin')
          }else{
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'Login As '+email+' Succesfully',
            showConfirmButton: false,
            timer: 1500
          })
          history.push('/user/home')
          }
          
        } 
       else if(result.status==="BAD_REQUEST"){
        console.log(result.error);  //Akki
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          text: 'Email or Password Incorrect!',
         // footer: '<a href="/admin/signin">Why do I have this issue?</a>'
        })
        }
        else {
          // console.log(result.error);
          //alert("failed to login..plz try again!!");
        console.log(result.error);  //Akki
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            text: 'Email or Password Incorrect!',
           // footer: '<a href="/admin/signin">Why do I have this issue?</a>'
          })
        }
     // }
      // else
      // {
      //   console.log(result.error);  //Akki
      //     Swal.fire({
      //       icon: 'error',
      //       title: 'Oops...',
      //       text: 'Something went wrong!',
      //       text: 'Email or Password Incorrect!',
      //      // footer: '<a href="/admin/signin">Why do I have this issue?</a>'
      //     })
      // }
      });
    }
   
  }

  return (
  

    <div className="container-fluid pt-3 p-1 my-3">
<div className ="container-fluid pt-3 p-1 my-3 bg-success text-white">

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
   
   {/* <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <a className="nav-link"  href='/user/login'><button type="button" class="btn btn-outline-light my-2 my-sm-0">Login</button></a>
    </li>
    
  </ul> */}
</nav>


<hr />
	{/* <h6 align="center" class="text-success">${requestScope.message}</h6> */}
	
	
	<div className="row">
  <div className="col"></div>
  
  <div className="col">

  <div className="card bg-light" style={{width:"650px",height:"450px"}}>
  
 
    <div className="card-header text-body" style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}><h4>Login</h4></div>
   
    <div className="card-body" >
    
	
	
  <div className="form-group">
    <label for="email">Email Id :</label>
    <input type="email" class="form-control" placeholder="Enter email" id="email" name="email" required onChange={(event) => {//able to type something in textbox : event get generated
             setEmail(event.target.value)
           }}/>
  </div>
  <div className="form-group">
    <label for="password">Password:</label>
    <input type="password" class="form-control" placeholder="Enter password" id="password" name="password" required  onChange={(event) => {
             setPassword(event.target.value)
           }} />
  </div>
  
  <button  className="btn btn-primary mx-auto d-block"  value="Login" onClick={LoginUser}>Login</button>
  
  <p class="text-body" style={{textAlign:"center"}}> <br /><a href='/user/forgot' class="text-primary" style={{textDecoration:"underline"}}>Forgot Password</a> Not Registered ? <a href='/user/register' class="text-primary" style={{textDecoration:"underline"}}>Create an account</a></p>


	</div>
	</div>
	</div>
	

	
	<div class="col"></div>
</div>
<div className="container-fluid  pt-4 p-4 my-1 bg-dark text-white  ">
		<p
			style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>©Copyright-2025
			eRTO System</p>
	</div>
</div>
  )
}

export default Login
