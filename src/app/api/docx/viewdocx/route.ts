import { extractedData } from "helper/extractToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/index";


export async function GET(request: NextRequest) {
	try {
		const userId = extractedData(request)
		const userDocx = await prisma.docx.findMany({
			where: {
				userId: userId
			}
			,
			select: {
				id: true,
				userId: true,
				name: true,
				title: true,
				isAdmin: true,
				summary: true,
				email: true,
				profile: true,
				content: true,
				createdAt: true,
				updatedAt: true,
			}, orderBy: {
				createdAt: "desc"
			}
		})
		return NextResponse.json({
			message: "Docx Fetched Successfully", success: true, userDocx
		}, {
			status: 200
		})


	} catch (error) {
		return NextResponse.json({
			message: error, success: false
		}, {
			status: 500
		})
	}


}