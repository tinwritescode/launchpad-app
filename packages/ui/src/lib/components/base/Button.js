import Link from "next/link";

function Button({ text }) {
  return (
    <Link href="/projectdetails" className="default-btn default-btn--small">
      {text}
    </Link>
  );
}

export default Button;
