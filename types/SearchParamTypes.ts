type Params = {
  id: string;
};

type SearchParams = {
  name: string;
  image: string;
  unit_amount: number | null;
  id: string;
  description: string | null;
  features: string;
  price: number | null;
};

type AppParams = {
  userId: string;
};
type ScanParams = {
  id: string;
};

export type SearchParamTypes = {
  params: Params;
  searchParams: SearchParams;
};

export type AppParamTypes = {
  params: Params;
  searchParams: AppParams;
};

export type ScanParamTypes = {
  params: Params;
  searchParams: ScanParams;
};
