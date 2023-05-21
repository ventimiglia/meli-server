import type { AvailableFilter, RawItem, Result } from "../@types";

export const parseItems = (items: Result[]) => {
  return items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: getDecimalCount(item.price),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      seller_address: item.seller_address.state.name,
    };
  });
};

export const parseCategories = (categories?: AvailableFilter) => {
  return categories?.values
    .sort((a, b) => b.results - a.results)
    .slice(0, 4)
    .map((category) => category.name);
};

export const parseItem = ({
  item,
  description,
}: {
  item: RawItem;
  description: string;
}) => {
  return !!item ? {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: getDecimalCount(item.price),
    },
    picture: item.pictures[0].url,
    condition: item.condition,
    free_shipping: item?.shipping?.free_shipping,
    sold_quantity: item.sold_quantity,
    description: description,
  } : [];
};

const getDecimalCount = (amount?: number) => {
  const decimalCount = amount?.toString().split(".")[1];
  return decimalCount ? decimalCount.length : 0;
};
