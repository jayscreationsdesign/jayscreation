export interface Theme {
  id: string;
  label: string;
  color: string;
}

export const ALL_THEMES: Theme[] = [
  { id: "mariage", label: "Mariage", color: "#F8E7E7" },
  { id: "bapteme", label: "Baptême", color: "#E7EEF8" },
  { id: "anniversaire", label: "Anniversaire", color: "#F8F3E7" },
  { id: "baby-shower", label: "Baby Shower", color: "#E7F8F0" },
  { id: "ramadan-eid", label: "Ramadan/Eid", color: "#E7EEF8" },
  { id: "communion", label: "Communion", color: "#E7EEF8" },
  { id: "naissance", label: "Naissance", color: "#E7EEF8" },
  { id: "noel", label: "Noël", color: "#E7EEF8" },
] as const;
