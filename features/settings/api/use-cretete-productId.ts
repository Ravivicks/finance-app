import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.checkout.$post>;
type RequestType = InferRequestType<typeof client.api.checkout.$post>["json"];

export const useCreateProductId = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.checkout.$post({ json });
      return await response.json();
    },
    onError: () => {
      toast.error("Failed to Upgrade an account");
    },
  });
  return mutation;
};
