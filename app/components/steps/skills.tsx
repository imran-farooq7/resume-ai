import { resumeContext } from "@/context/resume-context";
import { useContext, useState } from "react";

const Skills = () => {
	const [loading, setLoading] = useState(false);
	const ctx = useContext(resumeContext);
	const {
		skills,
		handleSkillsChange,
		handleSkillsSubmit,
		addSkill,
		removeSkill,
	} = ctx!;
	const skillsLevel = [
		{ value: 1, label: "Poor" },
		{ value: 2, label: "Basic" },
		{ value: 3, label: "intermediate" },
		{ value: 4, label: "Advanced" },
		{ value: 5, label: "Expert" },
	];
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Skills</h2>
			<form className="w-full" onSubmit={handleSkillsSubmit}>
				{skills &&
					skills.map((skill, i) => {
						return (
							<div key={i} className="mb-5 space-y-4">
								<input
									type="text"
									name="name"
									placeholder="Skill name"
									value={skill.name}
									className="input input-bordered w-full"
									onChange={(e) => handleSkillsChange(e, i)}
									required
								/>
								<input
									type="number"
									name="level"
									min={1}
									max={5}
									placeholder="Rate (1-5)"
									value={skill.level}
									className="input input-bordered w-full"
									onChange={(e) => handleSkillsChange(e, i)}
									required
								/>
							</div>
						);
					})}
				{skills.length === 0 && (
					<h1 className="font-semibold my-10">Add Skill</h1>
				)}
				<div className="flex justify-between gap-4">
					<button
						onClick={addSkill}
						className="btn btn-success text-white min-w-20"
					>
						Add
					</button>
					{skills.length > 1 && (
						<button
							onClick={removeSkill}
							className="btn btn-error text-white min-w-20"
						>
							Remove
						</button>
					)}
					<button type="submit" className="btn btn-success text-white min-w-20">
						Next
					</button>
				</div>
			</form>
		</div>
	);
};

export default Skills;
