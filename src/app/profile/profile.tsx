import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProfileInfo from "./profile-info/profile-info";
import ReposWidget from "./repos/repos";
import "./profile.scss";
import glass from "./assets/glass.svg";
import NotFound from "./not-found";
import Loading from "./loading";
import NotInteracted from "./not-interacted";

function ProfileWidget() {
  const options = useSelector((state: RootState) => state.options);

  return (
    <section className="profile-widget">
      {!options.interacted ? (
        <NotInteracted />
      ) : options.notFound ? (
        <NotFound />
      ) : options.loading ? (
        <Loading />
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
