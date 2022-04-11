import React from "react";
import {ReactSVG} from "react-svg";

export default function AddBtn(clickFn) {
  return (
    <div onClick={() => clickFn()} style={{
      display: "flex",
      justifySelf: "flex-end",
      alignItems: "center",
      marginLeft: "auto",
      cursor: "pointer",
    }}>
      <span style={{fontSize: 12}}>top up</span>
      <ReactSVG src="../assets/add.svg" style={{
        width: '20px',
        height: '20px',
      }}/>
    </div>
  )
}
