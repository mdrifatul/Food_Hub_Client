"use client";

import { createReview } from "@/action/review.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mealId: string;
}

export function ReviewDialog({
  open,
  onOpenChange,
  mealId,
}: ReviewDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  console.log("ReviewDialog rendered", { open, mealId });

  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        const reviewData = {
          mealId: mealId,
          rating: value.rating,
          comment: value.comment,
        };

        const result = await createReview(reviewData);
        if (result?.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Review submitted successfully!");
        onOpenChange(false);
        form.reset();
      } catch (error) {
        toast.error("Failed to submit review");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950/95 border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl rounded-2xl p-0 overflow-hidden backdrop-blur-xl">
        <div className="bg-linear-to-r from-orange-500/10 to-transparent p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Write a Review
            </DialogTitle>
            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
              Share your experience with this meal
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="p-6 space-y-6"
        >
          <form.Field
            name="rating"
            validators={{
              onChange: ({ value }) => {
                if (value === 0) return "Please select a rating";
                if (value < 1 || value > 5)
                  return "Rating must be between 1 and 5";
                return undefined;
              },
            }}
            children={(field) => (
              <div className="space-y-3">
                <Label className="text-base font-semibold">Rating</Label>
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-3 rounded-xl w-fit">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.handleChange(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-all hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || field.state.value)
                            ? "fill-orange-500 text-orange-500"
                            : "text-zinc-300 dark:text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-sm font-medium text-orange-600 dark:text-orange-400">
                    {field.state.value > 0 &&
                      `${field.state.value} star${field.state.value > 1 ? "s" : ""}`}
                  </span>
                </div>
                {field.state.meta.errors && (
                  <p className="text-sm text-red-500 font-medium">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          />

          <form.Field
            name="comment"
            validators={{
              onChange: ({ value }) => {
                if (!value || value.trim().length === 0)
                  return "Comment is required";
                if (value.length < 10)
                  return "Comment must be at least 10 characters";
                return undefined;
              },
            }}
            children={(field) => (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="comment" className="text-base font-semibold">
                    Comment
                  </Label>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {field.state.value.length} characters
                  </span>
                </div>
                <Textarea
                  id="comment"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Share your thoughts about this meal..."
                  rows={4}
                  className="resize-none bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 focus-visible:shadow-orange-500/20 rounded-xl p-4 transition-all"
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-red-500 font-medium">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          />

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="rounded-xl border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 mr-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
