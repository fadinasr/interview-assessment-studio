import { AttributeTypesEnum } from "../enums";

interface CoordInterface {
  id: number;
  x: number;
  y: number;
}

interface AttributeInterface {
  id: number;
  name: string;
  type: string;
}

interface EntityInterface {
  id: number;
  name: string;
  width?: number;
  height?: number;
  attributes?: AttributeInterface[];
}

interface SelectOptionInterface {
  title: AttributeTypesEnum;
  value: string;
  selected?: boolean;
}

export {
  EntityInterface,
  CoordInterface,
  AttributeInterface,
  SelectOptionInterface,
};
