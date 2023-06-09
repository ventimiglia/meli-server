import type {
  AvailableFilter,
  Filter,
  RawDescription,
  RawItem,
  RawItems,
} from "../@types";
import { AUTHOR } from "../utils/constants";
import {
  parseCategoriesByFilters,
  parseCategoriesByAvailableFilters,
  parseItem,
  parseItems,
} from "../utils/items";
import { Request, Response } from "express";

export const getItemsBySearch = async (req: Request, res: Response) => {
  try {
    const apiResponse = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`
    );

    if (!apiResponse.ok) {
      res.status(404).send({ error: "Not found" });
      return;
    }

    const rawItems: RawItems = await apiResponse.json();

    const rawCategoriesByFilters = rawItems?.filters?.find(
      (filter: Filter) => filter.id === "category"
    );

    const rawCategoriesByAvailableFilters = rawItems?.available_filters?.find(
      (filter: AvailableFilter) => filter.id === "category"
    );

    const formattedCategoriesByFilters = parseCategoriesByFilters(
      rawCategoriesByFilters
    );
    const formattedCategoriesByAvailableFilters =
      parseCategoriesByAvailableFilters(rawCategoriesByAvailableFilters);

    const formattedCategories = formattedCategoriesByFilters || formattedCategoriesByAvailableFilters;

    const formattedItems = parseItems(rawItems.results);

    const data = {
      author: AUTHOR,
      categories: formattedCategories,
      items: formattedItems,
    };
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const apiResponse = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    const apiDescriptionResponse = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}/description`
    );

    if (!apiResponse.ok || !apiDescriptionResponse.ok) {
      res.status(404).send({ error: "Not found" });
      return;
    }

    const rawItem: RawItem = await apiResponse.json();
    const rawDescription: RawDescription = await apiDescriptionResponse.json();
    const data = {
      author: AUTHOR,
      item: parseItem({
        item: rawItem,
        description: rawDescription.plain_text,
      }),
    };
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
