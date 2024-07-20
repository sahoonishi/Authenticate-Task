import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { MdAddBox } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteFromWatchList } from "../../Redux/Slice";

const WatchList = () => {
  const movieItems = useSelector((state) => state.movie);
  //console.log(movieItems);

  const dispatch = useDispatch();
  //const  movieItems  = JSON.parse(localStorage.getItem('movies'));
  //console.log(movieItems);
  const deleteMovie = (id) => {
    dispatch(deleteFromWatchList(id));
  };

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movieItems));
  }, [movieItems]);



  return (
    <Layout>
      <div className="bottom-container  flex justify-start flex-wrap gap-9 m-10">
        {movieItems &&
          movieItems.map((item, index) => {
            return (
              <div
                key={index}
                className="card w-36 border shadow-xl hover:scale-95 transition-all outline-none relative  rounded-xl"
              >
                <div className="flex justify-center">
                  <img className="object-contain w-fit  " src={item.Poster} alt="" />
                </div>
                <div className="flex flex-col ">
                  <div className="rating p-2 text-sm">
                    {item.Title.slice(0, 17)}
                  </div>
                  <div className="details p-2 text-sm">{item.Year}</div>
                  <MdDelete
                    onClick={() => deleteMovie(item.imdbID)}
                    className="z-40 text-black text-xl cursor-pointer absolute top-64 right-0"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default WatchList;
