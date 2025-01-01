"use client";
import { useContext } from "react";
import PersonalInfo from "../personal-info/personal-info";
import SummaryInfo from "../summary/summary-info";
import { resumeContext } from "@/context/resume-context";
import ExperienceInfo from "../experience-info/experience-info";
import EducationInfo from "../education-info/education-info";
import SkillsInfo from "../skills-info/skills-info";
import Loading from "@/app/loading";

const PreviewCard = () => {
	const ctx = useContext(resumeContext);
	const {
		themeColor,
		address,
		email,
		name,
		phone,
		summary,
		title,
		experience,
		educations,
		skills,
	} = ctx!;
	const resume = {
		address,
		email,
		name,
		phone,
		summary,
		title,
		experience,
		skill: skills,
		education: educations,
		themeColor,
	};

	return (
		<div
			className={`shadow-lg space-y-4 w-full min-h-52 p-4 border-b-[10px]`}
			style={{ borderColor: themeColor }}
		>
			<PersonalInfo resume={resume} />
			<SummaryInfo resume={resume} />
			<ExperienceInfo resume={resume} />
			<EducationInfo resume={resume} />
			<SkillsInfo resume={resume} />
		</div>
	);
};

export default PreviewCard;
