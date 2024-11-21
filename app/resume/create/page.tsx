"use client";
import BasicInfo from "@/app/components/steps/basic-info-step";
import StepsNav from "@/app/components/steps/steps-nav";
import { resumeContext } from "@/context/resume-context";
import React, { useContext } from "react";

const CreateResume = () => {
	const ctx = useContext(resumeContext);
	return (
		<div className="flex flex-col gap-4 justify-center items-center h-screen">
			<StepsNav />
			{ctx?.step === 1 && <BasicInfo />}
		</div>
	);
};

export default CreateResume;
