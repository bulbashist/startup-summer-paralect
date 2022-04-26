import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../../slice";
import { AppDispatch, RootState } from "../../store";
import { IRepo } from "../../types";
import "./repos.scss";

const RESULTS_PER_PAGE = 5;

function ReposWidget() {
  let { repos, nickname, quantity } = useSelector((state: RootState) => {
    return {
      repos: state.repos,
      nickname: state.profile.login,
      quantity: state.profile.public_repos,
    };
  });
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const pagesLinks = [] as Array<number>;

  {
    let i = 1;
    let temp = quantity;
    do {
      pagesLinks.push(i);
      temp -= RESULTS_PER_PAGE;
      i++;
    } while (temp > 0);
  }

  function changeRepos(nextPage: number) {
    if ((nextPage - 1) * RESULTS_PER_PAGE > quantity) nextPage--;
    if (nextPage < 1) nextPage = 1;
    dispatch(
      getRepos({
        url: `https://api.github.com/users/${nickname}/repos`,
        page: nextPage,
      })
    );
    setPage(nextPage);
  }

  return (
    <section className="repos-widget">
      <h2 className="repos-header">Repositories ({quantity})</h2>
      <ul className="repos-list">
        {repos.map((repo: IRepo) => {
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
            page * RESULTS_PER_PAGE < quantity
              ? page * RESULTS_PER_PAGE
              : quantity
          } of ${quantity} items`}
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
    </section>
  );
}

export default ReposWidget;
