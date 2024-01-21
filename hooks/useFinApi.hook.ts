    import { useMutation, UseMutationOptions } from "@tanstack/react-query";

    export const useFinApi = (options?: UseMutationOptions<AxiosResponse>) => {
    return useMutation({
        mutationFn: (value: string) => {
        console.log("🚀 ~ value:", value);
        const payload = {
            model: "gpt-3.5-turbo",
            prompt: {
            contentType: "text",
            content: value,
            },
            max_tokens: 100,
            temperature: 0,
        };

        return fetch(
            "https://openaifirstgaben.azurewebsites.net/api/financeAPI",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
            body: JSON.stringify(payload),
            }
        ).then((res) => res.text());
        },
        ...options,
    });
    };
