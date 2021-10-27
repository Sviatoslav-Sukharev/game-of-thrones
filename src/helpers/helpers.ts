import { IBook, ICharacter, IHouse } from "../types/types";

export function getIndexFromUrl(url: string): string {
  const splitedUrl = url.split("/");
  return splitedUrl[splitedUrl.length - 1];
}

export function isInList(url: string, list: any[]): boolean {
  return !!list.find((item: IBook | ICharacter | IHouse) => item.url === url);
}