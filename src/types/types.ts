export interface IBook {
  name: string;
  numberOfPages: number;
  country: string;
  url: string;
  authors: string[];
  publisher: string;
  characters: string[];
  povCharacters: string[];
  released: string;
}

export interface ICharacter {
  name: string;
  culture: string;
  url: string;
  born: string;
  died: string;
  gender: string;
  titles: string[];
  aliases: string[];
  playedBy: string[];
}

export interface IHouse {
  name: string;
  url: string;
  region: string;
  coatOfArms: string;
  currentLord: string;
  words: string;
  founded: string;
  titles: string[];
  seats: string[];
}