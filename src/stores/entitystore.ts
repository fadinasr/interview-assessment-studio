import {observable, action, computed, autorun, makeObservable} from "mobx";

const hasLocalStorage = typeof window !== "undefined" && window.localStorage;

let entitiesJSON = require('../../static/entities.json');
let coordsJSON = require('../../static/coords.json');

type EntityObject = {
    id?: number;
    name: string;
    x: number;
    y: number;
};

interface EntityInterface {
    id: number;
    name: string;
}

interface CoordInterface {
    id: number;
    x: number;
    y: number;
}

export class Entity {
    id = Math.random();
    name = "Entity";
    x = 0;
    y = 0;

    constructor(json: EntityObject) {
        makeObservable(this, {
            name: observable,
            x: observable,
            y: observable,
            asJson: computed,
        });
        Object.assign(this, json);
    }

    get asJson() {
        const {id, name, x, y} = this;
        return {id, name, x, y};
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
        autorun(this.saveToLocalStorageReaction, {delay: 200});
    }

    loadJson(json: EntityObject[]) {
        this.entities = json.map((entityData) => new Entity(entityData));
    }

    loadMockData() {
        this.loadJson(
            entitiesJSON.map(
                (entity: EntityInterface) => ({...entity, ...coordsJSON.find((coord: CoordInterface) => coord.id === entity.id)})
            )
        );
    }

    addEntity(name: string, x: number, y: number) {
        this.entities.push(
            new Entity({
                name,
                x,
                y,
            })
        );
    }

    saveToLocalStorageReaction = () => {
        if (hasLocalStorage) {
            window.localStorage.setItem(
                "domain-model-app",
                JSON.stringify(this.asJson)
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
