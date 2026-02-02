"use client"

import { useQuery } from "@apollo/client/react";
import { GET_TUTORIALS_LIST } from "@repo/gql";
import TutorialsFilter from "./TutorialsFilter";
import TutorialsList from "./TutorialsList";
import TutorialsHeader from "./TutorialsHeader";
import { useEffect, useState } from "react";

export default function TutorialsPage() {
  const { data, refetch, loading, error } = useQuery(GET_TUTORIALS_LIST, {
    variables: { Filters: {} },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  });

  const [loadedTutorials, setLoadedTutorials] = useState(data?.tutorialList || [])

  const ITEMS_PER_BATCH = 8;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);

  const visibleTutorials = loadedTutorials.slice(0, visibleCount);
  const hasMoreItems = visibleCount < loadedTutorials.length;
  const tutorialsLength = loadedTutorials.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
  };

  const handleLoadFilterdData = async (filterFields: any) => {
    const filterdData = await refetch({
      Filters: filterFields,
    })
    console.log("filtered", filterdData)

    setLoadedTutorials(filterdData.data?.tutorialList)
  }

  useEffect(() => {
    if (data?.tutorialList) {
      setLoadedTutorials(data.tutorialList);
      setVisibleCount(ITEMS_PER_BATCH); // reset pagination on filter change
    }
    console.log(loadedTutorials)
  }, [data]);

  // render loading
  // if (loading && !data) {
  //   return (
  //     <div className="flex-1 h-full w-full bg-surface-950 border border-surface-800 flex flex-col items-center justify-center font-terminal text-teal-glow p-4">
  //       <div className="text-xl font-bold animate-pulse">ESTABLISHING_UPLINK...</div>
  //       <div className="text-xs text-secondary mt-2"> decrypting_packets [////////////////////]</div>
  //     </div>
  //   );
  // }

  // render error
  // if (error) {
  //   return (
  //     <div className="flex-1 h-full w-full bg-surface-950 border border-surface-800 flex flex-col items-center justify-center font-terminal text-red-500 p-4">
  //       <div className="text-xl font-bold">CONNECTION_FAILURE</div>
  //       <div className="text-xs mt-2 border border-red-900 p-2 bg-red-950/20">Error: {error.message}</div>
  //     </div>
  //   );
  // }


  return (
    <div className="h-full w-full bg-surface-950 font-terminal text-primary flex flex-col lg:flex-row overflow-hidden gap-6 p-4">

      <TutorialsFilter loadFilterdData={handleLoadFilterdData} />

      <div className="flex-1 flex flex-col border border-surface-800 overflow-hidden bg-surface-950 relative transition-colors duration-300 w-full shadow-[4px_4px_0px_var(--surface-800)] ">


        <TutorialsHeader
          hasMore={hasMoreItems}
          loadMore={handleLoadMore}
          tutorialsLength={tutorialsLength}
        />
        {/* Grid Section */}


        <TutorialsList tutorials={visibleTutorials} />
      </div>
    </div>
  )
}

