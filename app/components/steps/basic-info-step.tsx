import { resumeContext } from "@/context/resume-context";
import React, { FormEvent, useContext } from "react";

const BasicInfo = () => {
	const ctx = useContext(resumeContext);
	const { name, setResume, title, address, email, phone, setStep, saveResume } =
		ctx!;
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		saveResume();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col gap-y-4">
				<h2 className="text-2xl font-bold">Personal information</h2>

				<input
					type="text"
					placeholder="Your name"
					value={name}
					className="input input-bordered w-full max-w-xs"
					onChange={(e) =>
						setResume((resume) => ({
							...resume,
							name: e.target.value,
						}))
					}
					required
				/>
				<input
					type="text"
					placeholder="title title"
					className="input input-bordered w-full max-w-xs"
					value={title}
					onChange={(e) =>
						setResume((resume) => ({
							...resume,
							title: e.target.value,
						}))
					}
					required
				/>
				<input
					type="text"
					placeholder="Address"
					className="input input-bordered w-full max-w-xs"
					value={address}
					onChange={(e) =>
						setResume((resume) => ({
							...resume,
							address: e.target.value,
						}))
					}
					required
				/>
				<input
					type="email"
					placeholder="Email Address"
					className="input input-bordered w-full max-w-xs"
					value={email}
					onChange={(e) =>
						setResume((resume) => ({
							...resume,
							email: e.target.value,
						}))
					}
					required
				/>
				<input
					type="number"
					placeholder="Phone Number"
					className="input input-bordered w-full max-w-xs"
					value={phone}
					onChange={(e) =>
						setResume((resume) => ({
							...resume,
							phone: e.target.value,
						}))
					}
					required
				/>
				<button className="btn btn-neutral">Save</button>
			</div>
		</form>
	);
};

export default BasicInfo;
