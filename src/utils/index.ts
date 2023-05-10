import { Coords, Grid, GridId, Axis } from "../domain/interfaces";

export const compareCoords = (coordsA: Coords, coordsB: Coords) =>
  coordsA.x === coordsB.x && coordsA.y === coordsB.y;

export const getIdFromCoords = (coords: Coords) =>
  `${Grid[coords.x]}${coords.y}` as GridId;

export const convertGridIdToGridIndexes = (gridId: GridId) => {
  const [letter, index] = gridId.split("") as [Grid, string];
  return [Number(Grid[letter]), Number(index)];
};

export const getConcatStrings = (a: string, b: string) =>
  a && b ? `${a}${b}` : null;
