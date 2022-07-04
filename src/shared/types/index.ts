import { Entity as EntityData } from "../../stores/entitystore";

const ItemTypes = {
  ENTITY: "entity",
};

type EntityProps = {
  entity: EntityData;
  removeEntity: (id: number) => void;
};

export {
  ItemTypes,
  EntityProps,
};
