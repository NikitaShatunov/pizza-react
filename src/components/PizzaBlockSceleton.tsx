import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockSceleton: React.FC = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="125" r="125" /> 
    <rect x="0" y="283" rx="6" ry="6" width="270" height="25" /> 
    <rect x="0" y="319" rx="10" ry="10" width="270" height="84" /> 
    <rect x="1" y="410" rx="10" ry="10" width="95" height="30" /> 
    <rect x="114" y="410" rx="23" ry="23" width="152" height="45" />
  </ContentLoader>
)

export default PizzaBlockSceleton