import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/index";
import { extractedData } from "helper/extractToken";



export async  function POST (request:NextRequest) {
try {
	
const {title, content, summary} =await request.json()
console.log(title, content, summary);


const docxData = {
	title: title,
	content: content,
	summary: summary,
	
	user: {
	  connect: {
		id : extractedData(request)
	  },
	},
  };
  


const createDocx = await prisma.docx.create({
	data:docxData
})

return NextResponse.json({message:"Docx Saved Successfully", createDocx }, {status:201})
} catch (error) {
	return NextResponse.json({message:error, success:false}, { status:500
	})
}


}