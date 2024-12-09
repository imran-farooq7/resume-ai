import { Resume } from "@prisma/client";

const SummaryInfo = ({ resume }: { resume: Resume }) => {
	return <p className="text-sm">{resume.summary} </p>;
};

export default SummaryInfo;
