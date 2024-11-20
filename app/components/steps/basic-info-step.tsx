import React from "react";

const BasicInfo = () => {
	return (
		<div className="flex flex-col gap-y-4">
			<h2 className="text-2xl font-bold">Personal information</h2>
			<input
				type="text"
				placeholder="Name"
				className="input input-bordered w-full max-w-xs"
			/>
			<input
				type="text"
				placeholder="Name"
				className="input input-bordered w-full max-w-xs"
			/>
			<input
				type="text"
				placeholder="Name"
				className="input input-bordered w-full max-w-xs"
			/>
			<input
				type="text"
				placeholder="Name"
				className="input input-bordered w-full max-w-xs"
			/>
		</div>
	);
};

export default BasicInfo;
