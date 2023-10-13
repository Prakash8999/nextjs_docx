import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/index";


export async function DELETE (request:NextRequest, {params}:any) {
// interface 


try {
// const {searchParams} : any = new URL(request.url)
// const id = searchParams.get('id')
const {id} :any = params;

const deletedDocx=await prisma.docx.delete({
	where:{
		id:id
	}
})




if (deletedDocx) {
	return NextResponse.json({ success: true, message: "Docx deleted successfully" });
  } else {
	return NextResponse.json({ success: false, message: "Docx not found" }, {
	  status: 404
	});
  }

//  console.log(id);





} catch (err:any) {
return NextResponse.json({success:false, message:err}, {

	status:500
})
	
}




}