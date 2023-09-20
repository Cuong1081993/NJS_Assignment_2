import "./featured.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
import { loadHotels } from "../../store/hotel";
const Featured = () => {
  const dispatch = useDispatch();

  const { hotels, loading } = useSelector((state) => state.hotels);
  const hotelsDublin = hotels.filter((hotel) => hotel.city === "Dublin");
  const hotelsAustin = hotels.filter((hotel) => hotel.city === "Austin");
  const hotelsReno = hotels.filter((hotel) => hotel.city === "Reno");

  useEffect(() => {
    dispatch(loadHotels());
  }, []);
  return (
    <>
      {loading || hotels.length < 1 ? (
        <Loading />
      ) : (
        <div className="featured">
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Dublin</h1>
              <h2>{hotelsDublin.length} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Reno</h1>
              <h2>{hotelsReno.length}properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Austin</h1>
              <h2>{hotelsAustin.length} properties</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Featured;
