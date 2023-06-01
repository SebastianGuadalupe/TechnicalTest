import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
	const [inputValue, setInputValue] = useState("");
	const [inputError, setInputError] = useState(null);
	const router = useRouter();

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	function handleSubmit(event) {
		event.preventDefault();
		if (inputValue.length >= 5) {
			router.push(`/profile/${inputValue}`);
		} else {
			setInputError("Input must be at least 5 characters");
		}
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>User search</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className={styles.input}
						value={inputValue}
						onChange={handleChange}
						placeholder="username"
					/>
					<input type="submit" className={styles.searchButton} value="Find" />
				</form>
				{inputError && <div className={styles.errorText}>{inputError}</div>}
			</main>
		</div>
	);
}
