"use client";

import { useEffect, useState } from "react";
import { fetchMilestones, type Milestone } from "@/lib/api";
import { MilestoneForm } from "@/components/milestone-form";
import { MilestoneList } from "@/components/milestone-list";

export default function Home() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadMilestones = async () => {
    try {
      setIsLoading(true);
      setLoadError(null);
      const data = await fetchMilestones();
      setMilestones(data);
    } catch {
      setLoadError("Could not load milestones. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
      <MilestoneForm onCreated={loadMilestones} />
      <MilestoneList
        milestones={milestones}
        isLoading={isLoading}
        loadError={loadError}
      />
    </main>
  );
}
