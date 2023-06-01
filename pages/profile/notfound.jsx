import { useRouter } from "next/router";
import styles from "./profile.module.css";

export default function Error({ error, reset }) {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<h1>Something went wrong!</h1>
			<button
				className={styles.tryAgainButton}
				onClick={() => router.push(`/`)}
			>
				Try again
			</button>
		</div>
	);
}
