import React from "react";
import styled from "styled-components";
import { Layout, theme } from "antd";

const { Header } = Layout;

export const CustomSubHeader = ({ children, jc, height, margin }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <StHeader jc={jc} bg={colorBgContainer} height={height} margin={margin}>
      {children}
    </StHeader>
  );
};

const StHeader = styled(Header)`
  display: flex;

  align-items: center;
  justify-content: ${({ jc }) => jc};

  height: ${({ height }) => height};

  background: ${({ bg }) => bg};

  margin: ${({ margin }) => margin};
  padding: 0 15px 0 15px;
`;
