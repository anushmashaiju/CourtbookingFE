import React,{useState} from 'react'
import axios from 'axios'
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput,  MDBRadio}from 'mdb-react-ui-kit';
import { BASE_URL } from '../Constants/Constants';
import { Button } from 'react-bootstrap';



function SignUpBox({setBoxName}) {
  const handleLogin=()=>{
    setBoxName('login')
  }

  const[signUpData,setSignUpData]=useState({
    fName:'',
    lName:'',
    birthday:'',
    email:'',
    phone:'',
    password:'',
    confirmpassword:'',
  })
const handleRegister =()=>{
  try{
    axios.post(`${BASE_URL}/auth/signup`,signUpData).then((res)=>{
    if(res.data.message==="signup successful"){
      setBoxName('login')
    }
    if(res.data.message==="email already exist"){
      alert('email already exist')
    }
  })
  } catch(error){
//console.log (error);
  }
  }

  return (
    <MDBCol md='6' className='position-relative'>
    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
   <MDBCard className='my-5 bg-glass'>
      <MDBCardBody className='p-3'>
      <h3 className="fw-bold mb-2 pb-0 pb-md-0 mb-md-2">Sign Up</h3>
      <MDBRow>
         <MDBCol md='6'>
             <MDBInput wrapperClass='mb-2' label='First Name' size='lg' id='form1' type='text'value={signUpData.fName} onChange={(e)=>{setSignUpData({...signUpData,fName:e.target.value})}}/>
          </MDBCol>

          <MDBCol md='6'>
             <MDBInput wrapperClass='mb-2' label='Last Name' size='lg' id='form2' type='text' value={signUpData.lName} onChange={(e)=>{setSignUpData({...signUpData,lName:e.target.value})}}/>
         </MDBCol>
     </MDBRow>

         <MDBRow>
           <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Birthday' size='lg' id='form3' type='date'value={signUpData.birthday} onChange={(e)=>{setSignUpData({...signUpData,birthday:e.target.value})}}/>
              </MDBCol>
             <MDBCol md='6' className='mb-4'>
                <h6 className="fw-bold">Gender: </h6>
               <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Female' inline />
               <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Male' inline />
             <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='Other' inline />
               </MDBCol>
           </MDBRow>

            <MDBRow>
              <MDBCol md='6'>
               <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form4' type='email'value={signUpData.email} onChange={(e)=>{setSignUpData({...signUpData,email:e.target.value})}}/>
              </MDBCol>
              <MDBCol md='6'>
               <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='form5' type='number'value={signUpData.phone} onChange={(e)=>{setSignUpData({...signUpData,phone:e.target.value})}}/>
            </MDBCol>
               <MDBCol md='6'>
             <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form5' type='rel'value={signUpData.password} onChange={(e)=>{setSignUpData({...signUpData,password:e.target.value})}}/>
              </MDBCol>
              <MDBCol md='6'>
                 <MDBInput wrapperClass='mb-4' label='Confirm password' size='lg' id='form5' type='rel'value={signUpData.confirmpassword} onChange={(e)=>{setSignUpData({...signUpData,confirmpassword:e.target.value})}}/>
             </MDBCol>
          </MDBRow>

        <Button className='w-100 mb-4 ' size='md' onClick ={handleRegister}>Sign Up</Button>
        <div className='text-center'>
            <p><span onClick={handleLogin}> <i>go to Login</i></span></p>
             </div>
      </MDBCardBody>
    </MDBCard>
    </MDBCol> 
    
  )
}

export default SignUpBox
