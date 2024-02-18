import React, { useRef } from "react";
import styles from "../../styles/manage/rooms.module.scss";

import { Table, Input } from "antd";

const columns = [
  {
    title: "Room Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Bed Type",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Room Floor",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

function RoomManage() {
  const underlineRef = useRef();

  // 移入移出鼠标效果设定
  const handleHover = (e, isActive) => {
    const navbarTab = e.currentTarget.closest("[data-tab]");
    const tab = navbarTab.getAttribute("data-tab");

    // 下划线样式
    if (isActive) {
      navbarTab.classList.add("hoverActive");
      underlineRef.current.style.display = "block";
      switch (tab) {
        case "1":
          underlineRef.current.style.left = "15%";
          underlineRef.current.style.width = "50px";
          break;

        case "2":
          underlineRef.current.style.left = "40%";
          underlineRef.current.style.width = "100px";
          break;

        case "3":
          underlineRef.current.style.left = "77%";
          underlineRef.current.style.width = "45px";
          break;

        default:
          break;
      }
    } else {
      navbarTab.classList.remove("hoverActive");
      // underlineRef.current.style.display = "none";
      underlineRef.current.style.left = "0";
      underlineRef.current.style.width = "0";
    }
  };

  // 操作过滤功能模块，根据过滤条件进行过滤(get all rooms, only available rooms, booked rooms)
  const handleClickEvent = (e) => {
    const filter = e.target.closest("#room-filter");

    if (!filter) return;

    const filterType = filter.getAttribute("data-filter");
    console.log(filterType);
  };

  return (
    <>
      <div className={styles.room_menu_bar}>
        <div className={styles.menu_box}>
          <div className={styles.filter_box}>
            <div className={styles.filter_menu}>
              <div className={styles.filter_container}>
                <div
                  className={styles.tab_container}
                  onClick={(e) => handleClickEvent(e)}
                >
                  <div
                    className={styles.underline}
                    ref={underlineRef}
                    style={{ display: "none", width: "50px", left: "27%" }}
                  ></div>
                  <div
                    className={styles.filter_tab}
                    data-tab="1"
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                  >
                    <span id="room-filter" data-filter="allRooms">
                      All Rooms
                    </span>
                  </div>

                  <div
                    className={styles.filter_tab}
                    data-tab="2"
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                  >
                    <span id="room-filter" data-filter="availableRooms">
                      Available Rooms
                    </span>
                  </div>

                  <div
                    className={styles.filter_tab}
                    data-tab="3"
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                  >
                    <span id="room-filter" data-filter="bookedRooms">
                      Booked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* search box */}
          <div className="search_box">
            <div>
              <input type="text" placeholder="search" />
              <span>search</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <Table
        style={{ marginTop: "5rem" }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </>
  );
}

export default RoomManage;
