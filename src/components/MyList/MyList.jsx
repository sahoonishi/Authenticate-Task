import React from 'react'
import { useNavigate } from 'react-router-dom'

const MyList = () => {
  const navigate = useNavigate();
  return (
    <div className='font-semibold'>
      <button onClick={()=>navigate('/watchlistpage')} >MyLists</button>
    </div>
  )
}

export default MyList