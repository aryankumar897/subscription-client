import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import PriceCard from "../components/cards/PriceCard";
import { UserContext } from "../context";

const Home = ({ history }) => {
  const [state, setState] = useContext(UserContext);
  const [prices, setPrices] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    let result = [];
    const check = () =>
      state &&
      state.user &&
      state.user.subscriptions &&
      state.user.subscriptions.map((sub) => {
        result.push(sub.plan.id);
      });
    check();
    setUserSubscriptions(result);
  }, [state && state.user]);

  useEffect(() => {
    const isPaused = () => {
      state &&
        state.user &&
        state.user.subscriptions &&
        state.user.subscriptions.resumes_at &&
        history.push("/account");
    };

    state && state.user && isPaused();
  }, [state && state.user]);

  const fetchPrices = async () => {
    const { data } = await axios.get("/prices");
    console.log("prices get request", data);
    setPrices(data);
  };

  const handleClick = async (e, price) => {
    e.preventDefault();
    if (userSubscriptions && userSubscriptions.includes(price.id)) {
      history.push(`/${price.nickname.toLowerCase()}`);
      return;
    }
    console.log("plan clicked", price.id);
    if (state && state.token) {
      const { data } = await axios.post("/create-subscription", {
        priceId: price.id,
      });
      window.open(data);
    } else {
      history.push("/register");
    }
  };

  return (
    <div className="container-fluid">
      <div className="text-center row col-md-6 offset-md-3">
        <h1 className="pt-5 fw-bold">
          Explore the right plan for your business
        </h1>
        <p className="pb-4 lead">Choose a plan that suites you best!</p>



      </div>

      <div className="pt-5 mb-3 text-center row">
        {prices &&
          prices.map((price) => (
            <PriceCard
              key={price.id}
              price={price}
              handleSubscription={handleClick}
              userSubscriptions={userSubscriptions}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
