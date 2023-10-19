import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/index";

export async function GET(request:NextRequest, {params}:any) {
	try {
		const {id} : any = params;
		const viewOne = await prisma.docx.findUnique({
			where:{
				id:id
			}
		})
		return NextResponse.json({success:true, viewOne}, {status:200})
	} catch (error) {
		return NextResponse.json({success:true, message:error}, {status:500})
	}
}