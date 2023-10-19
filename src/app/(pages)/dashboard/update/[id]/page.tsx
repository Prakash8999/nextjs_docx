// 'use client'
// import axios from 'axios'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// const page = () => {
//   const {id} =useParams()
// console.log(id);
// type docxType = {
//   content: string,
//   title: string,
//   createdAt: string,
//   id: string
// }
// const [data, setData] = useState<(docxType) > () 
//   useEffect(() => {
// axios(`/api/docx/viewdocx/${id}`, {
//   method:"GET"
// }).then((res)=>{
// console.log(res?.data?.viewOne);
// setData(res?.data?.viewOne)
// })
//   }, [])

//   return (
// 	<div>page</div>
//   )
// }

// export default page

'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FaDochub } from 'react-icons/fa'
import { FiPrinter } from 'react-icons/fi'
import { io, Socket } from "socket.io-client";
import Spinner from "components/Spinner";
import AddCollaborators from "app/Modal/AddCollaborators";
import { useAuth } from "context/authContext";
import { BsSearch, BsShare } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSend } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
// import {io}


const modules = {

  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["clean"],
    ["link", "image", "video", "background", "code-block",],
    ["direction", "align"],
  ],
};

const formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'header', 'blockquote', 'code-block',
  'indent', 'list',
  'direction', 'align',
  'link', 'image', 'video', 'formula',
]
const update = () => {

  type docxType = {
    content: string,
    title: string,
    createdAt: string,
    id: string
    profile: string,
    name: string,
    summary: string
  }

  const [data, setData] = useState<docxType | null>(null);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')

  const [modal, setModal] = useState({ show: false })
  const { id } = useParams()
  console.log(id);

  useEffect(() => {
    axios(`/api/docx/viewdocx/${id}`, {
      method: "GET"
    }).then((res) => {
      console.log(res?.data?.viewOne);
      setData(res?.data?.viewOne)
      setContent(res?.data?.viewOne?.content)
      setSummary(res?.data?.viewOne?.summary)
      setTitle(res?.data?.viewOne?.title)
    })
  }, [])


  const handleUpdatePost = () => {
    
    setLoading(true)
    axios(`/api/docx/update/${id}`, {
      method: "PATCH",
      data: {
        title,
        summary,
        content,
      },

    })
      .then((res) => {
        console.log(res);
        setLoading(false)
        toast.success(res?.data?.message)
      }).catch((err) => {
        console.log(err);
        setLoading(false)
      })
  }
  // useEffect(() => {
  //   const autoSaveTimer = setTimeout(handleUpdatePost, 2000); // Adjust the interval as needed (2 seconds in this example)

  //   // Cleanup the timer when any of the values change
  //   return () => {
  //     clearTimeout(autoSaveTimer);
  //   };
  // }, [title, summary, content]);
  return (
    <>
      {
        modal.show && <AddCollaborators data={modal.show} setModal={setModal} />
      }


      <div className="bg-[#F8F8F8] pb-2 overflow-hidden">

        <form
          action=""

          className="flex flex-col"
        >
          <div className="pt-2 px-5 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Link href={'/dashboard'}>

                <FaDochub className={'text-blue-600 text-4xl '} />
              </Link>
              <input
                type={"text"}
                placeholder={"Title"}
                value={title}
                className={" bg-white w-fit border text-center h-10 rounded-md"}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

            </div>
            <div className="flex items-center gap-x-6 text-xl">


              <FiPrinter className={'cursor-pointer'} />


              <button type="button" onClick={handleUpdatePost} >
                {
                  !loading ? "Save" : <Spinner className={'h-7 w-7'} />
                }
              </button>

            </div>

            {/* <div className='border  rounded-md border-black px-3	py-1'>
            {/* {data?.} */}
            {/* {data?.name ? data?.name : 'Loading...'} */}
            {/* </div>  */}


            <Link href={'/dashboard/profile'} className='border px-2 h-10 rounded-md border-black	flex items-center gap-x-2'>

              <img src={data?.profile} alt="" className='w-8 h-8 rounded-full' />
              <p>
                {
                  `${data?.name}` ? `${data?.name}` : 'loading...'
                }
              </p>
            </Link>



          </div>
          {/* <input
            type="file"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          /> */}
          <div className="flex justify-center items-center p-2 ">
            <div className="w-1/4 border min-h-[86vh] h-auto flex flex-col shadow-lg overflow-y-hidden">

              <div className="w-full  bg-white">
                <p className="text-center pt-1 underline underline-offset-4">Summary</p>
                <textarea className="w-full h-full outline-none resize-none pl-2"
                  value={summary}

                  onChange={(e) => {
                    setSummary(e.target.value)
                  }}
                />
              </div>


              <hr />
              <div className="w-full h-[72vh] relative bg-[#F8F8F8] border border-black
              ">

                <div className=" flex justify-center items-center gap-x-3">
                  <p className=" text-center py-1.5 underline underline-offset-4">Contributors</p>
                  <button type="button" onClick={() => {
                    setModal({ show: true })
                  }} className="text-4xl">+</button>

                </div>
                {/* <div className="flex items-center gap-x-4 pl-3 text-xl font-medium">1) 
              
              <img src={data?.profile} alt="P"  className="object-cover w-10 h-10 rounded-full"/>
              <p>
              { data?.email ? data.email : 'Loading....' }</p> <p>
                (You)
                </p></div> */}
                <div className=" absolute bottom-4  w-full" >
                  <div className=" rounded-md flex items-center justify-center gap-x-2">




                    <input type="text" className=" h-10 border border-black rounded-lg outline-none  pl-2" placeholder="Send Message.." />
                    <button type="button" >
                      <AiOutlineSend className={'text-3xl text-green-500'} />

                    </button>
                  </div>

                </div>
              </div>

              <hr />
            </div>
            <div className="  bg-white rounded overflow-hidden shadow-lg w-3/4">
              <ReactQuill
                value={content}
                modules={modules}
                formats={formats}
                onChange={(value) => {
                  setContent(value);
                }}

                className="min-h-[80vh] w-full h-auto border-white no-underline"
              />


            </div>


          </div>

        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default update;