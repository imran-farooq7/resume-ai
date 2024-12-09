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
	updateResume: () => Promise<void>;
}
import { getResumeById, saveResumeData, updateResumeById } from "@/lib/actions";
import { useParams, useRouter } from "next/navigation";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	use,
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
	const params = useParams<{ id: string }>();
	useEffect(() => {
		const savedResumeData = localStorage.getItem("resume");
		if (savedResumeData) {
			setResume(JSON.parse(savedResumeData));
		}
	}, []);
	useEffect(() => {
		if (params.id) {
			getResume();
		}
	}, [params.id]);
	const getResume = async () => {
		const { resume } = await getResumeById(params.id);
		if (resume) {
			setResume(resume);
		}
	};
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
			console.log(res);
			if (res?.status === "success") {
				setResume({ ...res.data! });
				localStorage.removeItem("resume");
				toast.success(res.message);
				router.push(`/dashboard/resume/edit/${res.data?.id}`);
				setStep(2);
			}
			if (res?.status === "error") {
				toast.error(res.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("An error occurred while saving");
		}
	};
	const updateResume = async () => {
		try {
			const res = await updateResumeById(resume);
			setResume(res?.data!);
			toast.success(res?.message!);
			setStep(3);
		} catch (error) {
			toast.error("An error occurred while updating resume");
		}
	};
	return (
		<resumeContext.Provider
			value={{ step, setStep, setResume, saveResume, updateResume, ...resume }}
		>
			{children}
		</resumeContext.Provider>
	);
};
