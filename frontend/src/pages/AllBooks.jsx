import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosConfig.js";
import BookCard from "../components/BookCard.jsx";
import Loader from "../components/Loader.jsx";
const GetAllBooks = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance.get(
        "http://localhost:3001/api/user/get-all-books"
      );
      setData(response.data.books);
    };
    fetch();
  }, []);
  console.log(data);
  return (
    <div className="bg-zinc-900 h-auto mt-8 px-12">
      <h4 className="text-3x1 text-yellow-100">Recently added books</h4>
      <div className="flex items-center justify-center">
        {!data && <Loader />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 my-8 gap-4">
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <BookCard
                bookid={item._id}
                image={item.url}
                title={item.title}
                author={item.author}
                price={item.price}
                key={i}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default GetAllBooks;
