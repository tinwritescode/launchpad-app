import React from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

type Props = {};

function Docs({}: Props) {
  return <SwaggerUI url="/api/openapi.json" />;
}

export default Docs;
