import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import { ResumeProvider } from "@/context/resume-context";
import { ClerkProvider } from "@clerk/nextjs";
const poppins = Poppins({
	weight: ["400", "500", "700", "800", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Resume AI",
	description: "Create stunning resume without any hassle",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light">
			<body className={`${poppins.className} antialiased`}>
				<ClerkProvider>
					<ResumeProvider>
						<Navbar />
						{children}
					</ResumeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
