import { Facebook, Telegram, Twitter } from "@mui/icons-material";
import React from "react";

const FindUsInSocial: React.FC = () => {
  const socials = [
    {
      name: "Facebook",
      icon: <Facebook />,
      link: "https://www.facebook.com/",
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      link: "https://twitter.com/",
    },
    {
      name: "Telegram",
      icon: <Telegram />,
      link: "https://telegram.org/",
    },
  ];

  return (
    <div className="w-full bg-gray-100 p-4 flex justify-center gap-6">
      {socials.map((social) => (
        <div className="bg-gray-400 p-4 rounded text-white" key={social.link}>
          <a href={social.link} target="_blank">
            {social.icon}
          </a>
        </div>
      ))}
    </div>
  );
};

export default FindUsInSocial;
