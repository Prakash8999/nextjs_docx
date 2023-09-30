import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
const AddCollaborators = ({setModal}:any) => {

	console.log(setModal);
	
  return (
	<>
	<div className='h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center fixed top-0 left-0 z-[100]'>

		<div className='h-[65vh] w-[50vh] bg-white rounded-lg'>
<div className='relative '>

<button type='button' className='absolute right-3 top-3' onClick={()=>{
	setModal({show:false})
}}><AiOutlineClose className ={'text-red-500   text-xl'}/></button>

</div>

		</div>
	</div>
	
	</>
  )
}

export default AddCollaborators