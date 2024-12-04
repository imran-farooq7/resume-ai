import { Resume } from "@prisma/client";

const PersonalInfo = ({ resume }: { resume: Resume }) => {
	return (
		<div>
			<h2
				className="font-bold text-2xl text-center"
				style={{ color: resume.themeColor }}
			>
				{resume.name}
			</h2>
			<p className="text-center text-sm font-semibold">{resume.title}</p>
			<p className="text-center text-sm font-semibold">{resume.address}</p>
			<div className="flex justify-between mt-4">
				<p className="text-center text-sm">{resume.phone}</p>
				<p className="text-center text-sm">{resume.email}</p>
			</div>
		</div>
	);
};

export default PersonalInfo;
