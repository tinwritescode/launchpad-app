import React from "react";
import { FaTwitter, FaTelegram } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";

type Props = {
  name?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  websiteUrl?: string;
};

const IdoName = ({ name, twitterUrl, telegramUrl, websiteUrl }: Props) => {
  return (
    <div className="flex flex-row items-center">
      <div className=" text-2xl font-semibold">{name}</div>
      <AiOutlineGlobal
        className="ml-2 text-xl text-yellow-500"
        href={websiteUrl}
      />
      <FaTwitter className="ml-2 text-xl text-yellow-500" href={twitterUrl} />
      <FaTelegram className="ml-2 text-xl text-yellow-500" href={telegramUrl} />
    </div>
  );
};

export default IdoName;
