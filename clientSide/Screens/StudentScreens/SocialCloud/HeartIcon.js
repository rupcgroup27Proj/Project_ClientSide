import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HeartIcon = ({ filled }) => (
  <Svg width={20} height={17} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M17.076 2.343a4.584 4.584 0 0 0-6.483 0l-.884.884-.883-.884a4.584 4.584 0 0 0-6.483 6.484l.883.883 6.483 6.483 6.484-6.483.883-.883a4.584 4.584 0 0 0 0-6.484v0Z"
      stroke="red"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? "red" : "none"}
    />
  </Svg>
);

export default HeartIcon;
