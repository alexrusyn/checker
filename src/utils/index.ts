import { Coords, Grid, GridId } from "../domain/interfaces";

export const getRandomInRange = (min: number = 0, max: number = 1) =>
  Math.floor(Math.random() * max) + min;

export const getCoordFromId = (id: GridId) => {
  const [x, y] = convertGridIdToGridIndexes(id);
  return { x, y };
};

export const getIdFromCoords = (coords: Coords) =>
  `${Grid[coords.x]}${coords.y}` as GridId;

export const convertGridIdToGridIndexes = (gridId: GridId) => {
  const [letter, index] = gridId.split("") as [Grid, string];
  return [Number(Grid[letter]), Number(index)];
};

export const getConcatStrings = (a: string, b: string) =>
  a && b ? `${a}${b}` : null;
