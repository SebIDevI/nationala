import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  paymentIntent: string;
  onCheckout: string;
  setPaymentIntent: (val: string) => void;
  setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      onCheckout: "cart",
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (AddCartType) => AddCartType.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((AddCartType) => {
              if (AddCartType.id === item.id) {
                return { ...AddCartType, quantity: AddCartType.quantity! };
              }
              return AddCartType;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          //Check if the item exists and remove quantity - 1
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            //Remove item from cart
            const filterCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );
            return { cart: filterCart };
          }
        }),
      setPaymentIntent: (val) => set((state) => ({ paymentIntent: val })),
      setCheckout: (val) => set((state) => ({ onCheckout: val })),
      clearCart: () => set((state) => ({ cart: [] })),
    }),
    { name: "cart-store" }
  )
);

type ThemeState = {
  mode: "light" | "synthwave";
  toggleMode: (theme: "light" | "synthwave") => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    { name: "theme-store" }
  )
);

type UserState = {
  userId: string;
  changeUserId: (id: string) => void;
};

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      userId: "",
      changeUserId: (val) => set((state) => ({ userId: val })),
    }),
    { name: "user-app" }
  )
);
