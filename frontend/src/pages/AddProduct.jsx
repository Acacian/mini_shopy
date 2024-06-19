import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    option: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", productData.imageUrl);
      const uploadResponse = await axios.post("http://localhost:3000/uploader", formData);
      const imageUrl = uploadResponse.data.url;

      await axios.post("http://localhost:3000/products", { ...productData, imageUrl });
      // handle success
    } catch (error) {
      console.error("Error uploading product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <input type="text" name="name" value={productData.name} onChange={handleInputChange} />
      <input type="text" name="description" value={productData.description} onChange={handleInputChange} />
      <input type="number" name="price" value={productData.price} onChange={handleInputChange} />
      <input type="file" name="imageUrl" onChange={(e) => setProductData({ ...productData, imageUrl: e.target.files[0] })} />
      <input type="text" name="option" value={productData.option} onChange={handleInputChange} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
