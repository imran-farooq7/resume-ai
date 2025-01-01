"use client";
import { Resume } from "@prisma/client";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ExperienceInfo = ({
	resume,
}: {
	resume: Omit<Resume, "id" | "userEmail" | "created_at">;
}) => {
	return (
		<div>
			<h2
				className="font-bold text-2xl text-center"
				style={{ color: resume.themeColor }}
			>
				Professional Experience
			</h2>
			<hr style={{ borderColor: resume.themeColor }} />

			{resume?.experience
				// @ts-ignore
				?.map((exp) => {
					return (
						<div key={exp.summary} className="mt-4">
							<h2 className="font-medium">{exp.title}</h2>
							<h3 className="font-medium mb-3">{exp.company}</h3>
							{/* <ul
								className="text-xs font-light"
								dangerouslySetInnerHTML={{ __html: exp.summary }}
							/> */}
							<MarkdownPreview source={exp.summary} />
						</div>
					);
				})}
		</div>
	);
};

export default ExperienceInfo;
