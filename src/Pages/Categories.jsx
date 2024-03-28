import React, { useEffect, useState } from "react";
import Layout from '../Components/Layout'
import apiInstance from "../Axios/Instance";
import { toast } from "react-toastify";
import CategoryCard from "../Components/CategoryCard";

export default function Categories() {
    const [CategoriesData, setCategoriesData] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await apiInstance.get("/categories");
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        if (data) {
          // console.log("Categories:", data);
        setCategoriesData(data)
        } else {
          throw new Error("No data found in the response");
        }
      } else {
        throw new Error(`Failed to fetch Categories. Status: ${response.status}`);
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
      <Layout title="Categories">
        <div className="container d-flex flex-wrap justify-content-evenly g-1">
          {CategoriesData.length?<>
            {CategoriesData.map((value)=>(
                <div key={value.id}>
                <CategoryCard title={value.name} id={value.id} imageURL={value.image} />
                </div>
            ))}
          </>:<h4>
            Loading
            </h4>}
        </div>
      </Layout>
    </>
  )
}
