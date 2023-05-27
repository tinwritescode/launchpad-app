import Link from "next/link";
import React from "react";

function DefaultButton({ text }) {
  return (
    <Link href="/project" className="default-btn">
      {text}
    </Link>
  );
}

export default DefaultButton;
