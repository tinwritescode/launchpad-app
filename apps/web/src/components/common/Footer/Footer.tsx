import React from "react";
import { FindUsInSocial } from "../../containers/project-list/components";

type Props = {};

function Footer({}: Props) {
  const links = [
    {
      name: "Features",
      url: "/features",
    },
    {
      name: "How it works",
      url: "/how-it-works",
    },
    {
      name: "Token info",
      url: "/token-info",
    },
    {
      name: "About us",
      url: "/about-us",
    },
    {
      name: "Social media",
      url: "/social-media",
    },
    {
      name: "Terms of service",
      url: "/terms-of-service",
    },
    {
      name: "Privacy policy",
      url: "/privacy-policy",
    },
  ];

  return (
    <div className="grid gap-20 py-10">
      <FindUsInSocial />

      <div className="grid gap-5">
        <div className="flex justify-center">
          <h1 className="text-3xl font-mono">StrawBerry</h1>
        </div>
        <div className="flex justify-center gap-6">
          {links.map((link) => (
            <a href={link.url} target="_blank" key={link.name}>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
