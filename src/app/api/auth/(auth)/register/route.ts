import prisma from '../../../../../../prisma/index'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { type } from 'os';

export async function POST(request:NextRequest){
try {
	

	
	const {name, email, password,profile}  = await request.json()

	const user = await prisma.user.findUnique({
		where:{
			email
		}
	})
	if (user) {
		return NextResponse.json({ message: "User Already exist" }, { status: 400 })
	}

	const hashedPassowrd = await bcrypt.hash(password, 10)

const newUser = await prisma.user.create({
data:{
	name:name,
	email:email,
	profile:profile,
	password:hashedPassowrd
}	

})

return NextResponse.json({message:"User Created Successfully", success:true, newUser} , {status:201})

} catch (error) {
return NextResponse.json({message:error, success:false} , {status:500})
	
}


}