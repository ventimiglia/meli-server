export type RawItems = {
  results: Result[];
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
};

export type RawDescription = {
  plain_text: string;
}


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