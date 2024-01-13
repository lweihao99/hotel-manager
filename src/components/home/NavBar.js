import React, { useRef, useState } from "react";
import styles from "../../styles/homepage/navBar.module.scss";
import { UilSearch } from "@iconscout/react-unicons";
import { useNavigate, Link } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const lineRef = useRef(null);

  // 滚动效果
  const handleScroll = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("href").split("#")[1];
    const element = document.getElementById(id);
    const navbarHeight = 80;
    // const viewHeight = element.getBoundingClientRect().top;  // 相对于视口高度
    const offsetTop = element.offsetTop; // 相对于祖先元素
    const vScrolled = window.scrollY; // 垂直方向已经滚动的距离
    window.scrollTo({
      top: offsetTop - navbarHeight,
      behavior: "smooth",
    });
  };

  // menu bar 下滑线滑动
  const hoverActive = (e, isActive) => {
    const navbarTab = e.currentTarget.closest("[data-tab]");
    const tab = navbarTab.getAttribute("data-tab");

    // 下划线样式
    if (isActive) {
      navbarTab.classList.add("hoverActive");
      lineRef.current.style.display = "block";
      switch (tab) {
        case "1":
          lineRef.current.style.left = "23px";
          lineRef.current.style.width = "40px";
          break;

        case "2":
          lineRef.current.style.left = "107px";
          lineRef.current.style.width = "48px";
          break;

        case "3":
          lineRef.current.style.left = "203px";
          lineRef.current.style.width = "36px";
          break;

        case "4":
          lineRef.current.style.left = "285px";
          lineRef.current.style.width = "55px";
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
    navigate("/login");
    console.log("login");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbar_menu}>
        {/* left side navbar */}
        <div className={styles.navbar_menu_left}>
          {/* logo */}
          <div className={styles.menu_logo}>
            <a href="#" id="logo">
              <p>Hotem Manager</p>
            </a>
          </div>

          <div className={styles.menu_box}>
            {/* menu ul list */}
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
                    <a
                      href="#home"
                      className={styles.menu_link}
                      onClick={(e) => handleScroll(e)}
                    >
                      Home
                    </a>
                  </div>

                  <div
                    className={styles.tab_head_li}
                    data-tab="2"
                    onMouseEnter={(e) => {
                      hoverActive(e, true);
                    }}
                    onMouseLeave={(e) => hoverActive(e, false)}
                  >
                    <a
                      href="#service"
                      className={styles.menu_link}
                      onClick={(e) => {
                        handleScroll(e);
                      }}
                    >
                      Service
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
                    <a
                      href="#about"
                      className={styles.menu_link}
                      onClick={(e) => handleScroll(e)}
                    >
                      About
                    </a>
                  </div>

                  <div
                    className={styles.tab_head_li}
                    data-tab="4"
                    onMouseEnter={(e) => {
                      hoverActive(e, true);
                    }}
                    onMouseLeave={(e) => {
                      hoverActive(e, false);
                    }}
                  >
                    <a
                      href="#location"
                      className={styles.menu_link}
                      // onClick={(e) => handleScroll(e)}
                    >
                      Location
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* search button */}
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
