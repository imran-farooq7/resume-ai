"use client";
interface Resume {
	name: string;
	title: string;
	address: string;
	themeColor: string;
	phone: string;
	email: string;
	step: number;
	saveResume: () => Promise<void>;
	setStep: Dispatch<SetStateAction<number>>;
	setResume: Dispatch<
		SetStateAction<{
			name: string;
			address: string;
			email: string;
			title: string;
			phone: string;
			themeColor: string;
		}>
	>;
}
import { saveResumeData } from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import toast from "react-hot-toast";
const intialState = {
	name: "",
	address: "",
	email: "",
	title: "",
	phone: "",
	themeColor: "",
};
export const resumeContext = createContext<Resume | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
	const [resume, setResume] = useState(intialState);
	const [step, setStep] = useState(1);
	const router = useRouter();
	useEffect(() => {
		const savedResumeData = localStorage.getItem("resume");
		if (savedResumeData) {
			setResume(JSON.parse(savedResumeData));
		}
	}, []);
	const saveResume = async () => {
		try {
			const res = await saveResumeData({
				education: [],
				experience: [],
				skills: [],
				summary: "",
				job: "",
				...resume,
			});
			if (res?.status === "success") {
				setResume({ ...res.data! });
				toast.success(res.message);
				router.push(`/dashboard/resume/edit/${res.data?.id}`);
				setStep(2);
			}
			if (res?.status === "error") {
				toast.error(res.message);
			}
		} catch (error) {
			alert("An error occurred");
		}
	};
	return (
		<resumeContext.Provider
			value={{ step, setStep, setResume, saveResume, ...resume }}
		>
			{children}
		</resumeContext.Provider>
	);
};
