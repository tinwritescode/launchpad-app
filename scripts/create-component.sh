#!/bin/bash
DIR="./src/components/common"

mkdir -p $DIR/$1
touch $DIR/$1/$1.tsx
touch $DIR/$1/index.ts
touch $DIR/$1/$1.style.tsx

echo "export { default } from './$1';" >> $DIR/$1/index.ts
echo "import React from 'react';\n\nimport * as S from './$1.style';\n\ninterface Props {}\n\nconst $1: React.FC<Props> = () => {\n  return <S.Container></S.Container>;\n};\n\nexport default $1;" >> $DIR/$1/$1.tsx
echo "import styled from 'styled-components';\n\nexport const Container = styled.div\`\`;" >> $DIR/$1/$1.style.tsx