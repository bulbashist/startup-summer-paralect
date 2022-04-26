import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProfileInfo from "./profile-info/profile-info";
import ReposWidget from "./repos/repos";
import "./profile.scss";

function ProfileWidget() {
  const options = useSelector((state: RootState) => state.options);

  return (
    <section className="profile-widget">
      {options.loading ? (
        <h1>1</h1>
      ) : (
        <React.Fragment>
          <ProfileInfo></ProfileInfo>
          <ReposWidget></ReposWidget>
        </React.Fragment>
      )}
    </section>
  );
}

export default ProfileWidget;
