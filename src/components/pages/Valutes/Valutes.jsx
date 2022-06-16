import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { changeBaseValute } from "../../../toolkitRedux/valutesSlice";

const Valutes = () => {
  console.log("VALUTES");
  const dispatch = useDispatch();

  const valutes = useSelector((state) => state.valutes.valutesList);
  const currentValute = useSelector((state) => state.valutes.baseValute);
  const rubles = useSelector((state) => state.valutes.rublesValues);

  function selectBaseValute(e) {
    if (e.target.value === "RUB") {
      dispatch(changeBaseValute({baseValute: e.target.value, newValutesList: rubles}));
    }

    const newValute = valutes.find((valute) => valute[0] === e.target.value);

    let num = 1 / newValute[1];
    const newValutesList = [];

    valutes.forEach((valute) => {
      const el = [valute[0], valute[1] * num];
      newValutesList.push(el);
    });

    dispatch(
      changeBaseValute({
        baseValute: e.target.value,
        newValutesList: newValutesList,
      })
    );
  }

  const valutesVariants = {
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.01,
      },
    }),
    hidden: { opacity: 0, x: 400 },
  };

  return (
    <div className="valutesList">
      <select name="valute" id="valute" onChange={(e) => selectBaseValute(e)}>
        <option value="RUB">RUB</option>
        {valutes.map((valute, index) => {
          return (
            <option
              selected={valute[0] === currentValute}
              key={valute[1] + index}
              value={valute[0]}
            >
              {valute[0]}
            </option>
          );
        })}
      </select>
      {valutes.map((valute, index) => {
        return (
          <motion.div
            variants={valutesVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            key={valute[1] + index}
            className="valuteBlock"
          >
            1 {valute[0]} = {1 / valute[1]} {currentValute}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Valutes;
