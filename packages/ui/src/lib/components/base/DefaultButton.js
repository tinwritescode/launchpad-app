import Link from "next/link";
import React from "react";

function DefaultButton({ text }) {
  return (
    <Link href="/ido-list" className="default-btn">
      {text}
    </Link>
  );
}

export default DefaultButton;
