const handleAddToCart = () => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    
    if (existingProduct) {
      const itemToAdd = {
        productId: existingProduct.id,
        quantity: 1,
        name: existingProduct.name,
        image: existingProduct.imageUrl[0],
        price: existingProduct.sellingPrice,
        type: existingProduct.loaiSanPham
      };
  
    //   dispatch(addCart({ 
    //     customerId: "123", // Replace with actual customer ID
    //     item: itemToAdd 
    //   }));
    }
  };