import React, { useEffect, useState } from "react";
import BookCard from "./BookCard.jsx";
import { axiosInstance } from "../lib/axiosConfig.js";
import axios from "axios";
import { RxScissors } from "react-icons/rx";
const Recommend = () => {
  const [Books, setBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get("http://localhost:3001/api/order/", {
        headers,
      });
      const latestOrder = res.data.ordersData[0];
      console.log(latestOrder);
      if (latestOrder) {
        const response = await axios.get(`http://localhost:5001/recommend`, {
          params: { title: latestOrder.books.title },
        });
        console.log(response);
        setBooks(response.data.recommendations);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {Books && (
        <div className="bg-zinc-900 px-12 py-8">
          <h1 className="text-yellow-100 text-3xl">Recommended books</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 mt-8">
            {Books.map((items, i) => (
              <BookCard
                bookid={items._id}
                image={items.url}
                title={items.title}
                author={items.author}
                price={items.price}
                key={i}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Recommend;
