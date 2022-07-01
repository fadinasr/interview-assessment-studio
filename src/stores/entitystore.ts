import { observable, action, computed, autorun, makeObservable } from "mobx";

const hasLocalStorage = typeof window !== "undefined" && window.localStorage;

let entitiesJSON = require("../../static/entities.json");
let coordsJSON = require("../../static/coords.json");

type EntityObject = {
  id?: number;
  name: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
};

interface EntityInterface {
  id: number;
  name: string;
  width?: number;
  height?: number;
}

interface CoordInterface {
  id: number;
  x: number;
  y: number;
}

export class Entity {
  id = Math.random();
  name = "Entity";
  width = 150;
  height = 50;
  x = 0;
  y = 0;

  constructor(json: EntityObject) {
    makeObservable(this, {
      name: observable,
      x: observable,
      y: observable,
      width: observable,
      height: observable,
      asJson: computed,
    });
    Object.assign(this, json);
  }

  get asJson() {
    const { id, name, x, y, width, height } = this;
    return { id, name, x, y, width, height };
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
      asJson: computed,
    });
    autorun(this.saveToLocalStorageReaction, { delay: 200 });
  }

  loadJson(json: EntityObject[]) {
    this.entities = json.map((entityData) => new Entity(entityData));
  }

  loadMockData() {
    this.loadJson(
      entitiesJSON.map(
        (entity: EntityInterface) => ({ ...entity, ...coordsJSON.find((coord: CoordInterface) => coord.id === entity.id) }),
      ),
    );
  }

  addEntity(name: string, x: number, y: number, width?: number, height?: number) {
    this.entities.push(
      new Entity({
        name,
        x,
        y,
        width: width || 150,
        height: height || 50,
      }),
    );
  }

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
