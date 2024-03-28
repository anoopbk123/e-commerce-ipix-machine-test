import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { toast } from "react-toastify";
import apiInstance from "../Axios/Instance";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

export default function ProductDetails() {
  const [productData, setProductData] = useState(null);
  const { id } = useParams();
//   console.log(id);

  const fetchProductDetails = async () => {
    try {
      const response = await apiInstance.get(`/products/${id}`);
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        if (data) {
        //   console.log("Products:", data);
          setProductData(data);
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
    fetchProductDetails();
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    toast.success("Added to cart");
  };

  return (
    <div>
      {productData ? (
        <div className="container">
          <Layout title={productData.title}>
            <div>
              <div className="row">
                <Carousel
                  className="col-12 col-md-6"
                  data-bs-theme="dark"
                  style={{ maxWidth: "500px" }}
                >
                  {productData.images.map((link, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 rounded"
                        src={link}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <div className="col-12 col-md-6 fw-semibold">
                  <p>Category: {productData.category.name}</p>
                  <p>Price:$ {productData.price}</p>
                  <p>Description: {productData.description}</p>
                  <p>
                    <Button variant="warning" onClick={handleAddToCart}>
                      Add to cart
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </Layout>
        </div>
      ) : (
        <>
          <h2>Loading</h2>
        </>
      )}
    </div>
  );
}
