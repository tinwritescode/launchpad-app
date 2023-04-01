import { Box, BoxProps } from "@mui/material";
import React from "react";

type Props = {} & BoxProps;

function Flex(props: Props) {
  return <Box display="flex" {...props} />;
}

export default Flex;
