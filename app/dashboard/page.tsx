import { getUserResumes } from "@/lib/actions";

const DashboardPage = async () => {
	const { resumes: resumes } = await getUserResumes();
	return <div>{JSON.stringify(resumes)}</div>;
};

export default DashboardPage;
