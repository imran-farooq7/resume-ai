import { resumeContext } from "@/context/resume-context";
import { useContext } from "react";

const StepsNav = () => {
	const ctx = useContext(resumeContext);
	const { step, setStep } = ctx!;
	return (
		<ul className="steps">
			<li
				className={`step ${step === 1 && "step-primary"} cursor-pointer`}
				onClick={() => setStep(1)}
			/>
			<li
				className={`step ${step === 2 && "step-primary"} cursor-pointer`}
				onClick={() => setStep(2)}
			/>
			<li
				className={`step ${step === 3 && "step-primary"} cursor-pointer`}
				onClick={() => setStep(3)}
			/>
			<li
				className={`step ${step === 4 && "step-primary"} cursor-pointer`}
				onClick={() => setStep(4)}
			/>
			<li
				className={`step ${step === 5 && "step-primary"} cursor-pointer`}
				onClick={() => setStep(5)}
			/>
		</ul>
	);
};

export default StepsNav;
