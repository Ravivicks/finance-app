import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscribed = () => {
  const query = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await client.api.customers.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
