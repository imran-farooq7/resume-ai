import { Resume } from "@prisma/client";

const EducationInfo = ({
	resume,
}: {
	resume: Omit<Resume, "id" | "userEmail" | "created_at">;
}) => {
	console.log(resume);
	return (
		<div>
			<h2
				className="font-bold text-2xl text-center"
				style={{ color: resume.themeColor }}
			>
				Education
			</h2>
			<hr style={{ borderColor: resume.themeColor }} />

			{resume?.education
				// @ts-ignore
				?.map((edu, i) => {
					return (
						<div key={i} className="mt-4">
							<h2 className="font-bold mb-1">{edu.degree}</h2>
							<div className="ml-2">
								<h3>{edu.university}</h3>
								<p>{edu.year}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default EducationInfo;
