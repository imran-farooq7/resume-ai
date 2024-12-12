import { resumeContext } from "@/context/resume-context";
import { generateResumeSummary } from "@/lib/actions";
import { title } from "process";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const Summary = () => {
	const ctx = useContext(resumeContext);
	const [loading, setLoading] = useState(false);
	const { setResume, updateResume, summary, setStep, title } = ctx!;
	const handleSubmit = async () => {
		updateResume();
		setStep(3);
	};
	const handleSummaryGenerate = async () => {
		setLoading(true);
		if (!title) {
			toast.error("Provide job title in order to generate summary");
			setLoading(false);
			return;
		}
		try {
			const res = await generateResumeSummary(
				`generate resume summary for the person with following job title ${title}`
			);
			if (res.status === "success") {
				setResume((resume) => ({
					...resume,
					summary: res.text!,
				}));
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-2">
			<div className="flex justify-between items-center my-2">
				<h2 className="text-2xl font-bold">Summary</h2>
				<button className="btn btn-neutral" onClick={handleSummaryGenerate}>
					{loading ? (
						<span className="animate-pulse">Generating...</span>
					) : (
						"Generate Summary With AI"
					)}
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
