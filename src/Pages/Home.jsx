import React, { useEffect, useState } from "react";
import apiInstance from "../Axios/Instance";
import { toast } from "react-toastify";
import Layout from "../Components/Layout";
import CategoryBasedProducts from "../Components/CategoryBasedProducts";

export default function Home() {
  const [CategoriesData, setCategoriesData] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await apiInstance.get("/categories");
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        if (data) {
        //   console.log("Categories:", data);
          setCategoriesData(data);
        } else {
          throw new Error("No data found in the response");
        }
      } else {
        throw new Error(
          `Failed to fetch Categories. Status: ${response.status}`
        );
      }
    } catch (error) {
      toast.error("Failed to fetch Categories. Please try again later.");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <Layout title="E-Commerce">
      <div className="container d-flex flex-column flex-wrap justify-content-evenly g-1">
          {CategoriesData.length?<>
            {CategoriesData.map((value)=>(
                <div key={value.id}>
                    <CategoryBasedProducts id={value.id} title={value.name} />
                </div>
            ))}
          </>:<h4>
            Loading
            </h4>}
        </div>
      </Layout>
    </>
  );
}
