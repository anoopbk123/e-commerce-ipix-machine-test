import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Table from "react-bootstrap/Table";
import apiInstance from "../Axios/Instance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate()

  const fetchUserData = async () => {
    try {
      const response = await apiInstance.get("/users");
      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        if (data) {
          // console.log("UserData:", data);
          if(data.length === 0){
            navigate(-1)
            toast.error('no users')
          }
          else{
            setUserData(data);
          }
        } else {
          throw new Error("No data found in the response");
        }
      } else {
        throw new Error(
          `Failed to fetch UserData. Status: ${response.status}`
        );
      }
    } catch (error) {
      toast.error("Failed to fetch UserData. Please try again later.");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <Layout title="Users">
        {userData.length ? <div>
          <Table className="text-center table align-middle" responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
                {
                    userData.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td><img alt={`${user.name} profile picture`} style={{maxWidth:"100px"}} src={user.avatar} /></td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))
                }
            </tbody>
          </Table>
        </div>:
        <h2>
            Loading.....
        </h2>
        }
      </Layout>
    </div>
  );
}
