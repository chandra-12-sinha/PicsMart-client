import React from 'react'
import { getItem, KEY_ACCESS_TOKEN } from '../Utils/LocalStorageManager'
import { Navigate, Outlet } from 'react-router-dom'

const Isloggedin = () => {
    const user = getItem(KEY_ACCESS_TOKEN)
  return (
    <div>
      {user ? <Navigate to='/' /> : <Outlet/>}
    </div>
  )
}

export default Isloggedin
