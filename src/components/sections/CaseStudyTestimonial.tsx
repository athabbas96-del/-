import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp } from "@/lib/motion";
import type { Testimonial } from "@/types";

interface CaseStudyTestimonialProps {
  testimonial: Testimonial;
}

export function CaseStudyTestimonial({
  testimonial,
}: CaseStudyTestimonialProps) {
  return (
    <Reveal variants={fadeInUp}>
      <figure className="mx-auto max-w-2xl text-center">
        <span
          aria-hidden="true"
          className="text-accent block text-5xl leading-none"
        >
          &ldquo;
        </span>
        <blockquote className="text-foreground mt-2 text-xl leading-snug font-medium sm:text-2xl">
          {testimonial.quote}
        </blockquote>
        <figcaption className="text-muted mt-6 text-sm">
          <span className="text-foreground font-medium">
            {testimonial.author}
          </span>
          {" — "}
          {testimonial.role}
        </figcaption>
      </figure>
    </Reveal>
  );
}
