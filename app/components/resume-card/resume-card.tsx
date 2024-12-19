import { Resume } from "@prisma/client";
import PersonalInfo from "../personal-info/personal-info";
import Link from "next/link";
import SummaryInfo from "../summary/summary-info";
import ExperienceInfo from "../experience-info/experience-info";

const ResumeCard = ({ resume }: { resume: Resume }) => {
	return (
		<Link
			href={`/dashboard/resume/edit/${resume.id}`}
			className={`shadow-lg space-y-4 w-full max-h-full p-4 border-b-[10px]`}
			style={{ borderColor: resume.themeColor }}
		>
			<PersonalInfo resume={resume} />
			<SummaryInfo resume={resume} />
			{/* <ExperienceInfo resume={resume} /> */}
		</Link>
	);
};

export default ResumeCard;
