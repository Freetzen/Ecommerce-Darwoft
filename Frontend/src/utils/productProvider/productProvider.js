import axios from "axios"
import localStorageProvider from "../localStorageProvider/localStorageProvider"
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME
const token = localStorageProvider.getToken()

const productProvider = {
  async getProducts() {
    try {
      const products = await axios.get("/api/products");
      return products.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async getProductsAdmin() {
    try {
      const products = await axios.get("/api/products-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return products.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async searchProductsAdmin(title) {
    try {
      const products = await axios.get(`/api/products/name?name=${title}`);
      return products.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async postProduct(product) {
    try {
      const products = await axios.post("/api/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return products.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async PutProducts(product) {
    try {
      const products = await axios.put("/api/products", product,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return products.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async deleteProducts(id) {
    try {
      const products = await axios.delete(`/api/products?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return products.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  async uploadImage(image) {
    try {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "iBuytech");
      const upload = await fetch(url, {
        method: "POST",
        body: data,
      });
      const responseData = await upload.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  },
};

export default productProvider