import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './profile-info.scss';
import followers from './assets/followers.svg';
import following from './assets/following.svg';

function ProfileInfo() {
  const profileData = useSelector((state: RootState) => state.profile);

  return (
    <section className="profile-info">
      <img src={profileData.avatar_url} alt="" className="profile-info__avatar" />
      <p className="profile-info__name">{profileData.name}</p>
      <a
        href={profileData.html_url}
        target="_blank"
        rel="noreferrer"
        className="profile-info__nickname"
      >
        {profileData.login}
      </a>
      <ul className="people">
        <li className="follow-info">
          <a href={`${profileData.html_url}?tab=followers`} target="_blank" rel="noreferrer">
            <img src={followers} alt="" />
            <p>{profileData.followers} followers</p>
          </a>
        </li>
        <li className="follow-info">
          <a href={`${profileData.html_url}?tab=following`} target="_blank" rel="noreferrer">
            <img src={following} alt="" />
            <p>{profileData.following} following</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default ProfileInfo;
