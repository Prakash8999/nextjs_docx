import prisma from '../../../../../../prisma/index'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function POST(request:NextRequest){
try {
	const {email, password} = await request.json()
let user = await prisma.user.findUnique({
	where:{
		email
	}
})
if (!user) {
	return NextResponse.json({ message: "User Does not exist" }, { status: 400 })
}

const isMatched = await bcrypt.compare(password, user.password)
if (!isMatched) {
	return NextResponse.json({ message: "Inavlid Credentials" }, { status: 400 })
}
 
const tokenData ={
	id:user.id,
	name:user.name,
	email:user.email
}

const token = await jwt.sign(tokenData, String(process.env.SECRET_KEY))

const response = NextResponse.json({
	success:true, message: "Logged in Successfully"
}, {status:200}) 
response.cookies.set("token", token, {
	httpOnly:true
})

return response;

} catch (error:any) {
	return NextResponse.json ({success:false, message:error.message}, {
		status:500
	})
}



}