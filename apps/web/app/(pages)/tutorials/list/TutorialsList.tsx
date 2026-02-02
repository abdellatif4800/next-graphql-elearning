'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_TUTORIALS_LIST } from "@repo/gql";
import TutorialCard from "./TutorialCard";

export default function TutorialsList({ tutorials }: any) {

  useEffect(() => {
    console.log("Data Loaded:", tutorials);
  }, [tutorials]);


  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] z-0 bg-[linear-gradient(rgba(0,0,0,0.1)_50%,transparent_50%)] bg-[length:100%_4px]  " />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 p-4">
        {tutorials.map((tutorial: any) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
    </div>

  )
}
