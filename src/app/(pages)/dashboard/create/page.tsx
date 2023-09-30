'use client'
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaDochub } from 'react-icons/fa'
import Spinner from "components/Spinner";
import AddCollaborators from "app/Modal/AddCollaborators";
import { useAuth } from "context/authContext";



const modules = {

  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["clean"],
    ["link", "image", "video",  "background", "code-block",],
    ["direction", "align"],
  ],
};
// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["clean"],
//     ["font", "size", "color", "background", "script", "code-block"],
//     ["direction", "align"],
//     ["link", "image", "video", "formula"],
//   ],
// };
const formats = [
  'font','size',
  'bold','italic','underline','strike',
  'color','background',
  'script',
  'header','blockquote','code-block',
  'indent','list',
  'direction','align',
  'link','image','video','formula',
]
const CreatePost = () => {
  const {account}:any = useAuth()
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('Untitled Document')
  const router = useRouter();
const [modal,setModal] = useState({ show:false})

console.log(account);




  return (
    <>
{
  modal.show && <AddCollaborators  data={modal.show } setModal= {setModal}/>
}


      <div className="bg-[#F8F8F8] pb-4">

        <form
          action=""

          className="flex flex-col"
        >
          <div className="pt-3 px-3 flex items-center justify-between">
            <div className="flex items-center">

              <FaDochub className={'text-blue-600 text-3xl '} />
              <input
                type={"text"}
                placeholder={"Title"}
                value={title}
                className={" bg-white w-fit border text-center h-8 rounded-md"}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

            </div>


            <div className='border  rounded-md border-black	'>
              Name
            </div>

          </div>
          {/* <input
            type="file"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          /> */}
          <div className="flex justify-center items-center p-2 ">
            <div className="w-1/4 border min-h-[86vh] h-auto flex flex-col gap-y-3 overflow-y-hidden">

              <div className="w-full max-h-[40vh] bg-white">
                <p className="text-center py-1.5 underline underline-offset-4">Summary</p>
                <textarea className="w-full h-full outline-none resize-none pl-2" />
              </div>


              <hr />
              <div className="w-full h-[40vh] bg-white  relative">
                <p className=" text-center py-1.5 underline underline-offset-4">Contributors</p>
                <button type="button" onClick={()=>{
                  setModal({show:true})
                }} className="absolute bottom-2 right-2 border border-black py-1.5 px-4 bg-gradient-to-r from-green-400 via-green-500 to-green-500 hover:bg-gradient-to-br rounded-lg  duration-150">Add</button>
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
    </>
  );
};

export default CreatePost;