/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from "@/prisma/db";
import { currentUser } from "@clerk/nextjs/server";

export const saveResumeData = async ({
	title,
	address,
	themeColor,
	skills,
	experience,
	education,
	name,
	summary,
	phone,
}: {
	title: any;
	job: any;
	address: any;
	themeColor: any;
	skills: any;
	experience: any;
	education: any;
	name: any;
	summary: any;
	phone: any;
}) => {
	const user = await currentUser();
	console.log(user);
	if (!user?.emailAddresses) {
		return {
			status: "error",
			message: "you must be login to save resume data",
		};
	}
	try {
		const resumeData = await prisma.resume.create({
			data: {
				email: user.emailAddresses[0].emailAddress,
				address,
				education,
				experience,
				name,
				skills,
				summary,
				themeColor,
				title,
				phone,
			},
		});
		if (resumeData) {
			return {
				status: "success",
				message: "Resume data saved successfully",
				data: resumeData,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "something went wrong",
		};
	}
};
