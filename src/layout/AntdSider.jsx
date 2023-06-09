import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATH } from "../constants";
import { useDispatch, useSelector } from "react-redux";

import { ArrowLeftOutlined, FileOutlined, UserOutlined, SearchOutlined, QuestionOutlined, MenuUnfoldOutlined, MenuFoldOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { __getTopics } from "../redux/modules/mainSlice";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AntdSider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param = useParams();
  const topicId = param.topicId;

  const [collapsed, setCollapsed] = useState(true);

  const titleData = useSelector((state) => state.main?.titleData);
  const titles = titleData?.map((item) => getItem(item?.title, item?.id));

  useEffect(() => {
    dispatch(__getTopics({ pagesize: "10", pageindex: "1" }));
  }, [topicId]);

  const items = [
    getItem(
      "뒤로가기",
      "5",
      <Link to={-1}>
        <ArrowLeftOutlined />
      </Link>
    ),
    getItem(
      "질문하기",
      "0",
      <Link to={PATH.home}>
        <QuestionOutlined />
      </Link>
    ),
    getItem("내역", "1", <FileOutlined />, titles),
    getItem(
      "마이페이지",
      "2",
      <Link to={PATH.mypage}>
        <UserOutlined />
      </Link>
    ),
    getItem(
      "태그별 보기",
      "3",
      <Link to={PATH.tag}>
        <TagsOutlined />
      </Link>
    ),
    getItem(
      "검색",
      "4",
      <Link to={PATH.search}>
        <SearchOutlined />
      </Link>
    ),
  ];

  const menuClickHandler = (e) => {
    if (e.key.length > 2) {
      navigate(PATH.main(e.key));
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          background: colorBgContainer,
          height: "100%",
          marginRight: "5px",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          style={{
            borderRight: 0,
            width: collapsed ? "80px" : "250px",
            position: "fixed",
          }}
          items={items}
          onClick={menuClickHandler}
        />
        <Button style={{ zIndex: "1", position: "fixed", bottom: "10px", border: "none", background: "transparent" }} size="large" shape="circle" onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Sider>
    </div>
  );
};

export default AntdSider;
