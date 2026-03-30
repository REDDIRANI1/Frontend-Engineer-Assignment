export type MilestoneCategory = "Work" | "Personal" | "Health";

export type Milestone = {
  id: number;
  title: string;
  category: MilestoneCategory;
  created_at: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function fetchMilestones(): Promise<Milestone[]> {
  const response = await fetch(`${API_BASE_URL}/milestones`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load milestones right now.");
  }

  return response.json();
}
