import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowToken(true);
    }, 20000); // 20 seconds

    return () => clearTimeout(timeoutId);
  }, []);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      {showToken && <p>Token: {tokenAbbr}</p>}
      <p>
        <Link to="/userslist">Go to the Users List</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
