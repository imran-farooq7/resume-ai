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
	email,
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
	email: any;
}) => {
	const user = await currentUser();
	if (!user?.emailAddresses) {
		return {
			status: "error",
			message: "you must be login to save resume data",
		};
	}
	const data = {
		title,
		address,
		themeColor,
		skills,
		experience,
		education,
		name,
		summary,
		phone,
		email,
		userEmail: user.emailAddresses[0].emailAddress,
	};
	try {
		const resumeData = await prisma.resume.create({
			data: {
				...data,
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
		console.log(error, "Error");
		return {
			status: "error",
			message: "something went wrong",
		};
	}
};
export const getUserResumes = async () => {
	const user = await currentUser();
	if (!user?.emailAddresses[0].emailAddress) {
		return {
			status: "error",
			message: "User not found",
		};
	}
	try {
		const resumes = await prisma.resume.findMany({
			where: {
				email: user.emailAddresses[0].emailAddress,
			},
		});
		return {
			resumes,
			status: "success",
			message: "Resumes fetched successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Error fetching resumes",
		};
	}
};
export const getResumeById = async (id: string) => {
	const user = await currentUser();
	if (!user?.emailAddresses[0].emailAddress) {
		return {
			status: "error",
			message: "User not found",
		};
	}
	try {
		const resume = await prisma.resume.findUnique({
			where: {
				email: user.emailAddresses[0].emailAddress,
				id,
			},
		});
		return {
			resume,
			status: "success",
			message: "Resumes fetched successfully",
		};
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Error fetching resumes",
		};
	}
};
const checkResumeOwner = async (resumeId: string) => {
	const user = await currentUser();
	if (!user) {
		return {
			status: "error",
			message: "User not found",
		};
	}
	try {
		const resume = await prisma.resume.findFirst({
			where: {
				id: resumeId,
			},
		});
		if (!resume) {
			return {
				status: "error",
				message: "Resume not found",
			};
		}
		if (resume.userEmail !== user.emailAddresses[0].emailAddress) {
			return {
				status: "error",
				message: "Unauthorized",
			};
		}
		return true;
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "Something went wrong",
		};
	}
};
export const updateResumeById = async (resumeData: any) => {
	const { id, ...rest } = resumeData;
	try {
		await checkResumeOwner(resumeData.id);
		const resume = await prisma.resume.update({
			where: {
				id,
			},
			data: {
				...rest,
			},
		});
		if (resume) {
			return {
				status: "success",
				message: "Resume was successfully updated",
				data: resume,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: "An error occurred while updating the resume",
		};
	}
};
