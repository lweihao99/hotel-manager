import React from "react";
import styles from "../../styles/homepage/service.module.scss";

function Service() {
  const hotelImage =
    "https://img.freepik.com/free-vector/hotel-building-tropical-country-with-palms-cartoon-icon_1284-63176.jpg?w=996&t=st=1705092953~exp=1705093553~hmac=760a6236438bcbbcaedb5c15806b65e484437ed2061f6529d4230ade032487e0";

  return (
    <div className={styles.service} id="service">
      <h2 className={styles.service_title}>Service</h2>
      <span className={styles.service_subtitle}>Room and Board.</span>
      <div className={styles.service_container}>
        {/* box left side */}
        <div className={styles.service_left}>
          <h2>Hotel Service</h2>
          <p className="desc">
            Hotel service means work performed in connection with the operation
            of a hotel, including, but not limited to, letting of guest rooms,
            letting of meeting rooms, provision of food or beverage services,
            provision of banquet services, or provision of spa services.
          </p>
          <div className={styles.service_button}>
            <a href="#" className={styles.button_1}>
              Read More
            </a>
          </div>
        </div>

        {/* box right side */}
        <div className={styles.service_right}>
          <div className={styles.service_image}>
            <img src={hotelImage} alt="hotel" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
