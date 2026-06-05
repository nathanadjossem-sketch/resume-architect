export interface CVData {
  personal: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
  };
  profile: string;
  experiences: Array<{ id: string; role: string; company: string; period: string; description: string }>;
  educations: Array<{ id: string; degree: string; school: string; period: string; description?: string }>;
  skills: Array<{ id: string; name: string; level: number }>;
  languages: Array<{ id: string; name: string; level: string }>;
  interests: string[];
}

export interface CVDesign {
  template: string;
  color: string;
  font: "sans" | "serif" | "display" | "mono";
  margins: number;
}

export const emptyCV: CVData = {
  personal: {
    firstName: "Jeanne",
    lastName: "Dupont",
    title: "Designer Produit",
    email: "jeanne.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    website: "jeannedupont.fr",
  },
  profile:
    "Designer produit passionnée avec 6 ans d'expérience dans la conception d'interfaces digitales centrées utilisateur. Spécialisée en design systems et prototypage rapide.",
  experiences: [
    {
      id: crypto.randomUUID(),
      role: "Lead Product Designer",
      company: "Acme Studio",
      period: "2022 — Aujourd'hui",
      description:
        "Direction de la refonte produit, mise en place d'un design system multi-plateforme, encadrement d'une équipe de 3 designers.",
    },
    {
      id: crypto.randomUUID(),
      role: "Product Designer",
      company: "Nova Tech",
      period: "2019 — 2022",
      description:
        "Conception d'écrans pour une application mobile B2C utilisée par 200k utilisateurs. Tests utilisateurs et itérations hebdomadaires.",
    },
  ],
  educations: [
    {
      id: crypto.randomUUID(),
      degree: "Master Design d'Interaction",
      school: "ENSCI Les Ateliers",
      period: "2017 — 2019",
    },
  ],
  skills: [
    { id: crypto.randomUUID(), name: "Figma", level: 5 },
    { id: crypto.randomUUID(), name: "Design System", level: 5 },
    { id: crypto.randomUUID(), name: "Prototypage", level: 4 },
    { id: crypto.randomUUID(), name: "Recherche UX", level: 4 },
  ],
  languages: [
    { id: crypto.randomUUID(), name: "Français", level: "Natif" },
    { id: crypto.randomUUID(), name: "Anglais", level: "Courant" },
    { id: crypto.randomUUID(), name: "Espagnol", level: "Intermédiaire" },
  ],
  interests: ["Photographie", "Randonnée", "Typographie", "Cuisine"],
};
