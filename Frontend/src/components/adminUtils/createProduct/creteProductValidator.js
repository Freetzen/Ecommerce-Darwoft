const creteProductValidator = (input) => {
    const errors = {};
  
      //TITLE
      if(!input.title.trim().length) errors.title = 'Ingrese un título'

      //DESCRIPTION
      if(!input.description.trim().length) errors.description = 'Ingrese una descripción'
      else{
          if(input.description.length < 100) errors.description = 'Ingrese una descripción mayor a 100 caracteres'
      }

      //IMAGE
      if(!input.image.trim().length) errors.image = 'Ingrese una imagen'
      
      //PRICE
      if(!input.price.length) errors.price = 'Ingrese un precio'
      else{
          if(input.price <= 0) errors.price = 'Debe contener al menos un número'
      }

      //STOCK
      if(!input.stock.length) errors.stock = 'Ingrese el stock del producto'
      else{
        if(input.stock <= 0) errors.stock = 'Debe contener al menos 1 producto'
      }

      //CATEGORY
      if(!input.category.trim().length) errors.category = 'Ingrese una categoría'
  
  
  
    return errors;
};

export default creteProductValidator