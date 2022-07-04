import React, { useCallback, useContext, useState } from "react";
import { observer } from "mobx-react";
import { EntitiesContext } from "../../index";
import { useModal } from "react-hooks-use-modal";
import { DragSourceMonitor, useDrag, useDrop } from "react-dnd";
import {
  attributesContainerStyle, attributesRowStyle, entityBaseStyle,
  entityButtonStyle, entityContainerStyle, modalStyle,
} from "./style";
import { AttributeInterface, SelectOptionInterface } from "../../shared/interfaces";
import { EntityProps, ItemTypes } from "../../shared/types";
import { AttributeTypesEnum } from "../../shared/enums";

export const EntityCanvas = observer(() => {
  const entityStore = useContext(EntitiesContext);
  const [entities, setEntities] = useState(entityStore.entities);

  const moveEntity = useCallback(
    (id: number, left: number, top: number) => {
      let entitiesClone = [...entities];
      const item = entitiesClone.find(item => item.id === id);
      if (item) {
        item.x = left;
        item.y = top;
      }
      setEntities(entitiesClone);
    },
    [entities],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ENTITY,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number
          y: number
        };

        // @ts-ignore
        let left = Math.round(item.x + delta.x);
        // @ts-ignore
        let top = Math.round(item.y + delta.y);

        // @ts-ignore
        moveEntity(item.id, left, top);
        return undefined;
      },
    }),
    [],
  );

  const removeEntity = (id: number) => {
    let entitiesClone = [...entities];
    entitiesClone = entitiesClone.filter(entity => entity.id !== id);
    setEntities(entitiesClone);
  };

  return (
    <div ref={drop} style={{ width: "100%", height: "100%" }}>
      {entities.map((entity) => (
        <Entity entity={entity} key={entity.id} removeEntity={() => removeEntity(entity.id)} />
      ))}
    </div>
  );
});


const Entity = observer((props: EntityProps) => {
  const { id, x, y, width, height, name } = props.entity;

  const [{ isDragging }, drag] = useDrag(() => ({
      item: props.entity,
      type: ItemTypes.ENTITY,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, x, y],
  );

  // New Attribute state initialization
  const [newAttribute, setNewAttribute] = useState<AttributeInterface>({
    id: -1,
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
    setNewAttribute({
      ...newAttribute,
      [name]: value,
    });
  };

  // Adding a new attribute to the entity
  const addNewAttribute = async () => {
    // Clone attributes array
    const attributesClone = [...attributes];

    // Check if new attribute exists
    const index = attributesClone.findIndex(item => item.name === newAttribute.name);


    // Add the new attribute if it doesn't already exist
    if (index === -1) {
      newAttribute.id = attributes.length + 1; // incrementing attribute ids
      attributesClone.push(newAttribute);
    }

    // Set new Array
    setAttributes(attributesClone);

    // Clear input and return new attribute to default state
    setNewAttribute({
      id: -1,
      name: "",
      type: AttributeTypesEnum.string,
    });

    // Close modal
    await close();
  };

  // Removing an attribute from the entity
  const removeAttribute = async (id: number) => {
    // Clone attributes array
    let attributesClone = [...attributes];

    // Return the attributes except the deleted one
    attributesClone = attributesClone.filter(item => item.id !== id);

    // Set new Array
    setAttributes(attributesClone);
  };

  return <div key={`Entity: ${name}-${id}`} ref={drag} style={Object.assign({}, entityContainerStyle, {
    left: x,
    top: y,
    width,
    height,
    opacity: isDragging ? 0.5 : 1,
    cursor: "move",
  })}>
    <div>
      <div style={entityBaseStyle}>
        <div style={{
          borderBottom: "1px solid cornflowerblue",
        }}>
          {name}
        </div>
        <div style={attributesContainerStyle}>
          {
            attributes.map((attribute) => (
              <div key={`Attribute: ${attribute.name}-${attribute.id}`}>
                <div style={attributesRowStyle}>
                  <span>{attribute.name}</span>
                  <span>{attribute.type}</span>
                </div>
                <button onClick={() => removeAttribute(attribute.id)}>-</button>
              </div>
            ))
          }
        </div>
      </div>
      <button style={entityButtonStyle} onClick={open}>Add Attribute</button>
      <button style={entityButtonStyle} onClick={() => props.removeEntity(id)}>Remove Entity</button>
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
  </div>;
});