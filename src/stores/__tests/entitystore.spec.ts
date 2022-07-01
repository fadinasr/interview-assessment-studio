import { EntityStore } from "../entitystore";

describe("Entity store", () => {
  it("should load entities from json", () => {
    const store = new EntityStore();
    store.loadJson([
      {
        id: 1,
        name: "test1",
        x: 100,
        y: 100,
      },
      {
        id: 2,
        name: "test2",
        x: 200,
        y: 200,
      },
    ]);

    expect(store.entities.length).toEqual(2);
    expect(store.entities[0].id).toEqual(1);
    expect(store.entities[0].name).toEqual("test1");
    expect(store.entities[0].x).toEqual(100);
    expect(store.entities[0].y).toEqual(100);
  });

  it("should load entities from mock data services", () => {
    const store = new EntityStore();
    store.loadMockData();

    expect(store.entities.length).toBeGreaterThan(0);
    expect(typeof store.entities).toEqual('object');
    expect(store.entities[0]).toHaveProperty('id');
    expect(store.entities[0]).toHaveProperty('name');
    expect(store.entities[0]).toHaveProperty('x');
    expect(store.entities[0]).toHaveProperty('y');
  });

  it("should add entity", () => {
    const store = new EntityStore();
    store.addEntity("Foo", 42, 0);

    expect(store.entities.length).toEqual(1);
    expect(isNaN(store.entities[0].id)).toEqual(false);
    expect(store.entities[0].name).toEqual("Foo");
    expect(store.entities[0].x).toEqual(42);
    expect(store.entities[0].y).toEqual(0);
  });
});
