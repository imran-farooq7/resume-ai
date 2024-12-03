import { Resume } from "@prisma/client";

const ResumeCard = ({ resume }: { resume: Resume }) => {
	return (
		<div
			className={`shadow-lg space-y-4 w-full h-56 p-4 border-b-[10px] border-${[
				resume.themeColor,
			]}`}
		>
			<div>Personal details</div>
			<div>Personal details</div>
			<div>Personal details</div>
			<div>Personal details</div>
		</div>
	);
};

export default ResumeCard;
