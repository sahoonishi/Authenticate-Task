import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import Loader from "../../Loader";

const ProductInfo = () => {
  const [moviesDetails, setMoviesDetails] = useState([]);
  const { id } = useParams();

  const api = "https://www.omdbapi.com/";

  const callData = async (id) => {
    try {
      const response = await fetch(`${api}?t=${id}&apikey=4ca900a0`);
      const data = await response.json();
      setMoviesDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    callData(id);
  }, [id]);

  return (
    <Layout>
      <div className="bottom-container flex justify-center md:justify-center flex-wrap gap-4 md:gap-9 m-4 md:m-10">
        {moviesDetails.length == 0 ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <div className="card w-60 md:w-72 border shadow-xl hover:scale-95 transition-all outline-none relative flex flex-col rounded-xl">
            <div className="flex justify-center md:justify-start">
              <img
                className="w-60 md:w-96 h-auto md:h-72"
                src={moviesDetails.Poster}
                alt=""
              />
            </div>
            <div className="flex gap-2 flex-col font-sans p-4">
              <div className="rating text-sm flex gap-4 flex-col md:flex-row justify-between mx-1 md:mx-3 mb-2">
                <div className="flex gap-1 flex-wrap">
                  <span className="font-bold">Title:</span>
                  {moviesDetails.Title}
                </div>
                <div className="bg-yellow-600 w-fit rounded-xl flex p-2 text-center my-auto">
                  <span className="font-bold">IMDB:</span>{" "}
                  {moviesDetails.imdbRating}
                </div>
              </div>
              <div className="details text-sm mx-1 md:mx-3 mb-2">
                <span className="font-bold">Year : </span>
                {moviesDetails.Year}
              </div>
              <div className="summary text-base mx-1 md:mx-3">
                <span className="font-bold">Summary:</span>
                {moviesDetails.Plot}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductInfo;
