import React from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const usePagination = ({ data, perPage }) => {
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    if (data) {
      setTotalPage(Math.ceil(data.length / perPage));
    }
  }, [data]);

  const handleNext = (e) => {
    if (page < totalPage) setPage((page) => page + 1);
  };

  const handlePrev = (e) => {
    if (page > 1) setPage((page) => page - 1);
  };

  const handlePage = (e) => {
    setPage(e.target.innerText);
  };

  const displayItems = () => {
    if (data) {
      return data.slice((page - 1) * perPage, page * perPage);
    }
  };

  const Pagination = () => {
    if (data) {
      let items = [];
      items.push(
        <li
          className={"page-item " + (page === 1 ? "disabled" : "")}
          onClick={handlePrev}
          key={0}
        >
          <span className="page-link">
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
        </li>
      );
      for (let i = 1; i <= totalPage; i++) {
        items.push(
          <li
            className={"page-item " + (page === i ? "active" : "")}
            aria-current={page === i ? "page" : null}
            onClick={handlePage}
            key={i}
          >
            <span className="page-link">{i}</span>
          </li>
        );
      }
      items.push(
        <li
          className={"page-item " + (page === totalPage ? "disabled" : "")}
          onClick={handleNext}
          key={totalPage + 1}
        >
          <span className="page-link">
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </li>
      );

      return (
        <ul className="pagination mt-5 justify-content-center">{items}</ul>
      );
    }
    return null;
  };

  return {
    displayItems,
    Pagination,
  };
};
