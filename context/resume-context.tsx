"use client";
interface Resume {
	name: string;
	job: string;
	address: string;
	themeColor: string;
	phone: string;
	email: string;
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	setResume: Dispatch<
		SetStateAction<{
			name: string;
			address: string;
			email: string;
			job: string;
			phone: string;
			themeColor: string;
		}>
	>;
}
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
const intialState = {
	name: "",
	address: "",
	email: "",
	job: "",
	phone: "",
	themeColor: "",
};
export const resumeContext = createContext<Resume | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
	const [resume, setResume] = useState(intialState);
	const [step, setStep] = useState(0);
	return (
		<resumeContext.Provider value={{ step, setStep, setResume, ...resume }}>
			{children}
		</resumeContext.Provider>
	);
};
