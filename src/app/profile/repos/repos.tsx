import React from 'react';
import { useSelector } from 'react-redux';
import PageNavigator from './navigation/navigation';
import NoRepos from './no-repos';
import { RootState } from '../../store';
import { IRepo } from '../../types';
import './repos.scss';

interface IProps {
  nickname: string;
  repos: Array<IRepo>;
  quantity: number;
}

function Repos(props: IProps) {
  return (
    <React.Fragment>
      <h2 className="repos-header">Repositories ({props.quantity})</h2>
      <ul className="repos-list">
        {props.repos.map((repo: IRepo) => {
          return (
            <li key={repo.id} className="repos-list__item repo">
              <p className="repo__name">
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
              </p>
              <p className="repo__description">{repo.description}</p>
            </li>
          );
        })}
      </ul>
      <PageNavigator nickname={props.nickname} quantity={props.quantity} />
    </React.Fragment>
  );
}

function ReposWidget() {
  const { repos, nickname, quantity } = useSelector((state: RootState) => {
    return {
      repos: state.repos,
      nickname: state.profile.login,
      quantity: state.profile.public_repos,
    };
  });

  return (
    <section className="repos-widget">
      {quantity !== 0 ? (
        <Repos repos={repos} nickname={nickname} quantity={quantity} />
      ) : (
        <NoRepos />
      )}
    </section>
  );
}

export default ReposWidget;
