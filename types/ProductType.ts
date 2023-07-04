export type ProductType = {
  name: string;
  unit_amount: number | null;
  quantity?: number | 1;
  id: string;
  description: string | null;
  metadata: MetadataType;
};

type MetadataType = {
  features: string;
};
