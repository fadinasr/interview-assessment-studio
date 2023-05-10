import React, { useContext } from "react";
import { observer } from "mobx-react";
import { EntityCanvas } from "./entitycanvas";
import { EntitiesContext } from "../index";

export const App = observer(() => {
  const entityStore = useContext(EntitiesContext);

  // Check if the name of the new entity already exists
  const entityNameExists = (name: string) => {
    return entityStore.entities.find(entity => entity.name === name);
  };

  // Add a new entity
  const onAddEntity = () => {
    const entityName = prompt("Name of the new entity", "");
    if (entityName && !entityNameExists(entityName)) {
      entityStore.addEntity(
        entityName,
        Math.random() * 1000,
        Math.random() * 1000,
      );
    }
  };

  // ------------- Start - Dev Only -------------------
  // Save data on Canvas to local Storage (by hand - for testing purposes)
  const onSaveDataToLocalStorage = () => {
    entityStore.saveToLocalStorageReaction();
  };

  // Load data from mock Services
  const onLoadFromLocalStorage = () => {
    entityStore.loadMockData();
  };
  // ------------- End - Dev Only -------------------

  return (
    <div>
      <h1>Domain Model Editor</h1>
      <button onClick={onAddEntity}>Add Entity</button>
      <button onClick={onSaveDataToLocalStorage}>Save to Local Storage</button>
      <button onClick={onLoadFromLocalStorage}>Load from Mock Services</button>
      <EntityCanvas />
    </div>
  );
});
