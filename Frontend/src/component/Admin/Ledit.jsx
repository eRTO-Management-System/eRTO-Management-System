import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../common/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $, { data } from 'jquery'
import { useLocation } from 'react-router'
import Swal from 'sweetalert2'

const Ledit =()=>{
 // maintain the state
 //const [licenses, setLicenses] = useState([])
 const [license, setLicense] = useState('')
 const isSignin = useSelector((state) => state.isSignin);
 const history = useHistory();
 const [status,setStatus]=useState('')


 const location = useLocation()
  const licensedata = location.state.license
  //console.log(licensedata)
  // get the history object

//   if(isSignin.status === false){
//     alert('please signin first!!')
//     history.push('/user/login')
//   }

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

  
const applicantId =licensedata.applicantId
console.log(applicantId)
  const getLearning = () => {
      
    axios.get(url + '/admin/learning/',{ params: { id: applicantId } }).then((response) => {
      const res = response.data
      if (res.status === 'OK') {
        //setLicenses(res.result)
        setLicense(res.result)
      } else {
		Swal.fire({
		//	position: 'top-end',
			icon: 'error',
			title: 'error while loading  License data',
			showConfirmButton: false,
			timer: 1500
		  })
       // alert('error while loading  License data')
      }
    })
  }



  const changeStatus=()=>{
      const change={
        "applicantId":applicantId,
        "learningStatus":status
      };
      console.log(change)
    axios.post(url + '/admin/ledit',change).then((response) => {
        const res = response.data
        if (res.status === 'OK') {
          //setLicenses(res.result)
          setLicense(res.result)
          console.log(res.result)
		  Swal.fire({
		//	position: 'top-end',
			icon: 'success',
			title: 'Your work has been saved',
			showConfirmButton: false,
			timer: 1500
		  })
          history.push('/ladmin')
        } else {
			Swal.fire({
			//	position: 'top-end',
				icon: 'error',
				title: 'error while updating license status',
				showConfirmButton: false,
				timer: 1500
			  })
         // alert('error while updating license status')
        }
      })
  }


return(
<div>
<div className ="container-fluid p-3 my-3 bg-success text-white">
<h2 style={{textAlign:"center"}}>eRTO System</h2>
<p style={{textAlign:"center"}}>Welcome to the eRTO System.The place where transparency is the main moto.</p>
</div>
{

// licenses.length >=1 ?licenses.map(license =>{
    license!=''?(
<div className="row">
  <div className="col"></div>
  
  <div className="col">
  <div className="card bg-light " style={{width:"600px",height:"1350px"}}>
    <div className="card-header" style={{textAlign:"center"}}><h5>Learning License</h5></div>
    <div className="card-body">
	   
		 <table className="table table-hover">
		 <tbody>
		   
			<tr>
				<td>First Name</td>
				<td><input value={license.firstName} className="form-control" disabled="true"/></td>
				
			</tr>
			
			<tr>
				<td>Last Name</td>
				<td><input value={license.lastName} className="form-control" disabled="true"/></td>
				
			</tr>

			<tr>
				<td>User Email</td>
				<td><input value={license.email} className="form-control" disabled="true"/></td>
				
				
			</tr>

			<tr>
				<td>Aadhar No</td>
				<td><input value={license.aadharNo}  className="form-control" disabled="true"/></td>
				
				
			</tr>

			<tr>
				<td>Mobile No</td>
				<td><input value={license.mobileNo} className="form-control" disabled="true"/></td>
				
				
			</tr>
			<tr>
				<td>Birth Date</td>
				<td><input type="date" value={license.dob} className="form-control" disabled="true"/></td>
				
			</tr>

			<tr>
				<td> Gender</td>
				<td><input  value={license.gender} className="form-control" disabled="true"/></td>
				
				
			</tr>

			<tr>
				<td>Blood Group</td>
				<td><input  value={license.bloodGroup} className="form-control" disabled="true"/></td>
				
			</tr>

			<tr>
				<td>Identification Mark</td>
				<td><input  value={license.identificationMark} className="form-control" disabled="true"/></td>
				
				
			</tr>

			<tr>
				<td>State</td>
				<td><input  value={license.state} className="form-control" disabled="true"/></td>
				
				
			</tr>

			<tr>
				<td>District</td>
				<td><input  value={license.district} className="form-control" disabled="true"/></td>
				
			</tr>
			<tr>
				<td>Pin code</td>
				<td><input  value={license.pincode} className="form-control" disabled="true"/></td>
				
			</tr>

			<tr>
				<td>Village</td>
				<td><input  value={license.village} className="form-control" disabled="true"/></td>
				
			</tr>

			<tr>
				<td>Landmark</td>
				<td><input  value={license.landmark} className="form-control" disabled="true"/></td>
			
			</tr>

			<tr>
				<td>Street</td>
				<td><input  value={license.street} className="form-control" disabled="true"/></td>
				
			</tr>
			<tr>
				<td>Created At</td>
				<td><input  value={license.createdAt} className="form-control" disabled="true"/></td>
				
			</tr>
			
			
			
			<tr>
				<td>Driving Test Date:</td>
				<td><input type="date"  value={license.appointmentDate} className="form-control" disabled="true"/></td>
			</tr>

			<tr>
				<td>Driving Test Time</td>
				<td><input type="time"   value={license.appointmentTime} className="form-control" disabled="true"/></td>
			</tr>

			<tr>
				<td>AppomintmentStatus:</td>
				{/* <td><select  value={license.learningStatus} className="form-control" onChange={(e)=>{setStatus(e.target.value)}}> */}
				<td><select defaultValue={license.learningStatus} className="form-control" onChange={(e)=>{setStatus(e.target.value)}}>
                {/* <option  defaultValue={license.learningStatus} label="BOOKED"/> */}
                {/* <option>{license.learningStatus}</option> */}
				 <option value="BOOKED" label="BOOKED"/>
				 <option value="WRITTENSLOTISSUED" label="WRITTENSLOTISSUED"/>  
               
                 <option value="WRITTENTESTPASSED" label="WRITTENTESTPASSED"/>  
                 <option value="WRITTENTESTFAILED" label="WRITTENTESTFAILED"/> 
                 {/* <!-- <option value="APPLIEDFORPERMANENT" label="APPLIEDFORPERMANENT"/> --> */}
                 <option value="COMPLETED" label="COMPLETED"/>
                 <option value="REJECTED" label="REJECTED"/>
                 </select>  
               </td>
				{/* <td><errors path="learningStatus" value={license.dob} /></td> */}
			</tr>
			
				
			
			<tr>
			<td></td>
				<td><input  value="Save" className="btn btn-primary "onClick={changeStatus}/></td>
			<td></td>
			</tr>
		</tbody>
		</table>
		
	</div>
		</div>
		</div>

    
		<div className="col"></div>
		</div>
        ):''
        // }):''
             
    }
		<hr />


</div>
    
)
}

export default Ledit