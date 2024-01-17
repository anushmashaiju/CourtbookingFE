import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import {MDBCol,MDBCard,MDBCardBody, MDBInput, MDBCheckbox}from 'mdb-react-ui-kit';
import { BASE_URL } from '../Constants/Constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../Constants/plugins';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, setUserRole } from '../Toolkit/userSlice';
import { Button } from 'react-bootstrap';


function LoginBox({setBoxName}) {
   // const [logincred,setLoginCred]=useState({
   // userName:'',
   // password:''
   const [email,setEmail]=useState('')
   const[password,setPassword]=useState('')
   // const [userDetails,setUserDetails]=useState([])
   const navigate=useNavigate()
   const{userDetails,userRole}=useSelector((state)=>state.user)
   const dispatch=useDispatch()

   const handleSignUp=()=>{
    setBoxName('signup')
 
  }
const handleLogin =()=>{
  try {
   
    if (email&&password){
      axios.post(`${BASE_URL}/auth/login`,{email,password}).then((res)=>{
        if(res.data.message==="login successfull" && res.data.token){
          localStorage.setItem('token',res.data.token) 
          const parsedToken=parseJwt(res.data.token)
          console.log(parsedToken)
          localStorage.setItem('user',JSON.stringify(parsedToken))

          dispatch(setUserDetails(parsedToken))
          
          toastSuccess('login successfull')
          navigate('/home')
        }
        if(res.data.message==="invalid credentials"){
         toastError("invalid credentials")
          //alert("invalid credentials")
        }
      })
    }else{
      alert('credentials not filled')
    }
  }
  catch(error){

  }
}
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
const updateUserRole=()=>{
 dispatch(setUserRole(123))
}
return (
    <MDBCol md='6' className='position-relative'>
        
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
    
        <MDBCard className='my-5 bg-glass'>
          <MDBCardBody className='p-5'>
          <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <div className='d-flex justify-content-center mb-4'>
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember password' /> 
        </div>

        <Button className='w-100 mb-4' size='md'onClick={handleLogin}>login</Button>
        <div className="text-center">

<p>don't have an account?<span onClick={handleSignUp}> <i> Sign Up</i></span></p>
</div>

</MDBCardBody>
</MDBCard>
</MDBCol> 
  )   

  }
export default LoginBox




