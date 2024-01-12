import React, { useEffect, useRef } from "react";
import styles from "../../styles/homepage/wrapper.module.scss";
import hotelsData from "../../assets/data/hotel-data.json";
import { UilAngleLeft, UilAngleRight } from "@iconscout/react-unicons";
import { throttle } from "lodash";

function Carousel() {
  const itemRefs = useRef([]);
  let _direction = true; // 轮播方向

  // 切换图片按钮
  const handleNextButton = () => {
    _direction = true;
    const firstItem = itemRefs.current[0];
    document.querySelector("#slide").appendChild(firstItem);

    // update ref
    itemRefs.current = [...itemRefs.current.slice(1), firstItem];
  };

  const handlePrevButton = () => {
    _direction = false;
    const lastItem = itemRefs.current[itemRefs.current.length - 1]; // 获取最后一位
    document.querySelector("#slide").prepend(lastItem); // 添加到第一个

    // update ref
    itemRefs.current = [lastItem, ...itemRefs.current.slice(0, -1)];
  };

  // 自动轮播

  let _autoSlide = () => {
    if (!itemRefs.current) return;

    if (_direction) {
      let firstItem = itemRefs.current[0];
      document.querySelector("#slide").appendChild(firstItem);

      // update ref
      itemRefs.current = [...itemRefs.current.slice(1), firstItem];
    } else {
      let lastItem = itemRefs.current[itemRefs.current.length - 1];
      document.querySelector("#slide").prepend(lastItem);

      // update ref
      itemRefs.current = [lastItem, ...itemRefs.current.slice(0, -1)];
    }
  };

  // 更准确的自动轮播时间
  const throttleAutoSlide = throttle(_autoSlide, 3000);

  let timer;
  useEffect(() => {
    if (!itemRefs.current) return;
    itemRefs.current = hotelsData.map((_, index) => itemRefs.current[index]); // 进行匹配同步
    timer = setInterval(throttleAutoSlide, 16); // 1000 /60frame 约 16.67ms 所以每1帧调用一次
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container} id="carousel">
      <div
        className={styles.carousel_container}
        id="home"
        name="home"
        onMouseOver={() => clearInterval(timer)}
        onMouseLeave={() => (timer = setInterval(_autoSlide, 3000))}
      >
        {/* 轮播图 */}
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
        {/* 切换图片 */}
        <div className={styles.buttons}>
          <div className={styles.s_button}>
            <UilAngleLeft
              className={styles.angle}
              onClick={handlePrevButton}
            ></UilAngleLeft>
          </div>
          <div className={styles.s_button} onClick={handleNextButton}>
            <UilAngleRight className={styles.angle}></UilAngleRight>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
