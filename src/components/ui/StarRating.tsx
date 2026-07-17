import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
}

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div
      className={className}
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: max }).map((_, index) => (
          <Star
            key={index}
            size={16}
            strokeWidth={1.5}
            className={
              index < rating ? "fill-accent text-accent" : "text-border"
            }
          />
        ))}
      </div>
    </div>
  );
}
