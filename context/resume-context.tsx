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
			education: any;
			skill: any;
		}>
	>;
	experiences: any[];
	educations: any[];
	skills: any[];
	handleResumeChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => void;
	updateResume: () => Promise<void>;
	addExperience: () => void;
	removeExperience: () => void;
	handleExperienceSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	handleExperienceSummaryGenerate: (index: number) => Promise<void>;
	handleEducationSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	handleEducationChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => void;
	addEducation: () => void;
	removeEducation: () => void;
	handleSkillsChange: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => void;
	handleSkillsSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	addSkill: () => void;
	removeSkill: () => void;
	handleDeleteResume: (id: string) => Promise<void>;
}
import {
	deleteResume,
	generateResumeSummary,
	getResumeById,
	saveResumeData,
	updateResumeById,
	updateResumeEducation,
	updateResumeExperience,
	updateResumeSkill,
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
	education: [] as JsonValue,
	skill: [] as JsonValue,
};
export const resumeContext = createContext<Resume | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
	const [resume, setResume] = useState(intialState);
	const pathName = usePathname();
	const [step, setStep] = useState(1);
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const [experiences, setExperiences] = useState<any[]>([]);
	const [skills, setSkills] = useState<any[]>([]);
	const [educations, setEducations] = useState<any[]>([]);

	useEffect(() => {
		const savedResumeData = localStorage.getItem("resume");
		if (savedResumeData) {
			setResume(JSON.parse(savedResumeData));
		}
		// if (pathName.includes("/create")) {
		// 	setResume(intialState);
		// }
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
	// experience stuff

	const handleResumeChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const newExperience = [...experiences];
		const { name, value } = e.target;
		newExperience[index][name] = value;
		console.log(newExperience);
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
	const handleExperienceSummaryGenerate = async (index: number) => {
		const selecetedIndex = experiences[index];
		if (!selecetedIndex || !selecetedIndex.title) {
			toast.error("Please enter a title");
			return;
		}
		try {
			const res = await generateResumeSummary(
				`generate list of duties and responsibilities in bullet list points based on job ${selecetedIndex.title}.`
			);
			if (res.status === "success") {
				const updatedExperiences = experiences.slice();
				console.log(updatedExperiences);
				updatedExperiences[index] = { ...selecetedIndex, summary: res.text };
				setExperiences(updatedExperiences);
				setResume((resume) => ({
					...resume,
					experience: updatedExperiences,
				}));
			}
		} catch (error) {
			toast.error("Error generating experience summary");
		}
	};

	// Education stuff
	useEffect(() => {
		if (resume.education) {
			setEducations(resume.education as any);
		}
	}, [resume]);
	const handleEducationSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await updateResumeEducation(resume, educations);
			if (res?.status === "success") {
				toast.success(res.message);
				setResume(res.data!);
				setStep(5);
			}
		} catch (error) {
			toast.error("Error updating resume education");
		}
	};
	const handleEducationChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const newEducation = [...educations];
		const { name, value } = e.target;
		newEducation[index][name] = value;
		setEducations(newEducation);
	};
	const addEducation = () => {
		const newEducation = {
			year: "",
			degree: "",
			university: "",
		};
		setEducations([...educations, newEducation]);
	};
	const removeEducation = () => {
		if (educations.length === 1) return;
		const RemoveEducation = educations.slice(0, educations.length - 1);
		setEducations(RemoveEducation);
	};
	//skills stuff
	useEffect(() => {
		if (resume.skill) {
			setSkills(resume.skill as any);
		}
	}, [resume]);
	const updateSkills = async (skills: any[]) => {
		const invalidSkills = skills.filter((skill) => !skill.name || !skill.level);
		if (invalidSkills.length > 0) {
			toast.error("Please fill in all the fields");
			return;
		}
		try {
			const res = await updateResumeSkill(resume, skills);
			if (res?.status === "success") {
				toast.success(res.message);
				setResume(res.data!);
				router.push(`/dashboard/resume/download/${res.data?.id}`);
			}
		} catch (error) {
			toast.error("Error updating resume education");
		}
	};
	const handleSkillsChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const newSkill = [...skills];
		const { name, value } = e.target;
		newSkill[index][name] = value;
		setSkills(newSkill);
	};
	const handleSkillsSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateSkills(skills);
	};
	const addSkill = () => {
		const newSkill = {
			name: "",
			level: "",
		};
		setSkills([...skills, newSkill]);
	};
	const removeSkill = () => {
		if (skills.length === 1) return;
		const RemoveSkill = skills.slice(0, skills.length - 1);
		setSkills(RemoveSkill);
	};
	const handleDeleteResume = async (id: string) => {
		try {
			const res = await deleteResume(id);
			if (res.status === "success") {
				toast.success(res.message);
				router.refresh();
			}
		} catch (error) {
			toast.error("Error deleting resume");
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
				handleExperienceSummaryGenerate,
				educations,
				skills,
				addEducation,
				removeEducation,
				handleEducationChange,
				handleEducationSubmit,
				addSkill,
				handleSkillsChange,
				handleSkillsSubmit,
				removeSkill,
				handleDeleteResume,
				...resume,
			}}
		>
			{children}
		</resumeContext.Provider>
	);
};
