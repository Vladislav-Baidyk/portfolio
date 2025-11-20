import { Fragment } from "react/jsx-runtime";
import styles from "./body.module.css";
import data from "./data.json";
import { useState } from "react";
interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}
function Body() {
  const [tasks, setTasks] = useState<Product[]>(data);
  const [cartItems, setCartItems] = useState<
    { index: number; quantity: number }[]
  >([]);

  function addToTheCart(index: number) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.index === index);
      if (existingItem) {
        return prevItems.map((item) =>
          item.index === index ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { index, quantity: 1 }];
      }
    });
  }
  function Decrement(index: number) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.index === index
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }
  const score = cartItems.reduce((total, item) => total + item.quantity, 0);
  function Increment(index: number) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.index === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  function Remove(index: number) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.index !== index)
    );
  }
  const total = cartItems.reduce((sum, item) => {
    const product = tasks[item.index];
    return sum + product.price * item.quantity;
  }, 0);
  const [order, setOrder] = useState(false);
  function orderFinish() {
    setOrder(true);
  }
  function DeleteAll() {
    setOrder(false);

    setCartItems([]);
  }
  return (
    <Fragment>
      <div className={order ? styles.blackContainer : styles.container}>
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <h1>Desserts</h1>
            <div className={styles.grid}>
              {tasks.map((product, index) => {
                const cartItem = cartItems.find((item) => item.index === index);
                const isInCart = cartItem !== undefined;
                const quantity = cartItem ? cartItem.quantity : 0;
                return (
                  <div key={index} className={styles.box}>
                    <picture>
                      <source
                        media="(min-width: 1200px)"
                        srcSet={product.image.desktop}
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet={product.image.tablet}
                      />
                      <img
                        src={product.image.mobile}
                        alt={product.name}
                        className={
                          isInCart ? styles.borderImg : styles.borderNone
                        }
                      />
                    </picture>
                    {!isInCart ? (
                      <div
                        onClick={() => addToTheCart(index)}
                        className={styles.addToTheCart}
                      >
                        <img src="./public/icon-add-to-cart.svg" />
                        <p>Add to Cart</p>
                      </div>
                    ) : (
                      <div className={styles.addMinus}>
                        <button onClick={() => Decrement(index)}>
                          <img src="./public/icon-decrement-quantity.svg" />
                        </button>
                        <p>{quantity}</p>
                        <button onClick={() => Increment(index)}>
                          <img src="./public/icon-increment-quantity.svg" />
                        </button>
                      </div>
                    )}
                    <div className={styles.boxText}>
                      <p>
                        {product.category}
                        <br></br>
                        <span className={styles.name}>{product.name}</span>
                        <br></br>
                        <span className={styles.price}>{product.price}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <p>Your cart ({score})</p>
          {score > 0 ? (
            <>
              {cartItems.map((item) => {
                const product = tasks[item.index];
                return (
                  <div key={item.index} className={styles.rigthText}>
                    <div className={styles.orderBox}>
                      <div className={styles.orderBoxStart}>
                        <p>{product.name}</p>
                        <div className={styles.orderBoxStartText}>
                          <p>{item.quantity}x</p>
                          <p>@{product.price}</p>
                          <p>${item.quantity * product.price}</p>
                        </div>
                      </div>
                      <div className={styles.orderBoxEnd}>
                        <button onClick={() => Remove(item.index)}>
                          <img src="./public/icon-remove-item.svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className={styles.Total}>
                <p>Order total</p>
                <p>${total}</p>
              </div>
              <div className={styles.tree}>
                <img src="./public/icon-carbon-neutral.svg" />
                <p>
                  This is a <span>carbon-neutral</span> delivery
                </p>
              </div>
              <button onClick={orderFinish} className={styles.submit}>
                Submit Order
              </button>
            </>
          ) : (
            <div className={styles.nothing}>
              <img src="./public/illustration-empty-cart.svg" />
              <p>Your added items will appear here</p>
            </div>
          )}
        </div>
      </div>
      {order === true ? (
        <div className={styles.orderFinish}>
          <div className={styles.orderFinishText}>
            <img src="./public/icon-order-confirmed.svg" />
            <h1>Order Confirmed</h1>
            <p>We hope you enjoy food!</p>
            {cartItems.map((item) => {
              const product = tasks[item.index];
              return (
                <div key={item.index} className={styles.rigthText}>
                  <div className={styles.orderFinishBox}>
                    <div className={styles.orderFinishStart}>
                      <img src={product.image.mobile} />
                      <div className={styles.orderFinishStartText}>
                        <p>{product.name}</p>
                        <div className={styles.orderFinishStartTextEnd}>
                          <p>{item.quantity}</p>
                          <p>@{product.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.orderFinishEnd}>
                      {" "}
                      <p>${item.quantity * product.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.TotalFinish}>
              <p>Order total</p>
              <p>${total}</p>
            </div>
            <button onClick={DeleteAll} className={styles.startNewOdrer}>
              Submit Order
            </button>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
export default Body;
