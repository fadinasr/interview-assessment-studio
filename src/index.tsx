import React, { createContext } from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import { EntityStore } from "./stores/entitystore";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const entityStore = new EntityStore();
entityStore.loadMockData();

export const EntitiesContext = createContext<EntityStore>(entityStore);

ReactDOM.render(
  <EntitiesContext.Provider value={entityStore}>
    <DndProvider debugMode={true} backend={HTML5Backend}>
      <App />
    </DndProvider>
  </EntitiesContext.Provider>,
  document.getElementById("root"),
);
