import DownloadPreview from "@/app/components/download-preview/download-preview";
import EducationInfo from "@/app/components/education-info/education-info";
import ExperienceInfo from "@/app/components/experience-info/experience-info";
import PersonalInfo from "@/app/components/personal-info/personal-info";
import PreviewCard from "@/app/components/preview-card/preview-card";
import SkillsInfo from "@/app/components/skills-info/skills-info";
import SummaryInfo from "@/app/components/summary/summary-info";
import { getResumeById } from "@/lib/actions";

interface Props {
	params: Promise<{ id: string }>;
}
export const generateMetadata = async ({ params }: Props) => {
	const { id } = await params;
	const resume = await getResumeById(id);
	return {
		title: `${resume.resume?.name}'s Resume`,
		description: `${resume.resume?.summary}`,
	};
};
const ResumeDownload = async ({ params }: Props) => {
	const { id } = await params;
	const resume = await getResumeById(id);
	return (
		<div className="min-h-screen flex flex-col gap-8 justify-center items-center">
			<h2 className="text-3xl text-center font-bold">
				🎉Hurray your AI powered resume is ready to download or print.
			</h2>
			<DownloadPreview resume={resume.resume!} />
		</div>
	);
};

export default ResumeDownload;
