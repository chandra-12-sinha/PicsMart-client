import React from 'react'
import './Navbar.scss'
import { useNavigate } from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import { useSelector } from 'react-redux'
import { CiLogout } from 'react-icons/ci';

function Navbar() {
const navigate = useNavigate()
const myProfile = useSelector(state => state.appConfigReducer.myProfile)

const handleLogout = ()=>{

}

  return (
    <div className='Navbar'>
        <div className="container">
            <h2 className='banner hover-link' onClick={()=> navigate('/')}> PicsMart</h2>
            <div className="right-side">
                <div className='profile hover-link' onClick={()=> navigate(`/profile/${myProfile?._id}`)}>
                    <Avatar src={myProfile?.avatar?.url}/>

                </div>

                <div className="logout hover-link" onClick={handleLogout}>
                <CiLogout />
                <p className='logout-texy'>logout</p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
