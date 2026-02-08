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
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with this meal
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
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
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.handleChange(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || field.state.value)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {field.state.value > 0 &&
                      `${field.state.value} star${field.state.value > 1 ? "s" : ""}`}
                  </span>
                </div>
                {field.state.meta.errors && (
                  <p className="text-sm text-red-500">
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
              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Share your thoughts about this meal..."
                  rows={4}
                  className="resize-none"
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {field.state.value.length} characters
                </p>
              </div>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
