'use client'
import Link from 'next/link'
import React,{useEffect, useState} from 'react'
import { FaDochub } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'


const Navbar = (data:any, className:any) => {
	// console.log(data)
	// console.log(data?.profile);
	
	const [loading, setLoading] = useState(false)
// 	useEffect(() => {
	  
// if(!data){
// 	setLoading(true)
// }

// else{
// 	setLoading(false)
// }

// 	}, [data])
	
  return (
	<>
	
	<nav className={`mt-2 px-5  w-full  ${className}`}>
<div className='flex justify-between  items-center'>

		<div className='flex'>
			<Link href={'/dashboard'}>
<FaDochub className={'text-blue-600 text-4xl '}/>
			</Link>

<div className=' flex items-center gap-x-3 ml-3'>

{/* <TypeAnimation
sequence={[
	`Hello! ${data?.data ? data?.data?.user?.name : 'User'} `,
	1000,

	
	
	
]}
// repeat={Infinity}

/> */}
<Link href={'/dashboard/profile'}>Profile </Link>
<Link href={'/dashboard/mydocx'}> Docx</Link>


</div>
		</div>
		
		<div className='w-[50vw]'>

							<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
							<div className="relative  h-10 ">
								<div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
									</svg>
								</div>
								<input type="search" id="default-search" className=" block w-full h-10 pl-10 pr-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-black dark:text-white outline-none" placeholder="Search Docx" required />
								{/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
							</div>

		</div>



		<Link href={'/dashboard/profile'}
			 className='border px-2 h-10 rounded-md border-black	flex items-center gap-x-2'>
		 
		 <img src={data?.data?.user?.profile} alt="P"  className='w-8 h-8 rounded-full'/>
		 	<p>
			{
				`${data?.data}` ? `${data?.data?.user?.name}` :'loading...'
			}	
			</p>
		</Link>
</div>
	</nav>
	</>
  )
}

export default Navbar