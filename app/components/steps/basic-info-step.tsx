import { resumeContext } from "@/context/resume-context";
import { SignInButton, useUser } from "@clerk/nextjs";
import React, { ChangeEvent, FormEvent, useContext } from "react";
import { HexColorPicker } from "react-colorful";

const BasicInfo = () => {
	const ctx = useContext(resumeContext);
	const { isSignedIn } = useUser();
	const {
		name,
		setResume,
		title,
		address,
		email,
		phone,
		updateResume,
		setStep,
		themeColor,
	} = ctx!;
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateResume();
		setStep(2);
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setResume((resume) => {
			const updatedResume = {
				...resume,
				[name]: value,
			};
			localStorage.setItem("resume", JSON.stringify(updatedResume));
			return updatedResume;
		});
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="flex flex-col gap-y-4">
				<h2 className="text-2xl font-bold">Personal information</h2>
				<input
					type="text"
					name="name"
					placeholder="Your name"
					value={name}
					className="input input-bordered w-full"
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					placeholder="title"
					name="title"
					className="input input-bordered w-full"
					value={title}
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					placeholder="Address"
					name="address"
					className="input input-bordered w-full"
					value={address}
					onChange={handleChange}
					required
				/>
				<input
					type="email"
					placeholder="Email Address"
					name="email"
					className="input input-bordered w-full"
					value={email}
					onChange={handleChange}
					required
				/>
				<input
					type="number"
					placeholder="Phone Number"
					className="input input-bordered w-full"
					value={phone}
					name="phone"
					onChange={handleChange}
					required
				/>
				<HexColorPicker
					color={themeColor}
					onChange={(themeColor) =>
						setResume((resume) => ({ ...resume, themeColor }))
					}
				/>
				{isSignedIn ? (
					<button className="btn btn-neutral">Save</button>
				) : (
					<SignInButton>
						<button className="btn btn-neutral">Signin to save info</button>
					</SignInButton>
				)}
			</div>
		</form>
	);
};

export default BasicInfo;
