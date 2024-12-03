import React from "react";
import Skeleton from "../components/skeleton/skeleton";

const Loading = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3">
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</div>
	);
};

export default Loading;
