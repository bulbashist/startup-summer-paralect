import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../../slice";
import { AppDispatch, RootState } from "../../store";
import { IRepo } from "../../types";
import NoRepos from "./no-repos";
import "./repos.scss";

interface IProps {
  nickname: string;
  repos: Array<IRepo>;
  quantity: number;
}

const RESULTS_PER_PAGE = 5;

function Repos(props: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const pagesLinks = [] as Array<number>;

  {
    let i = 1;
    let temp = props.quantity;
    do {
      pagesLinks.push(i);
      temp -= RESULTS_PER_PAGE;
      i++;
    } while (temp > 0);
  }

  function changeRepos(nextPage: number) {
    if ((nextPage - 1) * RESULTS_PER_PAGE > props.quantity) nextPage--;
    if (nextPage < 1) nextPage = 1;
    dispatch(
      getRepos({
        url: `https://api.github.com/users/${props.nickname}/repos`,
        page: nextPage,
      })
    );
    setPage(nextPage);
  }

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
      <div className="repos-pagination">
        <p>
          {`${(page - 1) * RESULTS_PER_PAGE + 1}-${
            page * RESULTS_PER_PAGE < props.quantity
              ? page * RESULTS_PER_PAGE
              : props.quantity
          } of ${props.quantity} items`}
        </p>
        <button onClick={() => changeRepos(page - 1)}>{"<"}</button>
        <ul className="page-links">
          {pagesLinks.map((pageLink: number) => {
            return (
              <li
                key={pageLink}
                onClick={() => changeRepos(pageLink)}
                className={`link ${pageLink === page ? "active-link" : ""}`}
              >
                {pageLink}
              </li>
            );
          })}
        </ul>
        <button onClick={() => changeRepos(page + 1)}>{">"}</button>
      </div>
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
