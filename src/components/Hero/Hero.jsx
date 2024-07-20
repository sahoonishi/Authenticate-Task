import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { addToWatchList } from "../../Redux/Slice";

const Hero = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [movie, setMovie] = useState("");
  const movieItems = useSelector((state) => state.movie);
  const [data, setData] = useState([]);
  const api = "http://www.omdbapi.com/";
  const callData = async (movie) => {
    if (movie.trim() === "") {
      toast.error("Please enter a movie name");
      return;
    }
    try {
      const response = await fetch(`${api}?s=${movie}&apikey=4ca900a0`);
      const daata = await response.json();
      if (daata.Response === "False") {
        console.log("Movie not found");
        return;
      }
      console.log(daata);
      setData(daata.Search);
      //sessionStorage.setItem("searchItems", JSON.stringify(daata.Search));
      localStorage.setItem("searchItems", JSON.stringify(daata.Search));
      //console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedData = localStorage.getItem("searchItems");
    if (storedData) {
      setData(JSON.parse(storedData));
    }

    // Clear local storage on page refresh
    const handleBeforeUnload = () => {
      localStorage.removeItem("searchItems");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // useEffect(() => {
  //   const storedData = localStorage.getItem("searchItems");
  //   if (storedData) {
  //     setData(JSON.parse(storedData));
  //   }
  // }, []);

  //localStorage.setItem("searchItems" , JSON.stringify(data));

  const searchme = (e) => {
    e.preventDefault();
    callData(movie);
  };

  let existingArray = JSON.parse(localStorage.getItem("movies"));
  // setIsAdded(data.some(item => item.id === movie.id));

  if (!existingArray) {
    existingArray = [];
  }

  const dispatch = useDispatch();

  const addMovie = (item) => {
    // localStorage.setItem("movies", JSON.stringify(item));
    console.log(item);
    if (user) {
      if (
        existingArray.length == 0 ||
        existingArray.some((obj) => obj.imdbID !== item.imdbID)
      ) {
        existingArray.push(item);
        localStorage.setItem("movies", JSON.stringify(existingArray));
        dispatch(addToWatchList(item));
        toast.success("Movie added to your watchlist");
      }
    }else{
      toast.error("Please login to add a movie to your watchlist");
      return;
    }

    setIsAdded(true);
  };

  return (
    <div className="w-full px-16   py-8">
      <div className="header ">
        <div className="header-content border p-4 rounded-xl border-blue-400 w-full">
          <h1 className="text-3xl mb-8">
            Welcome to<span className="text-blue-500"> WatchLists</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            doloribus quod error minus harum facere ducimus voluptas dolor
            veniam ut? Veniam totam possimus soluta ex similique ratione officia
            amet itaque.
          </p>
        </div>
        <div className="mt-8 flex items-center">
          <IoSearch className="translate-x-9" />
          <form
            onSubmit={searchme}
            className="w-full"
            //className=" searchbar rounded-3xl border-gray-600 shadow-lg py-2 px-16 placeholder:p-9"
            action=""
          >
            <input
              value={movie}
              onChange={(e) => {
                e.preventDefault();
                setMovie(e.target.value);
              }}
              //className="outline-none w-full"
              className=" searchbar w-full border-gray-100 shadow-lg rounded-full border py-2 px-16 placeholder:p-9"
              type="text"
              placeholder="Search here..."
            />
          </form>
          <button
            onClick={() => callData(movie)}
            className="-translate-x-16 bg-blue-400 text-white p-2 rounded-xl border-black hover:bg-blue-600 transition-all searchbutton"
          >
            Search
          </button>
        </div>
      </div>
      <div className="bottom-container flex justify-center flex-wrap gap-6 mt-6">
        {data ? (
          data.map((item, index) => {
            const { imdbID } = item;
            return (
              <div
                key={index}
                className="card w-36 border shadow-xl hover:scale-95 transition-all outline-none relative  rounded-xl "
              >
                <div className=" imagewithaddicon flex justify-center">
                  <img
                    className="object-contain w-fit  "
                    src={item.Poster}
                    alt=""
                  />
                </div>
                <div className="rating p-2">{item.Title.slice(0, 15)}</div>
                <div className="details p-2">{item.Year}</div>
                <p>{item.Plot}</p>
                {existingArray.some((obj) => obj.imdbID === item.imdbID) ? (
                  <BsFillPatchCheckFill className="z-40 text-black cursor-pointer  absolute top-64 right-0 text-lg" />
                ) : (
                  <div
                    onClick={() => addMovie(item)}
                    className="z-40 text-black text-3xl cursor-pointer absolute top-60 right-0"
                  >
                    {" "}
                    +
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h1>hiiii</h1>
        )}
      </div>
    </div>
  );
};

export default Hero;
