import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { getRepos } from "../../../slice";

const RESULTS_PER_PAGE = 4;

function PageNavigator(props: { nickname: string; quantity: number }) {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  const pagesLinks = [page - 2, page - 1, page, page + 1, page + 2];

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
    <div className="repos-pagination">
      <p className="text">
        {`${(page - 1) * RESULTS_PER_PAGE + 1}-${
          page * RESULTS_PER_PAGE < props.quantity
            ? page * RESULTS_PER_PAGE
            : props.quantity
        } of ${props.quantity} items`}
      </p>
      <ul className="page-links">
        <li className="link">
          <button onClick={() => changeRepos(page - 1)}>{"<"}</button>
        </li>
        {pagesLinks.map((pageLink: number) => {
          if (
            pageLink > 0 &&
            pageLink <= Math.ceil(props.quantity / RESULTS_PER_PAGE)
          ) {
            return (
              <li
                key={pageLink}
                onClick={() => changeRepos(pageLink)}
                className={`link ${pageLink === page ? "active-link" : ""}`}
              >
                {pageLink}
              </li>
            );
          } else return null;
        })}
        <li className="link">
          <button onClick={() => changeRepos(page + 1)}>{">"}</button>
        </li>
      </ul>
    </div>
  );
}

export default PageNavigator;
