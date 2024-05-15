import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productProvider from "../utils/productProvider/productProvider";
import Swal from "sweetalert2";
import ticketsProvider from "../utils/ticketsProvider/ticketsProvider";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const products = await productProvider.getProducts();
    return products;
  }
);

export const getAllProductsAdmin = createAsyncThunk(
  "product/getAllProductsAdmin",
  async () => {
    const products = await productProvider.getProducts();
    return products;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await productProvider.postProduct(product);

    if (!response.success) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 1000,
      });
    }

    return response;
  }
);

export const deleteProductAdmin = createAsyncThunk(
  "product/deleteProductAdmin",
  async (id) => {
    const response = await productProvider.deleteProducts(id);
    if (!response.success) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    return response.data;
  }
);

export const putProductAdmin = createAsyncThunk(
  "product/putProductAdmin",
  async (product) => {
    const response = await productProvider.PutProducts(product);
    if (!response.success) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 1000,
      });
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: `${response.message}`,
      showConfirmButton: false,
      timer: 1000,
    });

    return response.data;
  }
);

export const getTicketsAdmin = createAsyncThunk(
  "product/getTicketsAdmin",
  async () => {
    const response = await ticketsProvider.getAllTicketsAdmin();
    if (!response.success) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product", // Slice
  initialState: {
    products: null,
    productsFilter: null,
  },
  reducers: {
    // Funciones para modificar el state relacionado con product.
    deletedProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
    },
    productUpdated(state, action) {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product._id === updatedProduct._id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
      state.productsFilter = { ...state.products };
    },
    productFilters(state, action) {
      if (action.payload === "reset") {
        state.productsFilter = [...state.products];
      } else {
        state.productsFilter = state.products.filter(
          (item) => item.category === action.payload
        );
      }
    },
    productFiltersByPrice(state, action) {
      const ascendingOrder = action.payload === "menorMayor";

      state.productsFilter = state.productsFilter.slice().sort((a, b) => {
        if (ascendingOrder) {
          return a.price - b.price; // Devuelve un número negativo si a < b, 0 si son iguales, y positivo si a > b
        } else {
          return b.price - a.price; // Devuelve un número negativo si b < a, 0 si son iguales, y positivo si b > a
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.productsFilter = action.payload.data;
    }),
      builder.addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
        state.productsFilter = state.products;
      }),
      builder.addCase(deleteProductAdmin.fulfilled, (state, action) => {
        const updateState = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.products = updateState;
        state.productsFilter = updateState;
      });
    builder.addCase(putProductAdmin.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product._id === updatedProduct._id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    });
  },
});

export const {
  deletedProduct,
  productUpdated,
  productFilters,
  productFiltersByPrice,
} = productSlice.actions; // Convertimos las funciones en acciones y las exportamos.
export default productSlice.reducer;
