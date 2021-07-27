import { useCallback, useEffect, useState, useRef } from "react";

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (
			url,
			params = {
				method: "GET",
				body: null,
				headers: {},
			}
		) => {
			setIsLoading(true);

			// If user leaves page while loading something, handle it with this
			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);

			try {
				const res = await fetch(url, { ...params, signal: httpAbortCtrl.signal });
				const data = await res.json();
				if (!res.ok) throw new Error(data.message);
				activeHttpRequests.current = activeHttpRequests.current.filter(
					c => c !== httpAbortCtrl
				);
				setIsLoading(false);
				return data;
			} catch (err) {
				setIsLoading(false);
				setError(err.message);
				throw err.message;
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach(c => c.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};
