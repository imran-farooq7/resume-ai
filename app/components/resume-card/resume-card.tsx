"use client";
import { Resume } from "@prisma/client";
import Link from "next/link";
import PersonalInfo from "../personal-info/personal-info";
import SummaryInfo from "../summary/summary-info";
import { useContext } from "react";
import { resumeContext } from "@/context/resume-context";

const ResumeCard = ({ resume }: { resume: Resume }) => {
	const ctx = useContext(resumeContext);
	const { handleDeleteResume } = ctx!;
	return (
		<div className="flex flex-col gap-y-8">
			<Link
				href={`/dashboard/resume/edit/${resume.id}`}
				className={`shadow-lg space-y-4 w-full max-h-full p-4 border-b-[10px]`}
				style={{ borderColor: resume.themeColor }}
			>
				<PersonalInfo resume={resume} />
				<SummaryInfo resume={resume} />
				{/* <ExperienceInfo resume={resume} /> */}
			</Link>
			<div className="flex max-w-2xl justify-between">
				<Link
					href={`/dashboard/resume/download/${resume.id}`}
					className="btn btn-success text-white min-w-20"
				>
					Download
				</Link>

				<Link
					href={`/dashboard/resume/edit/${resume.id}`}
					className="btn btn-success text-white min-w-20"
				>
					Edit
				</Link>

				<button
					onClick={() => handleDeleteResume(resume.id)}
					className="btn btn-error text-white min-w-20"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default ResumeCard;
