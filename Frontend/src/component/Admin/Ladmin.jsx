import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../common/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $ from 'jquery'
import Swal from 'sweetalert2'

const Ladmin = () => {
  // maintain the state
  const [licenses, setLicenses] = useState([])
  const isSignin = useSelector((state) => state.isSignin);
  const history = useHistory();

//   if(isSignin.status === false){
//     alert('please signin first!!')
//     history.push('/user/login')
//   }


  // do something automatically
  // []:
  // - accepts a variable and keeps watching the change
  // - when the variable state changes, the function (1st param) gets called
  // - keep the second param empty to execute something when the component gets loaded
  useEffect(() => {
    console.log(`All Learning License Details`)
    getLearning()
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


$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


  

  const getLearning = () => {
    axios.get(url + '/admin/llist').then((response) => {
      const res = response.data
      if (res.status === 'OK') {
        setLicenses(res.result)
      } else {
        alert('error while loading list of Licenses')
      }
    })
  }



  const deletelicense =(license)=>{
       console.log(license.applicantId)
       Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
  
          axios.delete(url + '/admin/ldelete/'+license.applicantId).then((response) => {         
            const res = response.data
            if(res.status === 'OK'){
               alert("sucessfully deleted")
               getLearning()
          }else{
            Swal.fire({
              icon: 'error',

              title: 'Oops...',
              text: 'Something went wrong!',
              text: 'Error Deleting License',
              //       })
              //     }
              //   })
              // }
            })
          
            }
          })
        }
      })//-------------
      //  axios.delete(url + '/admin/ldelete/'+license.applicantId).then((response) => {         
      //     const res = response.data
      //     if(res.status === 'OK'){
      //        alert("sucessfully deleted")
      //        getLearning()
      //     }else{
      //        alert("error while deleting Licenses")
      //     }

      //  })
       
  }

  return (
    <div>
        <div className="container-fluid pt-3 p-1 my-3  bg-success text-white">

<h1
    style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>eRTO
    System</h1>
<p
    style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>Welcome
    to the eRTO System.The place where transparency is the main
    moto.</p>
</div>

<ul className="nav nav-tabs">
    
<li className="nav-item"> <Link className="nav-link active"  to={ { pathname: "/ladmin"}}>Learning License List </Link></li>
 <li className="nav-item text-dark"><Link className="nav-link text-dark"  to={ { pathname: "/padmin"}}>Permanent License List </Link>
</li>
</ul>
<nav className="navbar navbar-expand-sm">
<ul className="navbar-nav ml-auto">
    <li className="nav-item "><a className="nav-link"
        href="/"><button type="button"
                className="btn btn-outline-dark my-2 my-sm-0">Log Out</button></a></li>
</ul> 
</nav>
<div className="container-fluid">
               <input type="text" className="form-control" placeholder='Searching.....' id="myInput" />

<hr />
    {/* <h1 className="page-title">All Learning License Applicant</h1> */}

      

<div className="container-fluid">
		<h2 className="bg-light" style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>Learning License List</h2>
		<table className="table table-bordered table-hover table-secondary">
			<thead className="thead-dark">
          <tr>
            <th>applicantId</th>
            <th>firstName</th>
            {/* <th>lastName</th> */}
            <th>email</th>
            <th>aadharNo</th>
            <th>mobileNo</th>
            {/* <th>dob</th> */}
            {/* <th>gender</th> */}
            {/* <th>bloodGroup</th> */}
            {/* <th>identificationMark</th> */}
            {/* <th>state</th> */}
            <th>district</th>
            {/* <th>village</th> */}
            {/* <th>landmark</th> */}
            {/* <th>pincode</th> */}
            {/* <th>street</th> */}
            {/* <th>createdAt</th> */}
            {/* <th>appointmentDate</th> */}
            {/* <th>appointmentTime</th> */}
            <th>learningStatus</th>
            {/* <th>writtenTestFlag</th> */}
            <th>Action</th>

          </tr>
        </thead>
        <tbody id="myTable">
         
          {
             licenses.length >=1 ?licenses.map(license =>{

              return <tr key={license.applicantId}>
                     <td>{license.applicantId}</td>
                     <td>{license.firstName}</td>
                     {/* <td>{license.lastName}</td> */}
                     <td>{license.email}</td>
                     <td>{license.aadharNo}</td>
                     <td>{license.mobileNo}</td>
                     {/* <td>{license.dob}</td> */}
                     {/* <td>{license.gender}</td> */}
                     {/* <td>{license.bloodGroup}</td> */}
                     {/* <td>{license.identificationMark}</td> */}
                     {/* <td>{license.state}</td> */}
                     <td>{license.district}</td>
                     {/* <td>{license.village}</td> */}
                     {/* <td>{license.landmark}</td> */}
                     {/* <td>{license.pincode}</td> */}
                     {/* <td>{license.street}</td> */}
                     {/* <td>{license.createdAt}</td> */}
                     {/* <td>{license.appointmentDate}</td> */}
                     {/* <td>{license.appointmentTime}</td> */}
                     <td>{license.learningStatus}</td>
                     {/* <td>{license.writtenTestFlag}</td> */}
                     <td>
                         <a type="button" className="btn btn-success" 
                             onClick = {()=>{
                                 history.push('/ledit', {license:license})
                                }}>
                                Update
                          </a>&nbsp;
                          <a type="button" className="btn btn-danger" 
                                 onClick = {()=>{
                                           deletelicense(license)
                                           }}>
                                            Delete
                                </a>
                      </td>
                      </tr>
                     }):''
             
          }
       </tbody>
		</table>
	</div>
</div>

{/* <script>
$(document).ready(function(){kushal kolte age 19
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
</script> */}
<div className="container-fluid  pt-1 p-1 my-1 bg-dark text-white  ">
		<p
    
			style={{ textAlign: "center", fontFamily: "redressed georgia garamond serif" }}>©Copyright-2024
			eRTO System</p>
	</div>
</div>
  )
}

export default Ladmin
