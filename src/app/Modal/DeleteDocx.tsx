import axios from 'axios';
import Spinner from 'components/Spinner';
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';

const DeleteDocx = ( {data, setModal}:any) => {
	console.log(data);
	console.log(setModal);
	const [loading, setLoading] = useState(false)
	
	// console.log(data);
	// console.log(data.show);
	// const [showModal, setShowModal] = useState(data.show);

	// const closeModal =() =>{
	// 	setShowModal(false)
	// }
	const dele = () =>{
		setLoading(true)
		try {
			
		axios(`/api/docx/deletedocx/${data}`,{
			method:"DELETE"
		}).then((res)=>{
			console.log(res);
			toast.success("res?.data?.message",{
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
								})
								window.location.reload();
								setModal(false)
								setLoading(false)
		}).catch((err)=>{
			alert("Somethig went wrong")
			setLoading(false)
			console.log(err);
			
		})
		
		} catch (error) {

			console.log(error);
			
		}
		
		
		}
  return (
	<>
	
	<div className='h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center fixed top-0 left-0 z-[100]'>

<div className='h-[30vh] w-[30vw] bg-white rounded-lg'>
<div className='relative '>

<button type='button' className='absolute right-3 top-3' onClick={()=>{
	// setShowModal(false)
	setModal(false)
}}><AiOutlineClose className ={'text-red-500   text-xl'}/></button>

</div>


<div className='flex flex-col justify-center items-center h-full gap-y-5'>
<p>
	Do you want to delete this docx?
</p>
<div className=' flex w-full justify-center items-center gap-x-32'>

	<button onClick={dele} className='px-2 w-20 py-1.5 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold'>

{loading ? <Spinner className={''}/> : 'Delete'}
	</button>
	<button onClick={()=>{
	// setShowModal(false)
	setModal(false)
}} className='px-2 w-20 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold'>
Cancel
		
	</button>
</div>
</div>


</div>
</div>
<ToastContainer/>
	
	</>
  )
}

export default DeleteDocx