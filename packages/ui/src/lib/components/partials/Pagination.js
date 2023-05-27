import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Pagination() {
  return (
    <nav aria-label="Blog Pagination">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <span className="page-link">
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            1
          </Link>
        </li>
        <li className="page-item active" aria-current="page">
          <span className="page-link">2</span>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            3
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
