import { extractedData } from "helper/extractToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/index";


export async function GET(request:NextRequest){
try {
	const userId = extractedData(request)
	const user = await prisma.user.findUnique({where:{
		id:userId
	},select:{
		id:true,
		name:true,
		email:true,
		profile:true,
		password:false
	}})


return NextResponse.json({message:"User Fetch", user}, {status:200})

} catch (error) {
	return NextResponse.json({success:false, message: error} ,{status:500})
}



}