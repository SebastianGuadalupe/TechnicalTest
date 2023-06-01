import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import styles from "./profile.module.css";

const fetcher = async (url) => {
	const res = await fetch(url);

	if (!res.ok) {
		const error = new Error("An error occurred while fetching the data.");
		// Attach extra info to the error object.
		error.info = res;
		error.status = res.status;
		console.log(error);
		throw error;
	}
	console.log(res);
	return res.json();
};

const Profile = () => {
	const router = useRouter();
	const {
		query: { userid },
	} = router;

	const {
		data,
		error: profileError,
		isLoading,
	} = useSWR(`/profiles/${encodeURIComponent(String(userid))}`, fetcher, {
		onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
			console.log(error);
			// Never retry on 404.
			if (error.status === 404) {
				router.push(`/profile/notfound`);
			}

			// Only retry up to 10 times.
			if (retryCount >= 10) return;

			// Retry after 5 seconds.
			setTimeout(() => revalidate({ retryCount }), 5000);
		},
	});

	if (isLoading) {
		return <div className="loader"></div>;
	}
	if (profileError) {
		return <>Error</>;
	}
	const profile = data.profile;

	const { name, location, picture } = profile.person;
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
								<span className={styles.badge} key={i}>
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
								<span className={styles.badge} key={i}>
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
								<span className={styles.badge} key={i}>
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
								<span className={styles.badge} key={i}>
									{skill.name}
								</span>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
