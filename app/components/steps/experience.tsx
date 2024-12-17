import { resumeContext } from "@/context/resume-context";
import { useContext } from "react";

const Experience = () => {
	const ctx = useContext(resumeContext);
	const {
		experiences,
		handleResumeChange,
		handleExperienceSubmit,
		addExperience,
		removeExperience,
		title,
	} = ctx!;
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Experience</h2>

			<form className="w-full">
				{experiences &&
					experiences.map((exp, i) => {
						return (
							<div key={i} className="mb-5 space-y-4">
								<input
									type="text"
									name="title"
									placeholder="Job title"
									value={exp.title}
									className="input input-bordered w-full"
									onChange={(e) => handleResumeChange(e.target.value, i)}
									required
								/>
								<input
									type="text"
									name="company "
									placeholder="Company"
									value={exp.company}
									className="input input-bordered w-full"
									onChange={(e) => handleResumeChange(e.target.value, i)}
									required
								/>
							</div>
						);
					})}
			</form>
			<div className="flex justify-between">
				<button
					onClick={addExperience}
					className="btn btn-success text-white min-w-20"
				>
					Add
				</button>
				{experiences.length > 1 && (
					<button
						onClick={removeExperience}
						className="btn btn-error text-white min-w-20"
					>
						Remove
					</button>
				)}
				<button
					onClick={handleExperienceSubmit}
					className="btn btn-success text-white min-w-20"
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Experience;
