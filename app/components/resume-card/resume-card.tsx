import { Resume } from "@prisma/client";
import PersonalInfo from "../personal-info/personal-info";
import Link from "next/link";

const ResumeCard = ({ resume }: { resume: Resume }) => {
	return (
		<Link
			href={`/dashboard/resume/edit/${resume.id}`}
			className={`shadow-lg space-y-4 w-full min-h-52 p-4 border-b-[10px]`}
			style={{ borderColor: resume.themeColor }}
		>
			<PersonalInfo resume={resume} />
		</Link>
	);
};

export default ResumeCard;
