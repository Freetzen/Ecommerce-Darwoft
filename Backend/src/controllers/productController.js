import { createProduct, deleteProductById, findProductByName, findProducts, updateProduct } from "../services/productServices.js";
import { missingInformation, productNotDeleted, productsNotFound } from "../utils/errors.js";

const productController = {
  async getProducts(req, res) {
    try {
      const allProducts = await findProducts();
      if (!allProducts.length) throw new Error(productsNotFound);
      const productosFiltrados = allProducts.filter(
        (producto) => producto.stock > 0 && producto.active === true
      );
      res.status(200).json({ data: productosFiltrados });
    } catch (error) {
      res.json({ message: error.message });
    }
  },
  async getProductsAdmin(req, res) {
    try {
      const allProducts = await findProducts();
      if (!allProducts.length) throw new Error(productsNotFound);
      res.status(200).json({ data: allProducts });
    } catch (error) {
      res.json({ message: error.message });
    }
  },

  async getProductByName(req, res) {
    try {
      const { name } = req.query;
      if (!name)
        throw new Error(
          "Debes proporcionar un nombre de producto en la consulta."
        );

      const products = await findProductByName(name);
      if (products.length === 0)
        throw new Error("No se encontraron productos con ese nombre.");

      return res.status(200).json({ data: products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async postProduct(req, res) {
    try {
      const info = req.body;
      const productosValidos = ["iPhone", "Macbook", "Apple Watch", "iPad"];
      if (info) {
        if (productosValidos.includes(info.category)){
          const newProduct = await createProduct({
            title: info.title,
            description: info.description,
            price: info.price,
            stock: info.stock,
            category: info.category,
            image: info.image,
            featured: Boolean(info.featured),
            active: Boolean(info.active),
          });
          return res.status(200).json({
            success: true,
            data: newProduct,
            message: "Producto creado correctamente!",
          });
        }

throw new Error('Seleccione una categoría correcta');
      }

      throw new Error(missingInformation);
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  },

  async putProduct(req, res) {
    try {
      const info = req.body;
      const productUpdate = await updateProduct(info._id, {
        title: info.title,
        description: info.description,
        image: info.image,
        price: info.price,
        stock: info.stock,
        category: info.category,
        featured: info.featured,
        active: info.active,
      });
      if (productUpdate) {
        return res.status(200).json({
          success: true,
          message: "Producto editado correctamente!",
          data: productUpdate,
        });
      }

      throw new Error(missingInformation);
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.query;

      const deleteProduct = await deleteProductById(id);
      const deletedProductId = deleteProduct._id;
      const deletedProductIdString = deletedProductId.toString();
      if (deletedProductIdString)
        return res.json({
          success: true,
          message: "Producto eliminado correctamente",
          data: deletedProductIdString,
        });

      throw new Error(productNotDeleted);
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  },

  async searchProductsForCart(req, res) {
    try {
      const { productIds } = req.body;
      const objectIdArray = productIds.map((id) => mongoose.Types.ObjectId(id));

      const products = await findProducts({ _id: { $in: objectIdArray } });

      res.json(products);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};

export default productController