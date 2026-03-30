export type MilestoneCategory = "Work" | "Personal" | "Health";

export type Milestone = {
  id: number;
  title: string;
  category: MilestoneCategory;
  created_at: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

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

export async function createMilestone(payload: {
  title: string;
  category: MilestoneCategory;
}): Promise<Milestone> {
  const response = await fetch(`${API_BASE_URL}/milestones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      | { detail?: string }
      | null;
    const message = body?.detail ?? "Failed to save milestone.";
    throw new ApiError(message, response.status);
  }

  return response.json();
}
