import React, { useEffect } from 'react'
import { getAttendece } from '../services/apiAttendance'

const Attendance = () => {

  useEffect(() => {
    getAttendece().then(data => console.log(data))
  }, [])


  return (
    <div>
      Attendance

      <img src="https://cnijnmiqlomynvbikeaa.supabase.co/storage/v1/object/public/projects-images/pro.png" alt="example" />

      
    </div>
  )
}

export default Attendance