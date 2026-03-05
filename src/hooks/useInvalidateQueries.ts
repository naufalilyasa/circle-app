import { useQueryClient } from "@tanstack/react-query";

export default function useInvalidateQueries(queryKeys?: string[][]) {
    const queryClient = useQueryClient();

    return () => {
        if (!queryKeys) return;
        queryKeys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: key });
        });
    };
}
