import React from "react";

const OneBall = (props) => {
  return (
    <li
      style={{
        backgroundColor: props.config.colors[props.num],
        color: props.config.textColor[props.num],
      }}
    >
      {props.num}
    </li>
  );
};

export default OneBall;
