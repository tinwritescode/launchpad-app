import Link from "next/link";

function Button({ text, href = "#" }) {
  return (
    <Link href={href} className="default-btn default-btn--small">
      {text}
    </Link>
  );
}

export default Button;
