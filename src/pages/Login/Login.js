import React, { useState } from 'react'
import './Login.scss'

import { axiosClient } from '../../Utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../Utils/LocalStorageManager';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()



    const handleSubmit = async (e)=>{
        e.preventDefault();


         try {
            
            const result = await axiosClient.post('/auth/login', {
                email,
                 password
            })
            console.log(result);
            setItem(KEY_ACCESS_TOKEN, result.result.accessToken)
            navigate('/')
            
         } catch (err) {
            console.log(err);
            
         }
    }


  return (
    <div className='login'>
        <div className='login-box'>
            <h2 className=' heading'>Login</h2>

            {/* /// form// */}
            <form onSubmit={handleSubmit}>

                    {/* {for email} */}

                    <label htmlFor='email'> Email </label>
                    <input 
                     type='email'
                     className='email'
                     id='email'
                     placeholder='Enter Email'
                     onChange={(e)=>{
                        setEmail(e.target.value)
                     }}
                    />

                    {/* for password */}

                    <label  htmlFor='password'>Password</label>

                    <input 
                    type='password'
                    className='password'
                    id='password'
                    placeholder='Enter Password'
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    
                    />

                    {/* to submit */}

                    <input type='submit' className=' submit'/>

            </form>

            <p className='subheading'>
                Do not have account? <Link to='/signup'>Signup</Link>

            </p>

        </div>
      
    </div>
  )
}

export default Login
