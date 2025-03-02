import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosConfig.js";
import BookCard from "../components/BookCard.jsx";
import Loader from "../components/Loader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { debounce } from "lodash";

const GetAllBooks = () => {
  const [books, setBooks] = useState([]); // Store books
  const [page, setPage] = useState(1); // Track page number
  const [hasMore, setHasMore] = useState(true); // Check if more books exist
  const [searchTerm, setSearchTerm] = useState(""); // Store search input
  const [searchResults, setSearchResults] = useState([]); // Store API search results
  const [isSearching, setIsSearching] = useState(false); // Track search state
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3001/api/user/get-all-books?page=${page}&limit=10`
      );

      setBooks((prevBooks) => [...prevBooks, ...response.data.books]); // Append new books
      setHasMore(response.data.hasMore); // Check if more books exist
      setPage(page + 1); // Increment page
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const searchBook = debounce(async (query) => {
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
    }
    setIsSearching(true);
    try {
      const response = await axiosInstance.get(
        `http://localhost:3001/api/user/search?q=${query}`
      );
      setSearchResults(response.data.books);
    } catch (error) {
      console.log("Error in searching books", error);
    }
    setIsSearching(false);
  }, 500);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchBook(value);
  };

  return (
    <div className="bg-zinc-900 h-auto mt-8 px-12">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>

      <form class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={handleSearch}
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {searchTerm && (
        <div className="bg-zinc-800 p-4 mt-2 rounded-md">
          <h5 className="text-yellow-100 mb-2">
            {isSearching ? (
              <Loader />
            ) : (
              <h4 className="text-center">Search Results</h4>
            )}
          </h5>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {searchResults.map((item, i) => (
                <BookCard
                  key={i}
                  bookid={item._id}
                  title={item.title}
                  author={item.author}
                  price={item.price}
                  image={
                    <LazyLoadImage
                      src={item.url}
                      alt={item.title}
                      effect="blur"
                      className="w-full h-auto"
                    />
                  }
                />
              ))}
            </div>
          ) : (
            <h2 className="text-2xl text-center font-bold text-white">
              Not Found
            </h2>
          )}
        </div>
      )}

      <InfiniteScroll
        dataLength={books.length}
        next={fetchBooks}
        hasMore={hasMore}
        loader={<Loader />}
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 my-8 gap-4"
      >
        {books.map((item, i) => (
          <div key={i}>
            <BookCard
              bookid={item._id}
              title={item.title}
              author={item.author}
              price={item.price}
              image={
                <LazyLoadImage
                  src={item.url}
                  alt={item.title}
                  effect="blur"
                  className="w-full h-auto"
                />
              }
            />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default GetAllBooks;
