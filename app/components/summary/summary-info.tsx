import { Resume } from "@prisma/client";

const SummaryInfo = ({
	resume,
}: {
	resume: Omit<Resume, "id" | "userEmail" | "created_at">;
}) => {
	return <p className="text-sm">{resume.summary} </p>;
};

export default SummaryInfo;
