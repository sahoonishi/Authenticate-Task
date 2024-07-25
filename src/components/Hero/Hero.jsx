import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { UserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const { userEmail } = useContext(UserContext);

  // Loading data from local storage when the component mounts

  const user = JSON.parse(localStorage.getItem("alwaysData"));
  const currentUser = localStorage.getItem("currentUser");
  const [movie, setMovie] = useState("");
  const [data, setData] = useState([]);
  const api = "https://www.omdbapi.com/";

  // Getting data from API

  const callData = async (movie) => {
    if (movie.trim() === "") {
      toast.error("Please enter a movie name");
      return;
    }
    try {
      const response = await fetch(`${api}?s=${movie}&apikey=4ca900a0`);
      const daata = await response.json();

      if (daata.Response === "False") {
        toast.error("Movie not found");
        return;
      }
      setData(daata.Search);
      localStorage.setItem("searchItems", JSON.stringify(daata.Search));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Loading data from local storage when the component updates
    const storedData = localStorage.getItem("searchItems");
    if (storedData) {
      setData(JSON.parse(storedData));
    }

    // Clear local storage on page refresh
    const handleBeforeUnload = () => {
      localStorage.removeItem("searchItems");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener on component updates
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const searchme = (e) => {
    e.preventDefault();
    callData(movie);
  };

  let exist = userEmail && user.find((obj) => obj.userEmail === userEmail);
  const [show, setShow] = useState(exist.watchList);

  //ADDING MOVIE TO WATCHLIST

  const addMovie = (item) => {
    if (user && currentUser && exist && exist.watchList) {
      const itemExists =
        exist.watchList &&
        exist.watchList.some((obj) => obj.imdbID === item.imdbID);

      if (exist.watchList.length === 0 || !itemExists) {
        exist.watchList.push(item);
        setShow(exist.watchList);

        const currentUserData = { userEmail, watchList: exist.watchList };
        let updatedUserData = JSON.stringify(user);
        localStorage.setItem("alwaysData", updatedUserData);
        localStorage.setItem(
          "currentUserData",
          JSON.stringify(currentUserData)
        );
        localStorage.setItem("userData", updatedUserData);

        toast.success("Movie added to your watchlist");
      }
    } else {
      toast.error("Please login to add a movie to your watchlist");
      return;
    }
  };

  return (
    <div className="w-full px-4 md:px-16 py-8">
      <div className="header ">
        <div className="header-content border p-4 rounded-xl border-blue-400 w-full">
          <h1 className="text-xl sm:text-3xl mb-8 text-center">
            Welcome to<span className="text-blue-500"> WatchLists</span>
          </h1>
          <p className="text-center">
            Search any movie by title , add them to your personal watchlist and
            remove them anytime .
            <span className="font-bold">
              Click on the movie poster to see more details about it .
            </span>
            <span className=" text-lg">Enjoy....</span>
          </p>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center relative">
          <IoSearch className="absolute left-4 top-1/2 transform -translate-y-9  md:-translate-y-1/2  text-gray-400" />
          <form onSubmit={searchme} className="w-full flex-1" action="">
            <input
              value={movie}
              onChange={(e) => {
                e.preventDefault();
                setMovie(e.target.value);
              }}
              className="searchbar w-full border-gray-100 shadow-lg rounded-full border py-2 px-12 placeholder:p-2 md:placeholder:p-9"
              type="text"
              placeholder="Search here..."
            />
          </form>
          <button
            onClick={() => callData(movie)}
            className="mt-4 md:mt-0 md:absolute md:right-1 bg-blue-400 text-white p-2 rounded-xl border-black hover:bg-blue-600 transition-all searchbutton"
          >
            Search
          </button>
        </div>
      </div>
      <div className="bottom-container flex justify-center flex-wrap gap-6 mt-6">
        {data &&
          data.map((item, index) => {
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
                    className="object-contain w-full h-52"
                    src={item.Poster}
                    alt=""
                  />
                </div>
                <div className="rating p-2">{Title.slice(0, 15)}</div>
                <div className="details p-2">{item.Year}</div>
                <p className="hidden">{item.Plot}</p>
                {currentUser &&
                show &&
                show.some((obj) => obj.imdbID === item.imdbID) ? (
                  <BsFillPatchCheckFill className="z-40 text-black cursor-pointer absolute top-60 md:top-64 right-0 text-lg" />
                ) : (
                  <div
                    onClick={() => addMovie(item)}
                    className="z-40 text-black text-3xl cursor-pointer absolute top-60 font-bold md:top-60 right-0"
                  >
                    +
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Hero;
