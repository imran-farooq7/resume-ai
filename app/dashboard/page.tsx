import { getUserResumes } from "@/lib/actions";
import ResumeCard from "../components/resume-card/resume-card";

const DashboardPage = async () => {
	const { resumes: resumes } = await getUserResumes();
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{resumes?.map((resume) => (
				<ResumeCard resume={resume} key={resume.id} />
			))}
		</div>
	);
};

export default DashboardPage;
