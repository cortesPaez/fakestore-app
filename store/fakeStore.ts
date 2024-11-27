import { create } from "zustand";

export const useFakeStore = create((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  products: [],
  setProducts: (products) => set({ products }),
  productSelected: null,
  setProductSelected: (productSelected) => set({ productSelected }),
}));
