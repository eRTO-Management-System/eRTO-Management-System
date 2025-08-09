// import { useHistory } from "react-router-dom";
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from "axios";
// import { url } from "../common/constants";
// //import { useDispatch } from 'react-redux';
// // import { signinAction } from '../../actions/signinActions';
// import Swal from "sweetalert2";
// const Register = () => {

// const [firstName, setFirstName] = useState('')
// const [lastName, setLastName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     //const [role, setRole] = useState('')
//     const history = useHistory()
//     //const dispatch = useDispatch()
  
//     const RegisterUser = () => {
//       if (email.length === 0) {
//         alert('please enter email')
//       } else if (password.length === 0) {
//         alert('please enter password')
//       } else {
//         let data = {
//             firstName:firstName,
//             lastName:lastName,
//           email: email,
//           password: password,
//           role:"CITIZEN"
//         };
//         // send user info to the API
//         console.log("*******************************")
//         console.log(data)
//         axios.post(url + "/user/register", data).then((response) => {
//           const result = response.data;
//           if (result === "Registered Successfully!!") {

//             Swal.fire({
//                 // position: 'top-end',
//                 icon: 'success',
//                 title: "Registered Successfully!!",
//                 showConfirmButton: false,
//                 timer: 1500
//               })
//             //alert("Registered Successfully!!");
//             history.push("/user/login")
//             //used to redirect to another componen
//           } else if(result=== "Email already Registered!!!") {
//             // console.log(result.error);
//             Swal.fire('Email already Registered!!!')
//            // alert("Email already Registered!!!");
//           }
//           else {
//             // console.log(result.error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Failed to register',
//                 footer: '<a href="">Why do I have this issue?</a>'
//               })
//            // alert("Failed to register");
//           }
//         });
//       }
//     }


//     return (
//         <div className="container" >
//             <div className="container-fluid pt-3 p-1 my-3  bg-success text-white" id="container">
//                 <h1
//                     style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>eRTO
//                     System</h1>
//                 <p
//                     //   style="text-align: center; font-family: redressed, georgia, garamond, serif;">Welcome
//                     style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>Welcome
//                     to the eRTO System.The place where transparency is the main moto.</p>
//             </div>
//             <nav className="navbar navbar-expand-sm sticky-top bg-dark navbar-dark">
//                 <ul className="navbar-nav">
//                     <li className="nav-item active"><a className="nav-link "
//                         href='/'>Home</a></li>

//                     <li className="nav-item "><a className="nav-link" href="#faq">FAQ</a></li>
//                     <li className="nav-item "><a className="nav-link" href="#aboutus">About Us</a></li>
//                     <li className="nav-item"><a className="nav-link " href="#contactus">Contact
//                         Us</a></li>
//                 </ul>

//                 <ul className="navbar-nav ml-auto">
//                     <li className="nav-item"><a className="nav-link"
//                         href="/user/login"><button type="button" className="btn btn-outline-light my-2 my-sm-0" >Login</button>
//                         <Link className="nav-link" to={
//                             /* this object inside the  tag */
//                             {
//                                 pathname: '/users'
//                             }
//                         } >
//                         </Link>

//                     </a></li>
//                     <li className="nav-item"><a className="nav-link"
//                         href="/user/register">
//                         <button type="button" className="btn btn-outline-light my-2 my-sm-0">Register</button>
//                     </a></li>

//                 </ul>
//             </nav>
//             <hr />
//             <div className="row">
//                 <div className="col"></div>

//                 <div className="col">

//                     <div className="card " style={{width:"600px",height:"550px"}}>


//                         <div className="card-header text-body" style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}><h5>Register/SignUp</h5></div>

//                         <div class="card-body">

//                             <div className="was-validated"  >
//                                 <div className="row"> <div className="col"><div className="form-group text-body">
//                                     <label for="firstName">First Name</label>
//                                     <input type="text" className="form-control" placeholder="Enter First name" id="firstName" name="firstName" pattern="[A-Za-z]{3,10}" required  onChange={(event) => {
//                                         setFirstName(event.target.value)}} />

//                                 </div>
//                                 </div>
//                                     <div className="col">
//                                         <div className="form-group text-body">
//                                             <label for="lastName" >Last Name</label>
//                                             <input type="text" className="form-control" placeholder="Enter Last name" id="lastName" name="lastName" pattern="[A-Za-z]{3,10}" required  onChange={(event) => {
//                                         setLastName(event.target.value)}}/>

//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="form-group text-body">
//                                     <label for="email">Email Id :</label>
//                                     <input type="email" className="form-control" placeholder="Enter email" id="email" name="email" required  onChange={(event) => {
//                                         setEmail(event.target.value)}} />


//                                 </div>
//                                 <div className="form-group text-body">
//                                     <label for="password">Password:</label>
//                                     <input type="password" className="form-control" aria-describedby="passwordHelpBlock" placeholder="Enter password" id="password" name="password" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,20}" required 
//                                     onChange={(event) => {
//                                         setPassword(event.target.value)}} />
//                                         <small id="passwordHelpBlock" className="form-text text-body" >
//                                             Your password must be 8-20 characters long .Must contain 1 capital letter and 1 number.Must not contain spaces or emoticons.
//                                         </small>

//                                 </div>


//                                 <button   className="btn btn-primary mx-auto d-block " onClick={RegisterUser} value="Register">Register/SignUp</button>

//                                 <p className="text-body" style={{textAlign:"center"}}> <br /> Already Registered ? <a href="/user/login" className="text-primary" style={{textDecoration:"underline"}}>Click Here to Login</a></p>


//                             </div>

//                         </div>
//                     </div>

//                 </div>

//                 <div class="col"></div>
//             </div>



//         </div>



//     )
// }

// export default Register

import { useHistory } from "react-router-dom";
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { url } from "../common/constants";
//import { useDispatch } from 'react-redux';
// import { signinAction } from '../../actions/signinActions';
import Swal from "sweetalert2";
const Register = () => {

const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [role, setRole] = useState('')
    const history = useHistory()
    //const dispatch = useDispatch()
  
    const RegisterUser = () => {
      if (email.length === 0) {
        alert('please enter email')
      } else if (password.length === 0) {
        alert('please enter password')
      } else {
        let data = {
            firstName:firstName,
            lastName:lastName,
          email: email,
          password: password,
          role:"CITIZEN"
        };
        // send user info to the API
        console.log("*******************************")
        console.log(data)
        axios.post(url + "/user/register", data).then((response) => {
          const result = response.data;
          if (result === "Registered Successfully!!") {

            Swal.fire({
                // position: 'top-end',
                icon: 'success',
                title: "Registered Successfully!!",
                showConfirmButton: false,
                timer: 1500
              })
            //alert("Registered Successfully!!");
            history.push("/user/login")
            //used to redirect to another componen
          } else if(result=== "Email already Registered!!!") {
            // console.log(result.error);
            Swal.fire('Email already Registered!!!')
           // alert("Email already Registered!!!");
          }
          else {
            // console.log(result.error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to register',
                footer: '<a href="">Why do I have this issue?</a>'
              })
           // alert("Failed to register");
          }
        });
      }
    }


    return (
        <div className="container-fluid pt-3 p-1 my-3" >
            <div className="container-fluid pt-3 p-1 my-3  bg-success text-white" id="container">
                <h1
                    style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>eRTO
                    System</h1>
                <p
                    //   style="text-align: center; font-family: redressed, georgia, garamond, serif;">Welcome
                    style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>Welcome
                    to the eRTO System.The place where transparency is the main moto.</p>
            </div>
            <nav className="navbar navbar-expand-sm sticky-top bg-dark navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item active"><a className="nav-link "
                        href='/'>Home</a></li>

                    <li className="nav-item "><a className="nav-link" href="#faq">FAQ</a></li>
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
            <div className="row">
                <div className="col"></div>

                <div className="col">

                    <div className="card " style={{width:"800px",height:"550px"}}>


                        <div className="card-header text-body" style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}><h5>Register/SignUp</h5></div>

                        <div class="card-body">

                            <div className="was-validated"  >
                                <div className="row"> <div className="col"><div className="form-group text-body">
                                    <label for="firstName">First Name</label>
                                    <input type="text" className="form-control" placeholder="Enter First name" id="firstName" name="firstName" pattern="[A-Za-z]{3,10}" required  onChange={(event) => {
                                        setFirstName(event.target.value)}} />

                                </div>
                                </div>
                                    <div className="col">
                                        <div className="form-group text-body">
                                            <label for="lastName" >Last Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Last name" id="lastName" name="lastName" pattern="[A-Za-z]{3,10}" required  onChange={(event) => {
                                        setLastName(event.target.value)}}/>

                                        </div>
                                    </div>
                                </div>

                                <div className="form-group text-body">
                                    <label for="email">Email Id :</label>
                                    <input type="email" className="form-control" placeholder="Enter email" id="email" name="email" required  onChange={(event) => {
                                        setEmail(event.target.value)}} />


                                </div>
                                <div className="form-group text-body">
                                    <label for="password">Password:</label>
                                    <input type="password" className="form-control" aria-describedby="passwordHelpBlock" placeholder="Enter password" id="password" name="password" pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,20}" required 
                                    onChange={(event) => {
                                        setPassword(event.target.value)}} />
                                        <small id="passwordHelpBlock" className="form-text text-body" >
                                            Your password must be 8-20 characters long .Must contain 1 capital letter and 1 number.Must not contain spaces or emoticons.
                                        </small>

                                </div>


                                <button   className="btn btn-primary mx-auto d-block " onClick={RegisterUser} value="Register">Register/SignUp</button>

                                <p className="text-body" style={{textAlign:"center"}}> <br /> Already Registered ? <a href="/user/login" className="text-primary" style={{textDecoration:"underline"}}>Click Here to Login</a></p>


                            </div>

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

export default Register