"use client";
import PreviewCard from "@/app/components/preview-card/preview-card";
import BasicInfo from "@/app/components/steps/basic-info-step";
import Experience from "@/app/components/steps/experience";
import StepsNav from "@/app/components/steps/steps-nav";
import Summary from "@/app/components/steps/summary";
import { resumeContext } from "@/context/resume-context";
import { useContext } from "react";

const ResumeEditPage = () => {
	const ctx = useContext(resumeContext);
	// const resume = use(getResumeById(id));
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
			<div className="flex flex-col gap-4 justify-center items-center">
				<StepsNav />
				{ctx?.step === 1 && <BasicInfo />}
				{ctx?.step === 2 && <Summary />}
				{ctx?.step === 3 && <Experience />}
			</div>
			<PreviewCard />
		</div>
	);
};

export default ResumeEditPage;
