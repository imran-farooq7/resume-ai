import { getUserResumes } from "@/lib/actions";
import ResumeCard from "../components/resume-card/resume-card";

const DashboardPage = async () => {
	const { resumes: resumes } = await getUserResumes();
	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-1 mb-10 gap-8 gap-y-4 md:grid-cols-2">
				{resumes?.map((resume) => (
					<ResumeCard resume={resume} key={resume.id} />
				))}
			</div>
		</div>
	);
};

export default DashboardPage;
