"use client";
import { Resume } from "@prisma/client";
import EducationInfo from "../education-info/education-info";
import ExperienceInfo from "../experience-info/experience-info";
import PersonalInfo from "../personal-info/personal-info";
import SkillsInfo from "../skills-info/skills-info";
import SummaryInfo from "../summary/summary-info";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const DownloadPreview = ({ resume }: { resume: Resume }) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<div className="flex gap-10">
				<button
					className="btn btn-success text-white min-w-20"
					onClick={() => reactToPrintFn()}
				>
					Download
				</button>

				<button
					className="btn btn-success text-white min-w-20"
					onClick={() => reactToPrintFn()}
				>
					Print
				</button>
			</div>
			<div
				className={`shadow-lg space-y-4 w-3/4 print:w-full min-h-52 print:min-h-full p-4 border-b-[10px]`}
				style={{ borderColor: resume.themeColor }}
				ref={contentRef}
			>
				<PersonalInfo resume={resume} />
				<SummaryInfo resume={resume} />
				<ExperienceInfo resume={resume} />
				<EducationInfo resume={resume} />
				<SkillsInfo resume={resume} />
			</div>
		</div>
	);
};

export default DownloadPreview;
