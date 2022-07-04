import { AttributeTypesEnum } from "../enums";

interface AttributeInterface {
  id: number;
  name: string;
  type: string;
}

interface SelectOptionInterface {
  title: AttributeTypesEnum;
  value: string;
  selected?: boolean;
}

export {
  AttributeInterface,
  SelectOptionInterface,
};
