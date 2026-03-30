import { useState } from "react";
import { ApiError, createMilestone, type MilestoneCategory } from "@/lib/api";

const categories: MilestoneCategory[] = ["Work", "Personal", "Health"];

type MilestoneFormProps = {
  onCreated: () => Promise<void>;
};

export function MilestoneForm({ onCreated }: MilestoneFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<MilestoneCategory>("Work");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);

    try {
      await createMilestone({ title, category });
      setTitle("");
      setCategory("Work");
      setSubmitSuccess("Milestone saved.");
      await onCreated();
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setSubmitError(
          "Please enter a title with at least 3 characters before submitting."
        );
      } else if (error instanceof ApiError && error.status >= 500) {
        setSubmitError(
          "The server is having trouble right now. Please try again shortly."
        );
      } else {
        setSubmitError("Something went wrong while saving. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Add Milestone</h2>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            placeholder="e.g., Finished portfolio redesign"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            minLength={3}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as MilestoneCategory)
            }
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        {submitSuccess && (
          <p className="text-sm text-emerald-600">{submitSuccess}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
      </form>
    </section>
  );
}
