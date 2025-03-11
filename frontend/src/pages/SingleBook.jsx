import { axiosInstance } from "../lib/axiosConfig.js";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { FaCartShopping } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import toast from "react-hot-toast";
import Rating from "@mui/material/Rating";

const SingleBook = () => {
  const { id } = useParams();
  const [Book, setBook] = useState();
  const [Ratings, setRatings] = useState();
  const [userRating, setUserRating] = useState(0);
  const [Total, setTotal] = useState();
  const role = useSelector((state) => state.auth.role);
  const history = useNavigate();
  const headers = {
    bookId: id,
    userId: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitRating = async () => {
    try {
      const res = await axiosInstance.put(
        `http://localhost:3001/api/user/rateBook`,
        {
          rating: userRating,
        },
        {
          params: {
            ISBN: Book.ISBN,
          },
          headers,
        }
      );
      toast.success("Rating Submitted");
    } catch (error) {
      console.log("Error in submitting rating", error);
      toast.error(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(
          `http://localhost:3001/api/user/get-book/${id}`
        );
        const ratingRes = await axiosInstance.get(
          `http://localhost:3001/api/user/rateBook`,
          {
            params: {
              ISBN: res.data.book.ISBN,
            },
            headers,
          }
        );
        console.log(ratingRes);
        setUserRating((ratingRes.data.rating / 2).toFixed(1));
        setBook(res.data.book);
        setRatings((res.data.avgRating / 2).toFixed(1));
        setTotal(res.data.totalRatings);
        console.log(res);
      } catch (error) {
        console.log("Error in fetching book", error);
      }
    };
    fetch();
  }, []);
  const addToFavourite = async () => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:3001/api/favourites/add/${id}`,
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = async () => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:3001/api/cart/add/${id}`,
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const deleteBook = async () => {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:3001/api/admin/delete-book/${id}`,
        { headers }
      );
      toast.success(response.data.message);
      history("/all-books");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!Book && <Loader />}
      {Book && (
        <div className="bg-zinc-900  px-12 py-8 flex flex-col lg:flex-row gap-8 h-auto">
          <div className="w-full lg:w-3/6 ">
            <div className=" flex flex-col md:flex-row items-start justify-around  bg-zinc-800 rounded px-4 py-8 gap-4 ">
              <img
                src={Book.url}
                alt="book"
                className="h-[50vh] md:h-[70vh] rounded "
              />
              {localStorage.getItem("id") && (
                <div className=" w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-start items-center  mt-4 md:mt-0  ">
                  {role !== "admin" && (
                    <>
                      <button
                        className="bg-white p-3 rounded md:rounded-full text-2xl font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center"
                        onClick={addToFavourite}
                      >
                        <GoHeartFill />
                      </button>
                      <button
                        className="mt-0 md:mt-8 bg-blue-500 text-white p-3 rounded md:rounded-full text-2xl  font-semibold flex items-center hover:bg-blue-600 transition-all duration-300"
                        onClick={addToCart}
                      >
                        <FaCartShopping className="me-4 md:me-0" />{" "}
                        <span className="block md:hidden">Add to cart</span>
                      </button>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <Link
                        to={`/update-book/${id}`}
                        className="bg-white p-3 rounded md:rounded-full text-2xl font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center"
                      >
                        <FaRegEdit />
                      </Link>
                      <button
                        className="mt-0 md:mt-8 bg-red-500 text-white p-3 rounded md:rounded-full text-2xl  font-semibold flex items-center hover:bg-red-600 transition-all duration-300"
                        onClick={deleteBook}
                      >
                        <MdDelete className="me-4 md:me-0" />{" "}
                        <span className="block md:hidden">Delete book</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-3/6 my-8">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Book.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Book.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Book.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Book.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹ {Book.price}{" "}
            </p>
            <div className="mt-5 w-full">
              <p className="text-zinc-100 text-2xl font-semibold pb-2">
                Rating
              </p>
              <div className="flex flex-row gap-5 items-center">
                <Rating
                  name="read-only"
                  value={Ratings}
                  className="scale-125 ml-3"
                  readOnly
                />
                <p className="text-zinc-100">
                  {Ratings} out of 5 ({Total})
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <p className=" text-zinc-100 text-3xl font-semibold">
                Your Rating
              </p>
              <Rating
                name="simple-controlled"
                value={userRating}
                className="scale-125 ml-3"
                onChange={(event, newRating) => {
                  setUserRating(newRating);
                }}
              />
              <p className="text-zinc-100">{userRating} out of 5</p>
              <button
                className="mt-4 px-3 w-1/2 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
                onClick={submitRating}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBook;
