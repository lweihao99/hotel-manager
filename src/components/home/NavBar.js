import React, { useRef, useState } from "react";
import styles from "../../styles/homepage/navBar.module.scss";
import { UilSearch } from "@iconscout/react-unicons";
// import { useNavigate } from "react-router-dom";

function NavBar() {
  // const navigate = useNavigate();
  const lineRef = useRef(null);

  // menu bar 下滑线滑动
  const hoverActive = (e, isActive) => {
    const navbarTab = e.currentTarget.closest("[data-tab]");
    const tab = navbarTab.getAttribute("data-tab");

    if (isActive) {
      navbarTab.classList.add("hoverActive");
      lineRef.current.style.display = "block";
      switch (tab) {
        case "1":
          lineRef.current.style.left = "23px";
          lineRef.current.style.width = "40px";
          break;

        case "2":
          lineRef.current.style.left = "106px";
          lineRef.current.style.width = "55px";
          break;

        case "3":
          lineRef.current.style.left = "207px";
          lineRef.current.style.width = "50px";
          break;

        case "4":
          lineRef.current.style.left = "300px";
          lineRef.current.style.width = "40px";
          break;

        default:
          break;
      }
    } else {
      navbarTab.classList.remove("hoverActive");
      lineRef.current.style.display = "none";
    }
  };

  // 跳转到登录页面
  const toLogin = () => {
    // navigate("/login");
    console.log("login");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbar_menu}>
        {/* left side navbar */}
        <div className={styles.navbar_menu_left}>
          <div className={styles.menu_logo}>
            <a href="/" id="logo">
              <p>Hotem Manager</p>
            </a>
          </div>

          <div className={styles.menu_box}>
            <div className={styles.menu_ul}>
              <div className={styles.menu_ul_container}>
                <div className={styles.tab_head_container}>
                  <div
                    className={styles.underline}
                    id="underline"
                    ref={lineRef}
                    style={{ display: "none", width: 40, left: 24 }}
                  ></div>
                  <div
                    className={styles.tab_head_li}
                    data-tab="1"
                    onMouseEnter={(e) => {
                      hoverActive(e, true);
                    }}
                    onMouseLeave={(e) => {
                      hoverActive(e, false);
                    }}
                  >
                    <a href="#" className={styles.menu_link}>
                      Home
                    </a>
                  </div>
                  <div
                    className={styles.tab_head_li}
                    data-tab="2"
                    onMouseEnter={(e) => {
                      hoverActive(e, true);
                    }}
                    onMouseLeave={(e) => {
                      hoverActive(e, false);
                    }}
                  >
                    <a href="#" className={styles.menu_link}>
                      Manage
                    </a>
                  </div>
                  <div
                    className={styles.tab_head_li}
                    data-tab="3"
                    onMouseEnter={(e) => {
                      hoverActive(e, true);
                    }}
                    onMouseLeave={(e) => hoverActive(e, false)}
                  >
                    <a href="#" className={styles.menu_link}>
                      Service
                    </a>
                  </div>
                  <div
                    className={styles.tab_head_li}
                    data-tab="4"
                    onMouseEnter={(e) => {
                      hoverActive(e, true);
                    }}
                    onMouseLeave={(e) => hoverActive(e, false)}
                  >
                    <a href="#" className={styles.menu_link}>
                      About
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.search_btn} style={{ width: "auto" }}>
              <div className={styles.search_icon}>
                <UilSearch className={styles.icon}></UilSearch>
                <span>Please Enter...</span>
              </div>
              {/* <input type="text" placeholder="Search" /> */}
            </div>
          </div>
        </div>

        {/* login part navbar */}
        <div className={styles.center}>
          <div className={styles.navbar_menu_right}>
            <button onClick={toLogin}>Login</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
