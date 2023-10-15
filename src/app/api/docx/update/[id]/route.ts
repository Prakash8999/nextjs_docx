import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/index";
import { json } from "stream/consumers";
export async function PATCH(request:NextRequest) {
	try {
		const {title, content, summary, id} =await request.json()
		const updateData= await prisma.docx.update({
			where:{id:id}, data :{
				title:title,
				content:content,
				 summary:summary
			}
		})
		return NextResponse.json({success:true, message:"Docx Updated Successfully", updateData}, {status:200})
	} catch (error) {
		return NextResponse.json({success:false, messgae:error }, {status:500})
	}
}