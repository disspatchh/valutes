import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Converter = () => {
  console.log("CONVERTER");
  const [text, setText] = useState("");

  const valutes = useSelector((state) => state.valutes.valutesList);
  const rubles = useSelector((state) => state.valutes.rublesValues);

  const [converted, setConverted] = useState("");
  const handleConvert = () => {
    setConverted(false);
    if (text.split(" ").length !== 4) {
      setConverted(`Введите запись в формате "10 USD in KZT".`);
    } else {
      const fromValuteCode = text.split(" ")[1];
      const toValuteCode = text.split(" ")[3];
      const count = text.split(" ")[0];

      let fromValute = valutes.find(
        (valute) => valute[0].toLowerCase() === fromValuteCode.toLowerCase()
      );
      let toValute = valutes.find(
        (valute) => valute[0].toLowerCase() === toValuteCode.toLowerCase()
      );

      if (
        fromValuteCode.toLowerCase() === "rub" ||
        toValuteCode.toLowerCase() === "rub"
      ) {
        if (
          fromValuteCode.toLowerCase() === "rub" &&
          toValuteCode.toLowerCase() !== "rub"
        ) {
          const rublesValue = rubles.find(
            (valute) => valute[0] === toValute[0]
          );
          const result = rublesValue[1] * count;
          setConverted(`${count} RUB = ${result} ${toValute[0]}`);
        }

        if (
          toValuteCode.toLowerCase() === "rub" &&
          fromValuteCode.toLowerCase() !== "rub"
        ) {
          const rublesValue = rubles.find(
            (valute) => valute[0] === fromValute[0]
          );
          const result = (1 / rublesValue[1]) * count;
          setConverted(`${count} RUB = ${result} ${fromValute[0]}`);
          console.log(111111);
        }
      } else {
        const fromInRub = 1 / fromValute[1];
        const toInRub = 1 / toValute[1];
        const countRub = fromInRub / toInRub;
        const result = countRub * count;
        setConverted(`${count} ${fromValute[0]} = ${result} ${toValute[0]}`);
      }
    }
  };

  const loading = useSelector((state) => state.valutes.loading);
  const error = useSelector((state) => state.valutes.error);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.4, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="converter"
    >
      <div className="form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={!text && "disabled"} onClick={handleConvert}>
          Конвертировать
        </button>
      </div>

      {converted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={
            converted === `Введите запись в формате "10 USD in KZT".`
              ? "notValid"
              : "result"
          }
        >
          {converted}
        </motion.div>
      ) : ""}
    </motion.div>
  );
};

export default Converter;
