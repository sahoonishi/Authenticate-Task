import React, { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";



const WatchList = () => {

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { userEmail } = useContext(UserContext);
  const currentUser = localStorage.getItem("currentUser");
  const user = JSON.parse(localStorage.getItem("alwaysData"));

  let exist = userEmail && user.find((obj) => obj.userEmail === userEmail);
  let newArray = exist.watchList;

  const [show, setShow] = useState(newArray);




  //  DELETE MOVIE FROM LIST




  const deleteMovie = (id) => {
    if (user && exist && exist.watchList) {
      const itemExists =
        exist.watchList && exist.watchList.some((obj) => obj.imdbID === id);
      if (exist.watchList.length !== 0 || itemExists) {
        newArray = exist.watchList.filter((obj) => obj.imdbID !== id);
        setShow(newArray);
        exist.watchList = newArray;
        const currentUserData = { userEmail, watchList: newArray };
        let updatedUserData = JSON.stringify(user);
        localStorage.setItem("alwaysData", updatedUserData);
        localStorage.setItem(
          "currentUserData",
          JSON.stringify(currentUserData)
        );
        localStorage.setItem("userData", updatedUserData);
      }
    }
  };



  // PAGINATION FUNCTION




  const pageHandler = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= show.length / 3 &&
      selectedpage !== page
    )
      setPage(selectedpage);
  };

  return (
    <Layout>
      <div className="bottom-container flex justify-center flex-wrap gap-4 m-4 md:m-10">
        {currentUser &&
          show.slice(page * 5 - 5, page * 5).map((item, index) => {
            const { Title } = item;
            return (
              <div
                key={index}
                className="card w-36 border shadow-xl hover:scale-95 transition-all outline-none relative rounded-xl"
              >
                <div
                  onClick={() => navigate(`/productinfo/${Title}`)}
                  className="flex justify-center"
                >
                  <img
                    className="object-contain w-full h-52 md:h-64"
                    src={item.Poster}
                    alt=""
                  />
                </div>
                <div className="flex flex-col p-2">
                  <div className="rating text-sm md:text-base">
                    {item.Title.slice(0, 17)}
                  </div>
                  <div className="details text-sm md:text-base">
                    {item.Year}
                  </div>
                  <MdDelete
                    onClick={() => deleteMovie(item.imdbID)}
                    className="z-40 text-black text-xl cursor-pointer absolute top-60 md:top-72  md:mt-3 right-2"
                  />
                </div>
              </div>
            );
          })}
      </div>
      {currentUser && show && show.length > 0 && (
        <div className="flex  justify-center mb-6">
          <div className="flex  justify-center  w-60 sm:w-full mt-4 gap-2 sm:gap-4 text-xl items-center">
            <span
              onClick={() => pageHandler(page - 1)}
              className={
                page > 1
                  ? "bg-gray-300 text-black object-contain text-center rounded-lg cursor-pointer p-1"
                  : "opacity-0"
              }
            >
              Back
            </span>
            {Array.from({
              length: Math.ceil(show.length / 5),
            }).map((_, i) => (
              <span
                onClick={() => pageHandler(i + 1)}
                key={i + 1}
                className={
                  page === i + 1
                    ? "bg-gradient-to-t from-blue-700 to-blue-300 w-8 text-center rounded-full text-white transition-all cursor-pointer text-3xl"
                    : "cursor-pointer text-black text-base"
                }
              >
                {i + 1}
              </span>
            ))}
            <span
              onClick={() => pageHandler(page + 1)}
              className={
                page !== Math.ceil(show.length / 5)
                  ? "bg-gray-300 text-black object-contain text-center rounded-lg cursor-pointer p-1"
                  : "opacity-0 hidden"
              }
            >
              Next
            </span>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WatchList;
