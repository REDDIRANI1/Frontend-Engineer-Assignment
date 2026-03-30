import type { Milestone } from "@/lib/api";

type MilestoneListProps = {
  milestones: Milestone[];
  isLoading: boolean;
  loadError: string | null;
};

export function MilestoneList({
  milestones,
  isLoading,
  loadError,
}: MilestoneListProps) {
  return (
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
              <p className="mt-1 text-xs text-slate-600">{milestone.category}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
