import { Entity as EntityData } from "../../stores/entitystore";
import { AttributeInterface } from "../interfaces";

type EntityObject = {
  id?: number;
  name: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  attributes?: AttributeInterface[];
};

const ItemTypes = {
  ENTITY: "entity",
};

type EntityProps = {
  entity: EntityData;
  removeEntity: (id: number) => void;
  saveEntityAttributes: (id: number, attributes: AttributeInterface[]) => void;
};

export {
  EntityObject,
  ItemTypes,
  EntityProps,
};
