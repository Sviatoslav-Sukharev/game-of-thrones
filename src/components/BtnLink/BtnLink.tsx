import React from "react";
import { NavLink } from "react-router-dom";
import "./BtnLink.css";

interface BtnLinkProps {
  path: string;
  title: string;
}

const BtnLink: React.FC<BtnLinkProps> = ({path, title}) => {
  return (
    <NavLink to={path} className="BtnLink">
      {title}
    </NavLink>
  );
}

export default BtnLink;