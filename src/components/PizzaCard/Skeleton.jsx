import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={493}
    viewBox="0 0 280 493"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="133" cy="136" r="125" />
    <rect x="0" y="273" rx="10" ry="10" width="274" height="23" />
    <rect x="0" y="317" rx="10" ry="10" width="273" height="72" />
    <rect x="2" y="419" rx="10" ry="10" width="98" height="31" />
    <rect x="134" y="413" rx="25" ry="25" width="141" height="47" />
  </ContentLoader>
);

export default Skeleton;
