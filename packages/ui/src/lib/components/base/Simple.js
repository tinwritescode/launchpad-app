const Simple = ({ subTitle, title }) => {
  return (
    <>
      <p className="section-header__subtitle">{subTitle}</p>
      <h2 className="section__header__title">{title}</h2>
    </>
  );
};

export default Simple;
