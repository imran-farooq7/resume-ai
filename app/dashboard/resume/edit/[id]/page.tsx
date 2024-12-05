"use client";
import BasicInfo from "@/app/components/steps/basic-info-step";
import StepsNav from "@/app/components/steps/steps-nav";
import { resumeContext } from "@/context/resume-context";
import React, { use, useContext } from "react";

const ResumeEditPage = () => {
	const ctx = useContext(resumeContext);
	// const resume = use(getResumeById(id));
	return (
		<div className="flex flex-col gap-4 justify-center items-center h-screen">
			<StepsNav />
			{ctx?.step === 1 && <BasicInfo />}
		</div>
	);
};

export default ResumeEditPage;
