import React, { useEffect, useRef } from "react";
import styles from "../../styles/homepage/wrapper.module.scss";
import hotelsData from "../../assets/data/hotel-data.json";
import { UilAngleLeft, UilAngleRight } from "@iconscout/react-unicons";

function Carousel() {
  const itemRefs = useRef([]);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  let _direction = true; // 轮播方向

  // 切换图片按钮
  const handlePrevButton = () => {
    // prev btn handle
  };

  const handleNextButton = () => {
    // next button handle
  };

  // 自动轮播
  const _autoSlide = () => {
    // auto slide function
  };

  // todo 轮播图需要重新设计一个，可以简单但是要顺畅
  return (
    <div className={styles.container} id="carousel">
      <div
        className={styles.carousel_container}
        id="home"
        name="home"
        onMouseEnter={() => clearInterval(_autoSlide)}
        onMouseLeave={() => _autoSlide()}
      >
        {/* 轮播图的图片展示区 */}
        <div className={styles.slide} id="slide">
          {hotelsData.map((hotel, index) => (
            <div
              className={styles.item}
              key={index}
              style={{ backgroundImage: `url(${hotel.imageUrl})` }}
              id="item"
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className={styles.content}>
                <div className={styles.name}>{hotel.name}</div>
                <div className={styles.description}>{hotel.description}</div>
                <button>See More</button>
              </div>
            </div>
          ))}
        </div>
        {/* 切换图片前后的箭头 */}
        <div className={styles.buttons}>
          <div className={styles.s_button}>
            <UilAngleLeft
              className={styles.angle}
              ref={prevBtnRef}
              onClick={handlePrevButton}
            ></UilAngleLeft>
          </div>
          <div
            className={styles.s_button}
            ref={nextBtnRef}
            onClick={handleNextButton}
          >
            <UilAngleRight className={styles.angle}></UilAngleRight>
          </div>
        </div>
        {/* 轮播图顺序圆球 */}
        <div className="indicator"></div>
      </div>
    </div>
  );
}

export default Carousel;
