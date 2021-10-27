import React from "react";
import "./Page.css";
import Header from "../../components/Header/Header";

const Page: React.FC = ({children}) => {
  return (
    <div className="Page">
      <Header />
      <div className="Page__container">
        {children}
      </div>
    </div>
  );
}

export default Page;