import { resumeContext } from "@/context/resume-context";
import React, { useContext } from "react";

const Summary = () => {
	const ctx = useContext(resumeContext);
	const { setResume, updateResume, summary, setStep } = ctx!;
	const handleSubmit = async () => {
		updateResume();
		setStep(3);
	};

	return (
		<div className="space-y-2">
			<h2 className="text-2xl font-bold">Summary</h2>
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
