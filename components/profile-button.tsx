"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

const ProfileButton = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <p className="text-lg text-white capitalize">
        {user?.firstName} {user?.lastName}
      </p>
    </div>
  );
};

export default ProfileButton;
