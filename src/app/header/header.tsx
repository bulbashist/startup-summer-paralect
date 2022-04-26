import React from "react";
import { useDispatch } from "react-redux";
import { getProfileData, getRepos } from "../slice";
import { AppDispatch } from "../store";
import "./header.scss";
import logo from "./logo.svg";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  function getProfile(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const nickname = e.currentTarget.value;
      dispatch(getProfileData(`https://api.github.com/users/${nickname}`));
      dispatch(
        getRepos({
          url: `https://api.github.com/users/${nickname}/repos`,
          page: 1,
        })
      );
      console.log(`https://api.github.com/users/${nickname}`);
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <div className="custom-input">
        <p className="custom-input__glass">🔍</p>
        <input onKeyDown={getProfile} className="custom-input__input" />
      </div>
    </header>
  );
}

export default Header;
