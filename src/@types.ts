export type RawItems = {
  results: Result[];
  filters: Filter[];
  available_filters: AvailableFilter[];
};

export type Result = {
  category_id: string[];
  id: string;
  title: string;
  catalog_product_id: string;
  thumbnail: string;
  currency_id: string;
  price: number;
  condition: string;
  shipping: Shipping;
  seller_address: SellerAddress;
};

export type RawItem = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  condition: string;
  shipping: Shipping;
  sold_quantity: number;
  pictures: Picture[];
};

export type RawDescription = {
  plain_text: string;
};

export type AvailableFilter = {
  id: string;
  name: string;
  type: string;
  values: AvailableFilterValue[];
};

export type AvailableFilterValue = {
  id: string;
  name: string;
  results: number;
};

type Shipping = {
  free_shipping: boolean;
};

type SellerAddress = {
  state: {
    name: string;
  };
};

type Picture = {
  url: string;
};

export interface Filter {
  id: string;
  name: string;
  values: FilterValue[];
}

export interface FilterValue {
  name: string;
  path_from_root: {
    id: null | string;
    name: string;
  }[];
}
