import { describe, it, expect } from "vitest";
import { cartReducer } from "../cart-context";

const sampleItem = {
  id: "1",
  name: "Test Wine",
  price: 20,
  image: "/test.png",
  vintage: "2020",
  collection: "classique",
};

describe("cartReducer", () => {
  it("adds item to cart", () => {
    const state = cartReducer(
      { items: [], total: 0, itemCount: 0 },
      { type: "ADD_ITEM", payload: sampleItem }
    );
    expect(state.items).toHaveLength(1);
    expect(state.itemCount).toBe(1);
    expect(state.total).toBe(20);
  });

  it("removes item from cart", () => {
    const initial = {
      items: [{ ...sampleItem, quantity: 1 }],
      total: 20,
      itemCount: 1,
    };
    const state = cartReducer(initial, {
      type: "REMOVE_ITEM",
      payload: "1",
    });
    expect(state.items).toHaveLength(0);
    expect(state.itemCount).toBe(0);
    expect(state.total).toBe(0);
  });

  it("updates item quantity", () => {
    const initial = {
      items: [{ ...sampleItem, quantity: 1 }],
      total: 20,
      itemCount: 1,
    };
    const state = cartReducer(initial, {
      type: "UPDATE_QUANTITY",
      payload: { id: "1", quantity: 3 },
    });
    expect(state.items[0].quantity).toBe(3);
    expect(state.itemCount).toBe(3);
    expect(state.total).toBe(60);
  });
});
