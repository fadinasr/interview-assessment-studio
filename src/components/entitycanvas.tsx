import React, { useContext, useState } from "react";
import { observer } from "mobx-react";
import { Entity as EntityData, EntityStore } from "../stores/entitystore";
import { EntitiesContext } from "../index";
import { useModal } from "react-hooks-use-modal";

const entityContainerStyle = {
  position: "absolute" as const,
};

const entityBaseStyle = {
  border: "1px solid cornflowerblue",
  borderRadius: 4,
  padding: 5,
  marginBottom: 5,
};

const attributesContainerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  paddingTop: 5,
};

const attributesRowStyle = { display: "flex", flexDirection: "row" as const, justifyContent: "space-between" };

const entityButtonStyle = {
  background: "cornflowerblue",
  borderRadius: 4,
  borderWidth: 0,
  textAlign: "center" as const,
  padding: 5,
};

const modalStyle = {
  background: "#fff",
  width: "50rem",
  height: "20rem",
  padding: 20,
  borderRadius: 20,
};

export const EntityCanvas = observer(() => {
  const entityStore = useContext(EntitiesContext);

  return (
    <div>
      {entityStore.entities.map((entity) => (
        <Entity entity={entity} key={entity.id} />
      ))}
    </div>
  );
});

type EntityProps = {
  entity: EntityData;
};

interface AttributeInterface {
  name: string;
  type: string;
}

enum AttributeTypesEnum {
  "string" = "String",
  "integer" = "Integer",
  "binary" = "Binary",
  "boolean" = "Boolean",
  "long" = "Long",
  "date" = "Date",
}

interface SelectOptionInterface {
  title: AttributeTypesEnum;
  value: string;
  selected?: boolean;
}

const Entity = observer((props: EntityProps) => {
  // New Attribute state initialization
  const [newAttribute, setNewAttribute] = useState<AttributeInterface>({
    name: "",
    type: AttributeTypesEnum.string,
  });
  // List of Attributes state initialization
  const [attributes, setAttributes] = useState<AttributeInterface[]>([]);

  // Modal with open and close actions from a hook
  const [Modal, open, close] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true, // Close modal wherever you click outside of it
  });

  // Creating an options array from the enum
  const SelectOptions: SelectOptionInterface[] = Object.entries(AttributeTypesEnum).map(([key, value]) => ({
    title: value,
    value: key,
  }));

  // Dynamic on change handler for the input and the select in adding a new attribute
  // @ts-ignore
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // @ts-ignore
    setNewAttribute({
      ...newAttribute,
      [name]: value,
    });
  };

  // Adding a new attribute to the entity
  const addNewAttribute = async () => {
    // Clone attributes array
    const newArray = [...attributes];

    // Check if new attribute exists
    const index = newArray.findIndex(item => item.name == newAttribute.name);

    // Add the new attribute if it doesn't already exist
    if (index) {
      newArray.push(newAttribute);
    }

    // Set new Array
    setAttributes(newArray);

    // Clear input and return new attribute to default state
    setNewAttribute({
      name: "",
      type: AttributeTypesEnum.string,
    });

    // Close modal
    await close();
  };

  return <>
    <div style={Object.assign({}, entityContainerStyle, {
      left: props.entity.y,
      top: props.entity.x,
      width: props.entity.width,
      height: props.entity.height,
    })}>
      <div style={entityBaseStyle}>
        <div style={{
          borderBottom: "1px solid cornflowerblue",
        }}>
          {props.entity.name}
        </div>
        <div style={attributesContainerStyle}>
          {
            attributes.map(attribute => (<>
              <div key={attribute.name} style={attributesRowStyle}>
                <span>{attribute.name}</span>
                <span>{attribute.type}</span>
              </div>
            </>))
          }
        </div>
      </div>
      <button style={entityButtonStyle} onClick={open}>Add Attribute</button>
    </div>
    <Modal>
      <div style={modalStyle}>
        <h1>Add an Attribute</h1>
        <div>
          <input placeholder="Enter the attribute name!" name="name" value={newAttribute?.name} type="text"
                 onChange={handleOnChange} />
          <select name="type" value={newAttribute?.type} onChange={handleOnChange}>
            {
              SelectOptions.map(option => <option key={option.value} selected={option.selected}
                                                  value={option.value}>{option.title}</option>)
            }
          </select>
        </div>
        <button style={entityButtonStyle} onClick={addNewAttribute}>Add</button>
        <button style={entityButtonStyle} onClick={close}>Close</button>
      </div>
    </Modal>
  </>;
});
