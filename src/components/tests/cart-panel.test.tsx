import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartPanel } from "../cart-panel";
import type { CartItems } from "../../data";

const renderCart = (cartItems: CartItems) => {
  const addItemToCart = vi.fn();
  const removeItemFromCart = vi.fn();
  const clearCart = vi.fn();

  render(
    <CartPanel
      cartItems={cartItems}
      addItemToCart={addItemToCart}
      removeItemFromCart={removeItemFromCart}
      clearCart={clearCart}
    />,
  );

  return { addItemToCart, removeItemFromCart, clearCart };
};

describe("CartPanel", () => {
  it("shows the empty state and hides Clear when there is nothing in the cart", () => {
    renderCart(new Map());

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Clear" })).toBeNull();
  });

  it("lists each item with its line total", () => {
    renderCart(
      new Map([
        ["lentils", 2],
        ["milk", 1],
      ]),
    );

    expect(screen.getByText("Lentils")).toBeInTheDocument();
    expect(screen.getByText("Milk")).toBeInTheDocument();

    expect(screen.getByText("₹110")).toBeInTheDocument(); // 2 × ₹55
    expect(screen.getByText("₹62")).toBeInTheDocument();
    expect(screen.getByText("₹172")).toBeInTheDocument(); // cart total
    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  it("reports quantity changes and removals", () => {
    const { addItemToCart, removeItemFromCart } = renderCart(
      new Map([["lentils", 2]]),
    );

    fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(addItemToCart).toHaveBeenCalledWith("lentils", 1);

    fireEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(addItemToCart).toHaveBeenCalledWith("lentils", -1);

    fireEvent.click(screen.getByRole("button", { name: "Remove Lentils" }));
    expect(removeItemFromCart).toHaveBeenCalledWith("lentils");
  });

  it("clears the cart on request", () => {
    const { clearCart } = renderCart(new Map([["lentils", 1]]));

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(clearCart).toHaveBeenCalled();
  });
});
