import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FavoriteIcon = ({ filled }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path
    d="M19 3H5C3.89543 3 3 3.89543 3 5V20.5858C3 21.2192 3.33579 21.8231 3.87868 22.1213C4.42157 22.4196 5.07828 22.3788 5.58579 22.0208L12 16.514L18.4142 22.0208C18.9217 22.3788 19.5784 22.4196 20.1213 22.1213C20.6642 21.8231 21 21.2192 21 20.5858V5C21 3.89543 20.1046 3 19 3Z"
    stroke="black"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill={filled ? "black" : "none"}
  />
</Svg>
);
export default FavoriteIcon;
