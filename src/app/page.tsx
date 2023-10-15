'use client'
import Lottie from 'lottie-react'
import animation_lndg5gzn from '../assets/animation_lndg5gzn.json'
import create from '../assets/create.json'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'
import { FaDochub } from 'react-icons/fa'
export default function Home() {
  return (
    <>
    <div className='h-screen w-screen overflow-y-hidden   bg-gray-200'> 

<FaDochub className = {'text-blue-600 text-5xl mt-3 ml-5'}/>


  
    <div className='h-full justify-center w-full flex items-center'>

    


    {/* <Lottie animationData={animation_lndg5gzn} className='w-2/3 h-[70%]  '/> */}
    <div className='relative flex flex-col gap-y-5 items-center justify-center w-1/4  shadow-2xl rounded-lg h-[60vh] '>
<div className='absolute text-center top-4'>

    <TypeAnimation sequence={[
      "Hi user!",
    1000,
    "Welcome to SuperDocx!",
    1000,
    
    
    
  ]}
  wrapper="span"
  speed={50}
  repeat={Infinity}
  color='white' 
  
  className='text-2xl text-black font-semibold'
  />

  </div>

<Link href={'/auth/signup'} className='w-36 text-center py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl rounded-md '>
Signup 


</Link>
<Link href={'/auth/login'} className='w-36 text-center py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl rounded-md '>
Login 


</Link>
</div>
    </div>



    </div>
    
    
    </>
  )
}
