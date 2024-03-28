import React, { useEffect, useState } from "react";
import apiInstance from "../Axios/Instance";
import ProductCard from "../Components/ProductCard";
import { toast } from "react-toastify";

export default function CategoryBasedProducts({ title, id }) {
  const [productsData, setProductsData] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await apiInstance.get(`/categories/${id}/products`);
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        if (data) {
          if (data.length === 0) {
            toast.error("No products available");
          } else {
            // console.log("Products:", data);
            setProductsData(data);
          }
        } else {
          throw new Error("No data found in the response");
        }
      } else {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }
    } catch (error) {
      toast.error("Failed to fetch products. Please try again later.");
    }
  };
  useEffect(() => {
    fetchProducts();
  },[]);
  return (
    <div className="container">
      <h3 className="h3 mx-3">{title}</h3>
      <div className="overflow-x-scroll" style={{width:'100%'}}>
      <div className="container d-flex flex-nowrap">
          {productsData.length ? (
            <>
              {productsData.map((value) => (
                <div
                  key={value.id}
                  style={{ maxHeight: "500px", minHeight: "500px" }}
                >
                  <ProductCard
                    price={value.price}
                    title={value.title}
                    id={value.id}
                    imageURL={value.images[0]}
                  />
                </div>
              ))}
            </>
          ) : (
            <h4>Loading</h4>
          )}
        </div>
      </div>
    </div>
  );
}
