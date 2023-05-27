import Link from "next/link";
const PageHeader = ({ title, text }) => {
  return (
    <>
      <section
        className="page-header bg--cover"
        style={{ backgroundImage: "url(images/header/bg.jpg)" }}
      >
        <div className="container">
          <div className="page-header__content text-center">
            <h2 className="text-capitalize">{title}</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {text}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageHeader;
