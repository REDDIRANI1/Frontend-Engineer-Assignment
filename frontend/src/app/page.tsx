"use client";

import { useEffect, useState } from "react";
import { fetchMilestones, type Milestone } from "@/lib/api";

export default function Home() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadMilestones = async () => {
      try {
        setLoadError(null);
        const data = await fetchMilestones();
        setMilestones(data);
      } catch {
        setLoadError("Could not load milestones. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadMilestones();
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-12 sm:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Personal Milestone Tracker
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Track your achievements and review your progress.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Milestones</h2>

        {isLoading && (
          <p className="mt-4 text-sm text-slate-600">Loading milestones...</p>
        )}

        {loadError && <p className="mt-4 text-sm text-red-600">{loadError}</p>}

        {!isLoading && !loadError && milestones.length === 0 && (
          <p className="mt-4 text-sm text-slate-600">No milestones found.</p>
        )}

        {!isLoading && !loadError && milestones.length > 0 && (
          <ul className="mt-4 space-y-3">
            {milestones.map((milestone) => (
              <li
                key={milestone.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <p className="font-medium text-slate-900">{milestone.title}</p>
                <p className="mt-1 text-xs text-slate-600">
                  {milestone.category}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
