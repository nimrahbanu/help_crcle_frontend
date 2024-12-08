import SupportTicketForm from '@/app/components/support/support'
import { getUserId } from '@/app/utils/getUserId'
import React from 'react'

const page = () => {

  const user_id = getUserId()

  console.log("Fovggkgkf user_id  ", user_id)

  return (
    <div className=' mx-2'>
      <SupportTicketForm user_id={user_id} />


      <div  className='h-16'>

      </div>

    </div>
  )
}

export default page