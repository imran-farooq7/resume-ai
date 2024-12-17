"use client";
import BasicInfoCreate from "@/app/components/steps/basic-info-create";
import Experience from "@/app/components/steps/experience";
import StepsNav from "@/app/components/steps/steps-nav";
import Summary from "@/app/components/steps/summary";
import { resumeContext } from "@/context/resume-context";
import { useContext } from "react";

const CreateResume = () => {
	const ctx = useContext(resumeContext);
	return (
		<div className="flex flex-col gap-4 justify-center items-center h-screen">
			<StepsNav />
			{ctx?.step === 1 && <BasicInfoCreate />}
			{ctx?.step === 2 && <Summary />}
			{ctx?.step === 3 && <Experience />}
		</div>
	);
};

export default CreateResume;
