import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarDays,
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import Image from 'next/image';

function Blog({ blogs }) {


  return (
    <div className="blog padding-top padding-bottom">
      <div className="container">
        <div className="blog__wrapper">
          <div className="row ">
            <div className="col-lg-8">
              <div className="blog__wrapper">
                <div className="row g-4">
                  {blogs.map((item) => {
                    return (
                      <div key={item.id} className="col-md-6">
                        <div className="blog__item">
                          <div className="blog__inner">
                            <div className="blog__thumb">
                              <Image src={item.img}
                                width={500}
                                height={500}
                                alt="Blog Images"
                              />
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
                                      </span>
                                      {item.author}
                                    </Link>
                                  </li>
                                  <li className="blog__meta-date">
                                    <Link href="#">
                                      <span>
                                        <FontAwesomeIcon
                                          icon={faCalendarDays}
                                        />
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
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="ps-lg-4">
                <div className="widget widget-search">
                  <div className="widget__header">
                    <h5>Search keywords</h5>
                  </div>
                  <div className="widget-search-inner">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search here"
                        aria-label="Search bar"
                      />
                      <button className="search-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="widget widget-category">
                  <div className="widget__header">
                    <h5>Post Categories</h5>
                  </div>
                  <ul className="lab-ul widget-wrapper list-bg-none">
                    <li>
                      <Link href="#"
                        className="d-flex flex-wrap justify-content-between"
                      >
                        <span>
                          <FontAwesomeIcon icon={faFolder} />
                          Show all
                        </span>
                        <span>15</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="d-flex flex-wrap justify-content-between"
                      >
                        <span>
                          <FontAwesomeIcon icon={faFolder} />
                          IGO
                        </span>
                        <span>20</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="d-flex flex-wrap justify-content-between"
                      >
                        <span>
                          <FontAwesomeIcon icon={faFolder} />
                          Metaverse
                        </span>
                        <span>65</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="d-flex flex-wrap justify-content-between"
                      >
                        <span>
                          <FontAwesomeIcon icon={faFolder} />
                          Web 3.0
                        </span>
                        <span>32</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="d-flex flex-wrap justify-content-between"
                      >
                        <span>
                          <FontAwesomeIcon icon={faFolder} />
                          IDO
                        </span>
                        <span>16</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="d-flex flex-wrap justify-content-between"
                      >
                        <span>
                          <FontAwesomeIcon icon={faFolder} />
                          Token
                        </span>
                        <span>70</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#"
                        className="d-flex flex-wrap justify-content-between"
                      >
                        <span>
                          <FontAwesomeIcon icon={faFolder} />
                          Binance
                        </span>
                        <span>26</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="widget widget-post">
                  <div className="widget__header">
                    <h5>Recent Post</h5>
                  </div>
                  <ul className="lab-ul widget-wrapper">
                    <li className="widget-post-item">
                      <div className="post-thumb">
                        <Link href="/blog-single">
                          <img width="auto" src="/images/blog/p-post/01.jpg"
                            alt="product"
                          />
                        </Link>
                      </div>
                      <div className="post-content">
                        <Link href="/blog-single">
                          <h6>Launch Your IDO Project Now</h6>
                        </Link>
                        <p>02 January 2022</p>
                      </div>
                    </li>
                    <li className="widget-post-item">
                      <div className="post-thumb">
                        <Link href="/blog-single">
                          <img width="auto" src="/images/blog/p-post/02.jpg"
                            alt="product"
                          />
                        </Link>
                      </div>
                      <div className="post-content">
                        <Link href="/blog-single">
                          <h6>Best IDO Launchpad HTML template</h6>
                        </Link>
                        <p>21 February 2022</p>
                      </div>
                    </li>
                    <li className="widget-post-item">
                      <div className="post-thumb">
                        <Link href="/blog-single">
                          <img width="auto" src="/images/blog/p-post/03.jpg"
                            alt="product"
                          />
                        </Link>
                      </div>
                      <div className="post-content">
                        <Link href="/blog-single">
                          <h6>Who are eligible to launch project?</h6>
                        </Link>
                        <p>30 Sep 2022</p>
                      </div>
                    </li>
                    <li className="widget-post-item">
                      <div className="post-thumb">
                        <Link href="/blog-single">
                          <img width="auto" src="/images/blog/p-post/04.jpg"
                            alt="product"
                          />
                        </Link>
                      </div>
                      <div className="post-content">
                        <Link href="/blog-single">
                          <h6>What is the Token allocation in Torkgo</h6>
                        </Link>
                        <p>05 March 2022</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="widget widget-tags">
                  <div className="widget__header">
                    <h5> Popular tags</h5>
                  </div>
                  <ul className="lab-ul widget-wrapper">
                    <li>
                      <Link href="#">metaverse</Link>
                    </li>
                    <li>
                      <Link href="#" className="active">
                        IDO
                      </Link>
                    </li>
                    <li>
                      <Link href="#">token</Link>
                    </li>
                    <li>
                      <Link href="#">torkgo</Link>
                    </li>
                    <li>
                      <Link href="#">html</Link>
                    </li>
                    <li>
                      <Link href="#">cryptos</Link>
                    </li>
                    <li>
                      <Link href="#">games</Link>
                    </li>
                    <li>
                      <Link href="#">polygon</Link>
                    </li>
                    <li>
                      <Link href="#">solana</Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
