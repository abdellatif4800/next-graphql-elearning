'use client'
import { useState } from "react";
import { useDispatch } from "@repo/reduxSetup";
import { addTutorialNode } from "@repo/reduxSetup";
import { getTutorials, useQuery } from "@repo/gql";


export function TutorialDropdown() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { data: tutorials = [], isLoading } = useQuery({
    queryKey: ['tutorials', query],
    queryFn: () => getTutorials({ tutorialName: query, publish: true }),
    keepPreviousData: true,
  });

  const handleSelect = (tutorialId: string) => {
    const tutorial = tutorials.find(t => t.id === tutorialId);
    if (!tutorial) return;

    dispatch(addTutorialNode({
      tutorial,
      position: { x: 200, y: 200 },
    }));
    setQuery(""); // clear input
    setOpen(false); // close dropdown
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search tutorials..."
        className="w-full p-2 rounded border border-surface-800 bg-surface-800 text-text-primary"
      />

      {open && (
        <ul className="absolute w-full max-h-40 overflow-y-auto border border-surface-700 bg-surface-900 rounded mt-1 z-50 shadow-lg">
          {isLoading && <li className="p-2 text-xs text-text-secondary">Loading...</li>}
          {!isLoading && tutorials.length === 0 && (
            <li className="p-2 text-xs text-text-secondary">No tutorials found</li>
          )}
          {!isLoading && tutorials.map(t => (
            <li
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className="p-2 cursor-pointer hover:bg-teal-glow/20"
            >
              {t.tutorialName} ({t.level})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
