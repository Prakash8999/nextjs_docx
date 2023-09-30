import  jwt, { JwtPayload }  from "jsonwebtoken";
import { NextRequest } from "next/server";
NextRequest


export const extractedData = (request:NextRequest) =>{
	try {
		const token = request.cookies.get('token')?.value || ''
		const decodedToken = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload
		return decodedToken.id;
	} catch (error) {
		console.log(error);
	}

}