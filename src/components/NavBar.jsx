import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NavBar(props) {
  console.log("NAVBAR");
  
  const [active, setActive] = useState(1);

  return (
    <nav>
      <div>
        <Link to="/">
          <div className="navButton" onClick={() => setActive(1)}>
            Конвертер
          </div>
        </Link>
        {active === 1 && (
          <motion.div
            initial={{ x: 200, scale: 0.5 }}
            animate={{ x: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="line"
          ></motion.div>
        )}
      </div>

      <div>
        <Link to="/valutes">
          <div className="navButton" onClick={() => setActive(2)}>
            Курсы валют
          </div>
        </Link>
        {active === 2 && (
          <motion.div
            initial={{ x: -200, scale: 0.5 }}
            animate={{ x: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="line"
          ></motion.div>
        )}
      </div>
    </nav>
  );
}

export default React.memo(NavBar);
