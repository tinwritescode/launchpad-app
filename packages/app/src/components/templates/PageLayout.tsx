import React from "react";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function PageLayout({ children, className, ...rest }: Props) {
  return (
    <main>
      <div className="container pt-4 md:pt-10">{children}</div>
    </main>
  );
}

export default PageLayout;
