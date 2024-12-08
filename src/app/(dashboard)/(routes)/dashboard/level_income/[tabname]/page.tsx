import Tabs from '@/app/components/tabs/Tabs';
import { getUserId } from '@/app/utils/getUserId';
import React from 'react'

const page = () => {




  const user_id = getUserId();







  return (
    <div>

      {


        user_id && <Tabs user_id={user_id} />
      }


<div  className='h-16'>


</div>

    </div>
  )
}

export default page

