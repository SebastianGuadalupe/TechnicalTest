import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./profile.module.css";

export async function getServerSideProps({ query: { userid } }) {
	const res = await fetch(`https://bio.torre.co/api/bios/${userid}`);
	const data = await res.json();

	return { props: { profile: data } };
}

const Profile = ({ profile }) => {
	const { name, location, picture } = profile.person;
	const router = useRouter();
	const skills = profile.strengths;
	const expertSkills = [];
	const proficientSkills = [];
	const noviceSkills = [];
	const interestSkills = [];
	for (const skill of skills) {
		switch (skill.proficiency) {
			case "expert":
				expertSkills.push(skill);
				break;
			case "proficient":
				proficientSkills.push(skill);
				break;
			case "novice":
				noviceSkills.push(skill);
				break;
			case "no-experience-interested":
				interestSkills.push(skill);
				break;
			default:
				break;
		}
	}

	return (
		<div className={styles.container}>
			<Image
				width={300}
				height={300}
				src={picture}
				alt="User's profile image"
				priority
				className={styles.profileImage}
			/>
			<h1>{name}</h1>
			<h4>{location.name}</h4>
			<div className={styles.skillsSection}>
				<h2>Skills</h2>
				{/** Expert Skills */}
				{expertSkills.length > 0 && (
					<div>
						<h4>Expert Skills</h4>
						{expertSkills.map((skill, i) => {
							return (
								<span
									onClick={() => router.push(`/skill/${skill.name}`)}
									className={styles.badge}
									key={i}
								>
									{skill.name}
								</span>
							);
						})}
					</div>
				)}
				{/** Proficient Skills */}
				{proficientSkills.length > 0 && (
					<div>
						<h4>Proficient Skills</h4>
						{proficientSkills.map((skill, i) => {
							return (
								<span
									onClick={() => router.push(`/skill/${skill.name}`)}
									className={styles.badge}
									key={i}
								>
									{skill.name}
								</span>
							);
						})}
					</div>
				)}
				{/** Novice Skills */}
				{noviceSkills.length > 0 && (
					<div>
						<h4>Novice Skills</h4>
						{noviceSkills.map((skill, i) => {
							return (
								<span
									onClick={() => router.push(`/skill/${skill.name}`)}
									className={styles.badge}
									key={i}
								>
									{skill.name}
								</span>
							);
						})}
					</div>
				)}
				{/** Interested Skills */}
				{interestSkills.length > 0 && (
					<div>
						<h4>No experience but interested Skills</h4>
						{interestSkills.map((skill, i) => {
							return (
								<span
									onClick={() => router.push(`/skill/${skill.name}`)}
									className={styles.badge}
									key={i}
								>
									{skill.name}
								</span>
							);
						})}
					</div>
				)}
			</div>
			<button className={styles.homeButton} onClick={() => router.push(`/`)}>
				Home
			</button>
		</div>
	);
};

export default Profile;
