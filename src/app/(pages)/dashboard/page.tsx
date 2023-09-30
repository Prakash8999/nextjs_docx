'use client'
import axios from 'axios'
import Navbar from 'components/Navbar'
import { useAuth } from 'context/authContext'


import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {HiOutlinePlus} from 'react-icons/hi'
const page = () => {
const [data, setData] =useState('')
const {setAccount}:any = useAuth()
useEffect(() => {
axios('api/userdetail',{
method:"GET"
}).then((res)=>{
console.log(res?.data);
setAccount(res?.data)
setData(res?.data)

}).catch((err)=>{
console.log(err);

})
}, [])
// setAccount(data)





  return (
	<>
	<div>

	<Navbar data={data}/>


	<div className='bg-slate-200 h-[50vh] mt-4 px-32 '>
		<p className='text-xl py-2'>Start New Document </p>
<div className='h-full w-full flex justify-between ' >
<Link href={'/dashboard/create'} className='h-[80%] w-1/5  bg-white flex justify-center items-center'>
<HiOutlinePlus className={'text-7xl  text-blue-600 text-center'}/>
</Link>
<div className='h-[80%] w-1/5 bg-white'>
wwww
</div>
<div className='h-[80%] w-1/5 bg-white'>
wwww
</div>
<div className='h-[80%] w-1/5 bg-white'>
wwww
</div>
</div>
	</div>



	
</div>



	
	
	</>
  )
}

export default page