"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetSubscribed } from "@/features/settings/api/use-get-payment";
import { useNewUpgrade } from "@/features/settings/hooks/use-new-upgrade";
import React from "react";

const Setting = () => {
  const isBankAccount = false;
  const newProductId = useNewUpgrade();
  const subscribedQuery = useGetSubscribed();
  const subscriberData = subscribedQuery?.data || [];
  const isSubscribed: any = subscriberData[0]?.status || "";

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Setting Page</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          <div className="flex items-start justify-between">
            <p className="font-bold">Bank Account</p>
            <p>
              {isBankAccount
                ? "Bank account connected"
                : "No bank account connected"}
            </p>
            <Button variant="ghost">
              {isBankAccount ? "Disconnected" : "Connect"}
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="flex items-start justify-between">
            <p className="font-bold">Subscription</p>
            <p>
              {isSubscribed === "paid"
                ? "Subscription active"
                : "No subscription active"}
            </p>
            <Button variant="ghost" onClick={newProductId.onOpen}>
              {isSubscribed === "paid" ? "Cancel" : "Upgrade"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;
