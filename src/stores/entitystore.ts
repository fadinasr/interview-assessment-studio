import { observable, action, computed, autorun, makeObservable } from "mobx";
import { EntityObject } from "../shared/types";
import { AttributeInterface, CoordInterface, EntityInterface } from "../shared/interfaces";

const hasLocalStorage = typeof window !== "undefined" && window.localStorage;

let entitiesJSON = require("../../static/entities.json");
let coordsJSON = require("../../static/coords.json");

export class Entity {
  id = Math.random();
  name = "Entity";
  width = 150;
  height = 50;
  x = 0;
  y = 0;
  attributes = [];

  constructor(json: EntityObject) {
    makeObservable(this, {
      name: observable,
      x: observable,
      y: observable,
      width: observable,
      height: observable,
      attributes: observable,
      asJson: computed,
    });
    Object.assign(this, json);
  }

  get asJson() {
    const { id, name, x, y, width, height, attributes } = this;
    return { id, name, x, y, width, height, attributes };
  }
}

export class EntityStore {
  entities: Entity[] = [];

  constructor() {
    makeObservable(this, {
      entities: observable,
      loadJson: action,
      addEntity: action,
      loadMockData: action,
      loadFromLocalStorage: action,
      setEntities: action,
      asJson: computed,
    });
    autorun(this.saveToLocalStorageReaction, { delay: 200 });
  }

  loadJson(json: EntityObject[]) {
    this.entities = json.map((entityData) => new Entity(entityData));
  }

  // Load from mock data services
  loadMockData() {
    this.loadJson(
      entitiesJSON.map(
        (entity: EntityInterface) => ({ ...entity, ...coordsJSON.find((coord: CoordInterface) => coord.id === entity.id) }),
      ),
    );
  }

  // Add a new entry
  addEntity(name: string, x: number, y: number, width?: number, height?: number, attributes?: AttributeInterface[]) {
    this.entities.push(
      new Entity({
        name,
        x,
        y,
        width: width || 150,
        height: height || 50,
        attributes: attributes || [],
      }),
    );
  }

  // Entities Setter
  setEntities = (entities: Entity[]) => {
    this.entities = entities;
  };

  saveToLocalStorageReaction = () => {
    if (hasLocalStorage) {
      window.localStorage.setItem(
        "domain-model-app",
        JSON.stringify(this.asJson),
      );
    }
  };

  loadFromLocalStorage() {
    const data =
      hasLocalStorage && window.localStorage.getItem("domain-model-app");
    if (data) {
      this.loadJson(JSON.parse(data));
    } else {
      this.loadJson([]);
    }
  }

  get asJson() {
    return this.entities.map((e) => e.asJson);
  }
}
