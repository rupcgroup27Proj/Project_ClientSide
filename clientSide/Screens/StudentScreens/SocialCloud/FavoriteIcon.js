import * as React from "react";
import Svg, { Polygon  } from "react-native-svg";

const FavoriteIcon = ({ filled }) => (
    <Svg width={20} height={17} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Polygon
      points="10 0 12.393 6.786 19.417 7.821 14.797 12.953 15.923 19.214 10 15.429 4.077 19.214 5.203 12.953 0.583 7.821 7.607 6.786"
      stroke="black"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? "black" : "none"}
    />
  </Svg>
);
export default FavoriteIcon;
