import { Resume } from "@prisma/client";
import PersonalInfo from "../personal-info/personal-info";

const ResumeCard = ({ resume }: { resume: Resume }) => {
	return (
		<div
			className={`shadow-lg space-y-4 w-full min-h-52 p-4 border-b-[10px] border-${[
				resume.themeColor,
			]}`}
		>
			<PersonalInfo resume={resume} />
		</div>
	);
};

export default ResumeCard;
