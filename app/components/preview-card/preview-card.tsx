import { useContext } from "react";
import PersonalInfo from "../personal-info/personal-info";
import SummaryInfo from "../summary/summary-info";
import { resumeContext } from "@/context/resume-context";
import ExperienceInfo from "../experience-info/experience-info";
import EducationInfo from "../education-info/education-info";

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
	} = ctx!;
	const resume = {
		address,
		email,
		name,
		phone,
		summary,
		title,
		experience,
		skills: [],
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
		</div>
	);
};

export default PreviewCard;
