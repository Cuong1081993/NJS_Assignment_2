import { Link } from "react-router-dom";
import "./featuredProperties.css";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { loadHotelsByRating } from "../../store/hotel";
import Loading from "../Loading/Loading";

const FeaturedItem = (hotel) => {
  return (
    <div className="fpItem">
      <Link to={`/hotels/${hotel._id}`}>
        <img src={hotel.photos[0] || ""} alt="" className="fpImg" />
        <span className="fpName">{hotel.name}</span>
      </Link>
      <span className="fpCity">{hotel.city}</span>
      <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
      <div className="fpRating">
        <button>{hotel.rating}/10</button>
        <span>Excellent</span>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
  const dispatch = useDispatch();
  const { hotelsByRating, loading } = useSelector((state) => state.hotels);
  useEffect(() => {
    dispatch(loadHotelsByRating());
    console.log("aaaa");
  }, []);
  console.log(hotelsByRating);
  return (
    <>
      {loading || hotelsByRating.length < 1 ? (
        <Loading />
      ) : (
        <Suspense fallback={Loading}>
          <div className="fp">
            {hotelsByRating.map((hotel) => {
              return <FeaturedItem key={hotel._id} hotel={hotel} />;
            })}
          </div>
        </Suspense>
      )}
    </>
  );
};

export default FeaturedProperties;
