import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import TopNav from '@/components/TopNav/TopNav';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Ramiverse',
	description: 'Explore and upload virtual worlds',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	let menuItemNames: string[] = new Array();
	menuItemNames.push("Public Worlds");
	menuItemNames.push("User Profile");
	menuItemNames.push("Log In");
	menuItemNames.push('Register');

	const bodyClassName: string = inter.className + " min-h-screen flex flex-col"

	return (
		<html lang="en">
			<body className={bodyClassName}>
				<TopNav menuItems={menuItemNames}></TopNav>
				<div className="w-full flex-1">
					{children}
				</div>
				<Footer></Footer>
			</body>
		</html>
	);
};
