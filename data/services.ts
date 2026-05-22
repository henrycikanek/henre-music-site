export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export const services: Service[] = [
  {
    id: "mix",
    name: "Mix",
    price: 200_00,
    description: "Professional mix with 3 rounds of revisions, delivery in 5-7 days",
    category: "Mixing",
  },
  {
    id: "master",
    name: "Master",
    price: 100_00,
    description: "Professional mastering for streaming and digital distribution, 2 revisions",
    category: "Mastering",
  },
  {
    id: "beat",
    name: "Production",
    price: 300_00,
    description: "Custom beat production with 3 rounds of revisions, delivery in 10-14 days",
    category: "Production",
  },
  {
    id: "vocal-engineering",
    name: "Vocal Engineering",
    price: 100_00,
    description: "Professional vocal recording and engineering (LA locals only)",
    category: "Vocal Engineering",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}
