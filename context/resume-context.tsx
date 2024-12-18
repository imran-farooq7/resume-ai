"use client";

interface Resume {
	name: string;
	title: string;
	address: string;
	themeColor: string;
	phone: string;
	email: string;
	step: number;
	experience: any;
	summary: string;
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
			summary: string;
			experience: any;
		}>
	>;
	experiences: any[];
	handleResumeChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => void;
	updateResume: () => Promise<void>;
	addExperience: () => void;
	removeExperience: () => void;
	handleExperienceSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}
import {
	getResumeById,
	saveResumeData,
	updateResumeById,
	updateResumeExperience,
} from "@/lib/actions";
import { JsonValue } from "@prisma/client/runtime/library";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
	ChangeEvent,
	createContext,
	Dispatch,
	FormEvent,
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
	summary: "",
	experience: [] as JsonValue,
};
export const resumeContext = createContext<Resume | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
	const [resume, setResume] = useState(intialState);
	const pathName = usePathname();
	const [step, setStep] = useState(3);
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const [experiences, setExperiences] = useState<any[]>([]);
	useEffect(() => {
		const savedResumeData = localStorage.getItem("resume");
		if (savedResumeData) {
			setResume(JSON.parse(savedResumeData));
		}
		if (pathName.includes("/create")) {
			setResume(intialState);
		}
	}, []);
	useEffect(() => {
		if (params.id) {
			getResume();
		}
	}, [params.id]);
	const getResume = async () => {
		const { resume } = await getResumeById(params.id);
		console.log(resume);
		if (resume) {
			setResume(resume);
		}
	};
	useEffect(() => {
		if (resume.experience) {
			setExperiences(resume.experience as any);
		}
	}, [resume]);
	const handleResumeChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const newExperience = [...experiences];
		const { name, value } = e.target;
		newExperience[index][name] = value;
		setExperiences(newExperience);
	};
	const handleExperienceSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await updateResumeExperience(resume, experiences);
			if (res?.status === "success") {
				toast.success(res.message);
				setResume(res.data!);
				setStep(4);
			}
		} catch (error) {
			toast.error("Error updating resume experience");
		}
		//
	};
	const addExperience = () => {
		const newExperience = {
			title: "",
			company: "",
			startDate: "",
			endDate: "",
			summary: "",
		};
		setExperiences([...experiences, newExperience]);
	};
	const removeExperience = () => {
		if (experiences.length === 1) return;
		const RemoveExperience = experiences.slice(0, experiences.length - 1);
		setExperiences(RemoveExperience);
	};
	const saveResume = async () => {
		try {
			const res = await saveResumeData({
				education: [],
				skills: [],
				job: "",
				...resume,
			});
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
		} catch (error) {
			toast.error("An error occurred while updating resume");
		}
	};
	return (
		<resumeContext.Provider
			value={{
				step,
				setStep,
				setResume,
				saveResume,
				updateResume,
				experiences,
				handleResumeChange,
				addExperience,
				handleExperienceSubmit,
				removeExperience,
				...resume,
			}}
		>
			{children}
		</resumeContext.Provider>
	);
};
