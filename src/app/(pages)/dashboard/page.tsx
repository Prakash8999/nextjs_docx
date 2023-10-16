'use client'
import axios from 'axios'
import Navbar from 'components/Navbar'
import { useAuth } from 'context/authContext'
import format from 'date-fns/format'
import { MdDeleteForever } from 'react-icons/md'

import Link from 'next/link'
import { type } from 'os'
import React, { useState, useEffect } from 'react'
import { BsDot } from 'react-icons/bs'
import { HiOutlinePlus } from 'react-icons/hi'
import DeleteDocx from 'app/Modal/DeleteDocx'
import Spinner from 'components/Spinner'
const page = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(true)
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	type docxType = {
		content: string,
		title: string,
		createdAt: string,
		id: string
	}
	const [data, setData] = useState('')
	const [docxData, setDocxData] = useState<(docxType)[]>([])
	const [modal, setModal] = useState({ show: false, Dedata: {} })
	const { setAccount }: any = useAuth()
	useEffect(() => {
		axios('/api/userdetail', {
			method: "GET"
		}).then((res) => {
			// console.log(res?.data);
			setAccount(res?.data)
			setData(res?.data)

		}).catch((err) => {
			console.log(err);

		})
	}, [])
	// setAccount(data)

	useEffect(() => {
		setLoading(true)
		axios('/api/docx/viewdocx', {
			method: "GET"
		}).then((res) => {
			console.log(res?.data?.userDocx);
			setDocxData(res?.data?.userDocx)
			setLoading(false)
		}).catch((err: any) => {
			console.log(err);
			setLoading(false)
		})
	}, [])


	const dele = (id: any) => {
		try {

			axios(`/api/docx/deletedocx/${id}`, {
				method: "DELETE"
			}).then((res) => {
				console.log(res);

			}).catch(() => {
				console.log(id);

			})

		} catch (error) {
			console.log(error);

		}


	}


	return (
		<>
			{
				modal.show && <DeleteDocx data={modal.show && modal.Dedata} setModal={setModal} />
			}
			<div className='bg-gray-200 overflow-y-hidden h-[100vh] w-full sticky'>


				<Navbar data={data} />
				<div className=' bg-slate-100 w-full h-full  mt-2  flex gap-y-14 '>

					<div className='w-1/3 flex flex-col gap-y-12 items-center'>

						<p className='text-xl py-2'>Start New Document </p>

						<Link href={'/dashboard/create'} className=' w-[60%] h-[60%] shadow-xl bg-white flex justify-center items-center rounded-lg '>
							<HiOutlinePlus className={'text-7xl  text-blue-600  text-center'} />
						</Link>


					</div>

					<div className='w-2/3 border-l border-black bg-white pb-10' style={{ overflowY: 'scroll' }}>




						{/* <div className='flex flex-col pl-4 overflow-x-auto   w-[45vw]'>

<p className='pt-2'>Recent</p>
  {docxData.map((value, index) => (
	    <div key={index} className=' px-4 py-2 gap-x-3 flex items-center    w-[100%]' >

<BsDot className = {'font-semibold text-2xl'}/>
			<div className='flex gap-x-12  items-center w-full justify-between'>


      <div className=' w-full'><p className='underline underline-offset-4 text-xl'>
	  {value?.title}</p>
	  <div>
		
	  </div>
	  </div>
	  
	  <div className='flex items-center w-full gap-x-5'>
      <div className='	font-light '>{format(new Date(value?.createdAt), 'MMMM dd, yyyy h:mm:ss')}</div>
	 


	  <button
  type="button"
  onClick={() => {
    setModal({ show: true, Dedata: value.id });
  }}
>
  <MdDeleteForever className="text-xl text-red-500" />
</button>
	  {/* <button onClick={()=>{
dele(value?.id)		
	  }}>

	  <MdDeleteForever className= {'text-xl text-red-500'}/>
	  </button> */}
						{/* </div>
			</div>
			 */}

						{/* </div> */}
						{/* ))} */}
						{/* </div>  */}

						<p className='text-2xl  p-4 sticky'>Recent:-</p>

						{


							!loading ?




								<div className='grid grid-cols-2   w-[80%] gap-6 p-5  m-auto'>

									{
										docxData?.map((value, index) => {
											return (
												<div key={index} className='border border-black  rounded-xl px-3 p-3 bg-amber-300'  >

{/*  */}
													<div className='flex justify-between'>
<Link href={`/dashboard/update/${value?.id}`}>

														<h1 className='font-semibold text-xl'> {"value?.title"}</h1>

														<p className='text-sm'>{format(new Date(value?.createdAt), 'MMMM dd, yyyy h:mm')}</p>
</Link>
														<div className='relative'>


															<button
																className="flex items-center justify-center   rounded-full  focus:outline-none"
																onClick={toggleMenu}
															>
																<svg
																	className={`w-6 h-6 text-gray-600 ${isOpen ? "" : ""}`}
																	viewBox="0 0 24 24"
																>
																	<circle cx="12" cy="6.5" r="1.5" />
																	<circle cx="12" cy="12" r="1.5" />
																	<circle cx="12" cy="17.5" r="1.5" />
																</svg>
															</button>

															<div className={`${isOpen ? 'block absolute' : 'hidden'} `}>

																<button onClick={() => {
																	setModal({ show: true, Dedata: value?.id })
																}}>
																	Delete

																</button>
															</div>
														</div>

													</div>


													


												</div>
											)

										})
									}




								</div>
								: <div className='flex flex-col justify-center items-center gap-y-10 h-[90%]'>
									<p className='text-3xl'>Loading Data....</p>

									<Spinner className={'h-28 w-28'} />
								</div>}




					</div>









				</div>




			</div>





		</>
	)
}

export default page