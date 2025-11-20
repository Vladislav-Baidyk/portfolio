import { Fragment } from "react/jsx-runtime";
import data from "./products.json";
import { useState } from "react";
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}
function One() {
  const [products, setProducts] = useState<Product[]>(data.products);
  const [summary, setSum] = useState<number>(0);
  const sum = products.reduce((total, num) => total + num, 0);
  setSum();

  return (
    <Fragment>
      {products.map((product, index) => (
        <div key={index}>
          <h1>{product.name}</h1>
        </div>
      ))}
    </Fragment>
  );
}
export default One;
