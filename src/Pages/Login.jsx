import { useState } from 'react';
import React from 'react'
import { MDBContainer,MDBRow, MDBCol}
from 'mdb-react-ui-kit';
import './Css/Login.css';
import SignUpBox from '../Components/SignUpBox';
import LoginBox from '../Components/LoginBox';

const Login=()=> {
  const [boxName,setBoxName]=useState('login')

 /* const handleLogin=()=>{
    setBoxName('login')
const handleSignUp=()=>{
  setBoxName('signup')
}*/

  return (
    <div className='p-4 background-radial-gradient   login-page'style={{minHeight:'100vh'}} >
<MDBContainer fluid className='p-4 background-radial-gradient min-vh-100'>
      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(139, 50%, 18%, 1)'}}>
            The best offer <br />
            <span style={{color: 'hsl(139, 50%, 44%, 0.89)'}}>for your business</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(139, 50%, 84%, 0.89)'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        {boxName==='login' && <LoginBox setBoxName={setBoxName}/>}
       {boxName==='signup' && <SignUpBox setBoxName={setBoxName}/>}

      
        </MDBRow>
    
       
    </MDBContainer>
    </div>
  )
  }


export default Login
