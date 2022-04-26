import React from "react";
import noRepo from "./assets/no-repo.svg";

function NoRepos() {
  return (
    <div className="no-repos">
      <img src={noRepo} alt="" />
      <h1 className="text">Repository list is empty</h1>
    </div>
  );
}

export default NoRepos;
