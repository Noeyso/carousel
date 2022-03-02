import React, { useCallback, useEffect, useState } from "react";
import styles from "./app.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
type Style = {
  width?: string;
  transition?: string;
  transform?: string;
};
function App() {
  const [slideItems, setSlideItems] = useState([
    "https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016__340.jpg",
    "https://cdn.pixabay.com/photo/2019/08/07/14/11/dog-4390885__340.jpg",
    "https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.jpg",
    "https://cdn.pixabay.com/photo/2016/01/11/22/38/animal-1134504__340.jpg",
    "https://cdn.pixabay.com/photo/2017/06/28/04/07/dog-2449668__340.jpg",
  ]);
  const size = slideItems.length;

  const slideWidth = 400;
  const slideSpeed = 300;
  const [currentLoopIdx, setCurrentLoopIdx] = useState(0);

  useEffect(() => {}, []);

  const getStaticIndex = useCallback(
    (loopIndex) => {
      let rest = loopIndex % size;
      if (rest < 0) {
        rest += size;
      }
      return rest;
    },
    [size]
  );
  function movePrev() {
    setCurrentLoopIdx(currentLoopIdx - 1);
  }

  function moveNext() {}

  return (
    <div className={styles.container}>
      <h2>Carousel-1</h2>
      <section className={styles.slide_box}>
        <div
          className={styles.slide_list_wrapper}
          style={{
            transform: `translateX(${
              -slideWidth * size - slideWidth * currentLoopIdx
            }px)`,
            transition: "0.2s",
          }}
        >
          <div
            className={styles.slide_list}
            style={{
              width: `${slideWidth * (size * 2 + 1)}px`,
              transform: `translateX(${slideWidth * currentLoopIdx}px)`,
              display: "flex",
            }}
          >
            {Array(size * 2 + 1)
              .fill(1)
              .map((_, index) => {
                console.log("redraw");
                const loopIndexToShow = currentLoopIdx + index - size;
                return {
                  staticIndex: getStaticIndex(loopIndexToShow),
                  loopIndexToShow,
                };
              })
              .map(({ staticIndex, loopIndexToShow }, index) => (
                <div className={styles.slide_content} key={loopIndexToShow}>
                  <img src={slideItems[staticIndex]} alt="slideContent" />
                </div>
              ))}
          </div>
        </div>
        <div className={styles.slide_operation}>
          <button
            className={`${styles.slide_btn} ${styles.prev}`}
            onClick={() => setCurrentLoopIdx(currentLoopIdx - 1)}
          >
            <IoIosArrowBack />
          </button>
          <ul className={styles.dots}>
            {[...Array(size)].map((n, index) => (
              <li className={styles.dot}></li>
            ))}
          </ul>
          <button
            className={`${styles.slide_btn} ${styles.next}`}
            onClick={() => setCurrentLoopIdx(currentLoopIdx + 1)}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
