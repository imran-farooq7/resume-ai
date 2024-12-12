import { resumeContext } from "@/context/resume-context";
import { generateResumeSummary } from "@/lib/actions";
import React, { useContext } from "react";

const Summary = () => {
	const ctx = useContext(resumeContext);
	const { setResume, updateResume, summary, setStep } = ctx!;
	const handleSubmit = async () => {
		updateResume();
		setStep(3);
	};
	const handleSummaryGenerate = async () => {};

	return (
		<div className="space-y-2">
			<div className="flex justify-between items-center my-2">
				<h2 className="text-2xl font-bold">Summary</h2>
				<button className="btn btn-neutral" onClick={handleSummaryGenerate}>
					Generate Summary With AI
				</button>
			</div>
			<textarea
				placeholder="Write brief summary about yourself"
				className="textarea textarea-bordered textarea-lg w-full max-w-lg"
				onChange={(e) =>
					setResume((resume) => ({
						...resume,
						summary: e.target.value,
					}))
				}
				rows={5}
				cols={40}
				value={summary}
			/>
			<button onClick={handleSubmit} className="btn btn-neutral btn-block">
				Next
			</button>
		</div>
	);
};

export default Summary;
