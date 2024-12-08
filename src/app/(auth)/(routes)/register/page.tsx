import Register from "@/app/components/auth/RegisterForm"
import { Suspense } from "react"

const page = () => {

  return (
    <div>
   
   <Suspense fallback={<></>}>

<Register/>

</Suspense>
    </div>
  )
}

export default page