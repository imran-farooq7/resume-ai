"use client";
import BasicInfo from "@/app/components/steps/basic-info-step";
import { resumeContext } from "@/context/resume-context";
import React, { useContext } from "react";

const CreateResume = () => {
	const ctx = useContext(resumeContext);
	return (
		<div className="flex justify-center items-center h-screen">
			{ctx?.step === 1 && <BasicInfo />}
		</div>
	);
};

export default CreateResume;
