export enum GameType {
  GENRE = `genre`,
  ARTIST = `artist`,
};

export interface GenreAnswer {
  id: number;
  src: string;
  genre: string;
};

export interface GenreQuestion {
  type: GameType.GENRE;
  genre: string;
  answers: GenreAnswer[]
};

export interface Song {
  artist: string;
  src: string;
};

export interface ArtistAnswer {
  id: string;
  picture: string;
  artist: string;
};

export interface ArtistQuestion {
  type: GameType.ARTIST;
  song: Song;
  answers: ArtistAnswer[]
};

export type Question = ArtistQuestion | GenreQuestion;

export type RenderPlayer = <T>(question: T, index: number) => React.ReactElement;
