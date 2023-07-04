"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import { spawn } from "child_process";
import { useState } from "react";

export default function AddCart({
  name,
  id,
  quantity,
  unit_amount,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, unit_amount, quantity, name });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="btn bg-accent rounded-md w-full border-accent text-accent-content font-gothamBlack text-lg my-6 hover:bg-accent-focus hover:border-accent-focus transition"
      >
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart 😄</span>}
      </button>
    </>
  );
}
