import React from "react";
import { insertPlansSchema } from "@/db/schema";
import { z } from "zod";
import { useNewUpgrade } from "../hooks/use-new-upgrade";
import { useCreateProductId } from "../api/use-cretete-productId";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FaCircleCheck } from "react-icons/fa6";
import { useGetSubscribed } from "../api/use-get-payment";

const formSchema = insertPlansSchema.pick({
  productId: true,
});

type FormValues = z.input<typeof formSchema>;

const NewUpgradePopup = () => {
  const { isOpen, onClose } = useNewUpgrade();

  const mutation = useCreateProductId();
  const subscribedQuery = useGetSubscribed();
  const subscriberData = subscribedQuery.data || [];
  const isSubscribed = subscriberData?.[0]?.status || false;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        window.open(data.checkoutUrl);
        onClose();
      },
    });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center flex-col gap-4">
              <Image
                src="/logo-black.svg"
                alt="Logo"
                height={60}
                width={60}
                color="#000"
              />
              <DialogTitle className="text-xl">
                {isSubscribed
                  ? "Cancel subscription"
                  : "Upgrade to a paid plan"}
              </DialogTitle>
              <DialogDescription>
                {isSubscribed
                  ? "Are you sure to loose the below features"
                  : "Upgrade to a paid plan to unlock more features"}
              </DialogDescription>
            </div>
          </DialogHeader>
          <Separator />
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <FaCircleCheck className="text-blue-500 text-lg self-center" />{" "}
              <span className="text-base text-muted-foreground">
                Bank account syncing
              </span>
            </div>
            <div className="flex gap-2">
              <FaCircleCheck className="text-blue-500 text-lg self-center" />{" "}
              <span className="text-base text-muted-foreground">
                Upload CSV files
              </span>
            </div>
            <div className="flex gap-2">
              <FaCircleCheck className="text-blue-500 text-lg self-center" />{" "}
              <span className="text-base text-muted-foreground">
                Different chart types
              </span>
            </div>
          </div>
          <DialogFooter className="pt-2">
            <Button
              className="w-full bg-blue-500 mt-6"
              onClick={
                isSubscribed ? () => {} : () => onSubmit({ productId: 439510 })
              }
            >
              {isSubscribed ? "Cancel subscription" : "Upgrade"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewUpgradePopup;
