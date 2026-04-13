import { postApi, postQueryKeys } from "@entities/post";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function usePostQuery(id: string) {
  return useQuery({
    queryKey: postQueryKeys.post(id),
    queryFn: () => postApi.getPost(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
}

export function isNotFoundError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 404;
}
