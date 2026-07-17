import type { Client, Testimonial } from "@/types";

export const clients: Client[] = [
  { name: "High Rise", logo: "/images/clients/high-rise.png" },
  {
    name: "Aqsa Al-Shamal Roastery",
    logo: "/images/clients/aqsa-alshamal.png",
  },
  { name: "Calfis", logo: "/images/clients/calfis.png" },
  { name: "Lahmat Al-Chef", logo: "/images/clients/lahmat-alchef.png" },
  {
    name: "Spark Marketing",
    logo: "/images/clients/spark-marketing.png",
    slug: "campaign-posters",
  },
  { name: "Cinnabon Factory", logo: "/images/clients/cinnabon-factory.png" },
  { name: "Ba", logo: "/images/clients/ba-mark.png" },
  {
    name: "DAL Coffee Roasters",
    logo: "/images/clients/dal-coffee-roasters.png",
    slug: "dal-coffee-roasters",
  },
  { name: "Bi", logo: "/images/clients/bi-mark.png" },
  {
    name: "Aljamal Al-Munfarid",
    logo: "/images/clients/aljamal-almunfarid.png",
  },
  {
    name: "ARC Rehabilitation Center",
    logo: "/images/clients/arc.png",
    slug: "campaign-posters",
  },
  {
    name: "Fiore Cafe",
    logo: "/images/clients/fiore-cafe.png",
    slug: "fiore-cafe",
  },
  { name: "Rusht Cup", logo: "/images/clients/rusht-cup.png" },
  { name: "Mandolin", logo: "/images/clients/mandolin.png" },
  { name: "Lano", logo: "/images/clients/lano.png" },
];

/**
 * No real client testimonials have been collected yet, so this stays
 * empty rather than fabricating quotes attributed to real businesses.
 * TestimonialsSection renders nothing when this is empty — add entries
 * here (quote, author, role, optional 1-5 rating) once real feedback
 * comes in and the section will pick them up automatically.
 */
export const testimonials: Testimonial[] = [];
