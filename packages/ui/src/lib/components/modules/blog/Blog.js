import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import Pagination from '../../../components/partials/Pagination';

function BlogComponent({ blogs }) {
  return (
    <div className="blog padding-top padding-bottom">
      <div className="container">
        <div className="blog__wrapper">
          <div className="row g-4">
            {blogs.map((item) => {
              return (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <div className="blog__item">
                    <div className="blog__inner">
                      <div className="blog__thumb">
                        <img width="auto" src={item.img} alt="Blog Images" />
                      </div>
                      <div className="blog__content">
                        <div className="blog__content-top">
                          <h4>
                            <Link href="/blog-single">{item.question}</Link>
                          </h4>
                          <ul className="blog__meta d-flex flex-wrap align-items-center">
                            <li className="blog__meta-author">
                              <Link href="#">
                                <span>
                                  <FontAwesomeIcon icon={faUser} />
                                </span>{' '}
                                {item.author}
                              </Link>
                            </li>
                            <li className="blog__meta-date">
                              <Link href="#">
                                <span>
                                  <FontAwesomeIcon icon={faCalendarDays} />
                                </span>
                                {item.date}
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <p>{item.answer}</p>
                        <div className="blog__content-bottom">
                          <Link href="/blog-single" className="text-btn">
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 text-center">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogComponent;
