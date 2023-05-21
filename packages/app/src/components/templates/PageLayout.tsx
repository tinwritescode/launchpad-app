import React from 'react';
import { cn } from '../../utils/tailwind';
import { Footer, Header } from '../common';
import * as S from './PageLayout.style';

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function PageLayout({ children, className, ...rest }: Props) {
  return (
    <main>
      <Header />
      <S.Container className={cn('container', className)} {...rest}>
        {children}
      </S.Container>
      <Footer />
    </main>
  );
}

export default PageLayout;
