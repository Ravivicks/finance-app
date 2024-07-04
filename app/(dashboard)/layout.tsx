import Header from "@/components/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <main>
        <Header />
        <div className="px-10 py-8">{children}</div>
      </main>
    </>
  );
};

export default DashboardLayout;
