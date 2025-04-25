import { Children } from "react";

const EachUtils = ({ of, render }) => {
  if (!Array.isArray(of)) return null;
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default EachUtils;
