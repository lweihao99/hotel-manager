import React, { useRef } from "react";
import styles from "../../styles/homepage/wrapper.module.scss";
import hotelsData from "../../assets/data/hotel-data.json";
import { UilAngleLeft, UilAngleRight } from "@iconscout/react-unicons";

function Carousel() {
  const itemRefs = useRef([]);

  const handleNextButton = () => {
    const firstItem = itemRefs.current[0];
    document.querySelector("#slide").appendChild(firstItem);

    // update ref
    itemRefs.current = [...itemRefs.current.slice(1), firstItem];
  };

  const handlePrevButton = () => {
    const lastItem = itemRefs.current[itemRefs.current.length - 1]; // 获取最后一位
    document.querySelector("#slide").prepend(lastItem); // 添加到第一个

    // update ref
    itemRefs.current = [lastItem, ...itemRefs.current.slice(0, -1)];
  };
  return (
    <div className={styles.section} id="home">
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
  );
}

export default Carousel;
