'use client'
import axios from "axios"
import React, { useState } from "react"
import Spinner from './Spinner'
import { BiCheckbox } from 'react-icons/bi'
import { BiCheckboxChecked } from 'react-icons/bi'
import { FcGoogle } from "react-icons/fc";
import Lottie from 'lottie-react'
import signin from '../assets/signin.json'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
// import { decode } from "jsonwebtoken"


const Login = () => {

	const [loading, setLoading] = useState(false)
	const [viewPassword, setViewPassword] = useState(false)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
const router = useRouter()

	const handleSignup = (e: any) => {
		setLoading(true)
		e.preventDefault()
		try {
			axios('/api/auth/login', {
				method: "POST",
				data: {
 email, password
				}
			}).then((res) => {
				router.push	('/dashboard')
				console.log(res);
			
				setLoading(false)
				toast.success(res?.data?.message,{
					position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
				})
			}).catch((err) => {
				console.log(err);
				setLoading(false)
			})

		} catch (error) {
			console.log(error);
			setLoading(false)
		}

	}



	return (
		<>
			<section className="flex">



				<div className='flex flex-col justify-center items-center min-h-screen h-full w-1/2 overflow-y-hidden'>


					<form className='' onSubmit={handleSignup} aria-readonly>

						<h1 className="text-blue-600 font-semibold text-3xl text-center mb-8">SuperDocs</h1>




						<div className="mb-2">
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-medium mb-1"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
							readOnly= {loading}
								className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
								placeholder="Enter your email"
								onChange={(e) => {
									setEmail(e.target.value)
								}}
								required
								
							/>
						</div>
						<div className="mb-2">
							<label
								htmlFor="password"
								className="block text-gray-700 text-sm font-medium mb-1"
							>
								Password
							</label>
							<input

								type={viewPassword ? 'text ' : 'password'}
								id="password"
								value={password}
								className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
								placeholder="Enter your password"
								onChange={(e) => {
									setPassword(e.target.value)
								}}
								required
								readOnly= {loading}
							/>
							<button onClick={(e) => {
								e.preventDefault()
								setViewPassword(!viewPassword);
							}}
								className="flex items-center  "> <p className="text-2xl">
									{viewPassword ? <BiCheckboxChecked /> : <BiCheckbox />}</p> <p>View Password</p> </button>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="bg-blue-500 hover:bg-blue-600  text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-300 "
						>
							{loading ? <Spinner className={'w-8 h-8'} /> : 'Login'}
						</button>

					</form>
					<div className="flex gap-x-2 items-center ">
						<p>
							Doesn't have a account?
						</p>
						<Link href={'/auth/signup'} className="text-blue-500">
							Signup
						</Link>

					</div>

					<div>

						<p className="text-center">or</p>
						<div className="flex justify-between items-center gap-x-1.5 text-xl border py-1.5 cursor-pointer px-6 w-full rounded-lg">
							<FcGoogle />
							<p>Continue with Google</p>
						</div>

					</div>




				</div>

				<div className='w-1/2 flex justify-center items-center bg-blue-600 min-h-screen '>
					<Lottie className='w-[80%] h-[80%] md:block hidden' animationData={signin} />
				</div>
			</section>
			<ToastContainer/>
		</>
	)
}

export default Login