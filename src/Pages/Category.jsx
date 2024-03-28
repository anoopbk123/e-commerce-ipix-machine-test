import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import apiInstance from "../Axios/Instance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

export default function Category() {
  const navigate = useNavigate();
  const { id, title } = useParams();
  // console.log(title)

  const [productsData, setProductsData] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await apiInstance.get(`/categories/${id}/products`);
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        if (data) {
          if (data.length === 0) {
            navigate('/categories');
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
  }, []);

  return (
    <div>
      <Layout title={title}>
        <div className="container d-flex flex-wrap justify-content-evenly align-content-between g-1">
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
      </Layout>
    </div>
  );
}
