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
const ResumeDownload = async ({ params }: Props) => {
	const { id } = await params;
	const resume = await getResumeById(id);
	return (
		<div className="min-h-screen flex flex-col gap-8 justify-center items-center">
			<h2 className="text-3xl text-center font-bold">
				🎉Hurray your AI powered resume is ready to download or print.
			</h2>
			<div
				className={`shadow-lg space-y-4 w-3/5 min-h-52 p-4 border-b-[10px]`}
				style={{ borderColor: resume.resume?.themeColor }}
			>
				<PersonalInfo resume={resume.resume!} />
				<SummaryInfo resume={resume.resume!} />
				<ExperienceInfo resume={resume.resume!} />
				<EducationInfo resume={resume.resume!} />
				<SkillsInfo resume={resume.resume!} />
			</div>
			<div className="flex gap-10">
				<button className="btn btn-success text-white min-w-20">
					Download
				</button>

				<button className="btn btn-success text-white min-w-20">Print</button>

				{/* <button type="submit" className="btn btn-success text-white min-w-20">
					Next
				</button> */}
			</div>
		</div>
	);
};

export default ResumeDownload;
