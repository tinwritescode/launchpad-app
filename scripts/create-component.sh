#!/bin/bash
DIR="./src/components/common"

mkdir -p $DIR/$1
touch $DIR/$1/$1.tsx
touch $DIR/$1/index.ts
touch $DIR/$1/$1.style.tsx
touch $DIR/$1/$1.module.scss

echo -e "export { default } from './$1';" >> $DIR/$1/index.ts
echo -e "import React from 'react';\n\nimport * as S from './$1.style';\n\ninterface Props {}\n\nconst $1: React.FC<Props> = () => {\n  return <S.Container>$1</S.Container>;\n};\n\nexport default $1;" >> $DIR/$1/$1.tsx
echo -e "import styled from 'styled-components';\n\nexport const Container = styled.div\`\`;" >> $DIR/$1/$1.style.tsx