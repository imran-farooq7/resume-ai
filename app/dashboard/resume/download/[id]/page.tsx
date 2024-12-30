const ResumeDownload = () => {
	return (
		<div className="min-h-screen flex flex-col gap-8 justify-center items-center">
			<h2 className="text-3xl text-center font-bold">
				🎉Hurray your AI powered resume is ready to download or print.
			</h2>
			<div className="flex gap-10">
				<button className="btn btn-success text-white min-w-20">
					Download
				</button>

				<button className="btn btn-success text-white min-w-20">Print</button>

				{/* <button type="submit" className="btn btn-success text-white min-w-20">
					Next
				</button> */}
			</div>
		</div>
	);
};

export default ResumeDownload;
