import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./skill.module.css";

export async function getServerSideProps({ query: { skill } }) {
	const res = await fetch("https://search.torre.co/people/_search", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"skill/role": {
				text: skill,
				proficiency: "expert",
			},
		}),
	});
	const data = await res.json();

	return { props: { profiles: data, skill } };
}

const Skill = ({ profiles, skill }) => {
	const router = useRouter();

	return (
		<div className={styles.container}>
			{profiles.results.length > 0 && (
				<div>
					<h1>Experts in {skill}</h1>
					<div className={styles.profiles}>
						{profiles.results.map((profile, i) => {
							return (
								<div
									className={styles.profileCard}
									key={i}
									onClick={() => router.push(`/profile/${profile.username}`)}
								>
									<Image
										width={150}
										height={150}
										src={profile.picture}
										alt="User profile image"
										className={styles.profileImage}
									/>
									<span className={styles.profileName}>{profile.name}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
			<button className={styles.homeButton} onClick={() => router.push(`/`)}>
				Home
			</button>
		</div>
	);
};

export default Skill;
