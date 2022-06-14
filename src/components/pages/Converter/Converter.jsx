import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchValutes } from "../../../toolkitRedux/valutesSlice";

const Converter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchValutes());
  }, [dispatch]);

  const valutes = useSelector((state) => state.valutes.valutesList);
  const loading = useSelector((state) => state.valutes.loading);
  const error = useSelector((state) => state.valutes.error);

  const [converted, setConverted] = useState(0);
  const handleConvert = () => {
    const fromValuteCode = text.split(" ")[1];
    const toValuteCode = text.split(" ")[3];
    const count = text.split(" ")[0];
    
    const fromValute = valutes.find(valute => valute[0].toLowerCase() === fromValuteCode.toLowerCase());
    const toValute = valutes.find(valute => valute[0].toLowerCase() === toValuteCode.toLowerCase());

    const result = toValute[1] * count / fromValute[1]

    console.log(result);
    setConverted()
  };

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    console.log(error);
    return (
      <div>{error}</div>
    )
  }

  return (
    <div className="converter">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleConvert}>Конвертировать</button>
      <div className="result">{converted}</div>
    </div>
  );
};

export default Converter;
