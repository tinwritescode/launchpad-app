import {
  faDiscord,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCloudArrowDown,
  faDiagramProject,
  faGlobe,
  faRoad,
  faUserAstronaut,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApplyToLaunch, PageHeader } from "@strawberry/ui";
import { Interweave } from "interweave";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../../../../utils/api";
import { ethers } from "ethers";
import { Label } from "@mui/icons-material";
import React, { useMemo, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useAccount } from "wagmi";
import { cn } from "../../../../../utils/tailwind";
import PleaseConnectYourWallet from "../../../../common/PleaseConnectYourWallet";
import Claim from "./Claim";
import IdoStart from "./IdoStart";
import { StakingInfo } from "./StakingInfo";
import WhitelistTable from "./WhitelistTable";
import {
  IoIosGlobe,
  IoIosPaperPlane,
  IoLogoLinkedin,
  IoLogoInstagram,
} from "react-icons/io";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Spinner from "../../../../common/ui/spinner";
import { Card } from "../../../../common/ui/card";

const { formatEther, commify } = ethers.utils;

export function MainTest() {
  const router = useRouter();
  const query = router.query;
  const { isConnected } = useAccount();
  const { data } = api.project.getOne.useQuery(
    { id: query?.id as string },
    {
      enabled: !!query?.id,
    }
  );

  /**
   * Xem thông tin dự án: tên dự án, giá IDO, giới thiệu ngắn
   * Xem team (logo, linkedin, twitter)
   * Xem rank của mình, các rank hiện có, nút staking để lên rank
   * Các mạng xã hội của dự án
   * Trạng thái dự án
   */
  const steps = useMemo(
    () => [
      {
        title: "Project info",
        render: () => (
          <>
            <div>
              <div className="flex gap-6 items-center">
                <img
                  src={data?.image}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold">{data?.name}</div>
                  <div className="text-sm font-semibold text-gray-600">
                    ${data?.token?.symbol}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label className="flex items-center gap-1">
                <IoMdInformationCircleOutline />
                Description:
              </Label>
              <p
                className={cn(
                  "text-sm text-gray-600",
                  "whitespace-pre-wrap",
                  "overflow-ellipsis overflow-hidden",
                  "my-2"
                )}
              >
                {data?.summaryContent}
              </p>
            </div>
            {data?.websiteURL && (
              <div>
                <Label className="flex items-center gap-1">
                  <IoIosGlobe color="#1DA1F2" />
                  Website:
                </Label>
                <a
                  href={data?.websiteURL}
                  target="_blank"
                  className="text-sm text-gray-600"
                >
                  {data?.websiteURL}
                </a>
              </div>
            )}
            {data?.facebookURL && (
              <div>
                <Label className="flex items-center gap-1">
                  <IoLogoFacebook color="#4267B2" />
                  Facebook Page:
                </Label>
                <a
                  href={data?.facebookURL}
                  target="_blank"
                  className="text-sm text-gray-600"
                >
                  {data?.facebookURL}
                </a>
              </div>
            )}
            {data?.telegramURL && (
              <div>
                <Label className="flex items-center gap-1">
                  <IoIosPaperPlane
                    style={{ borderRadius: "50%", background: "#1DA1F2" }}
                    color="#fff"
                  />
                  Telegram Channel:
                </Label>
                <a
                  href={data?.telegramURL}
                  target="_blank"
                  className="text-sm text-gray-600"
                >
                  {data?.telegramURL}
                </a>
              </div>
            )}
            {data?.twitterURL && (
              <div>
                <Label className="flex items-center gap-1">
                  <IoLogoTwitter color="#1DA1F2" />
                  Twitter Page:
                </Label>
                <a
                  href={data?.twitterURL}
                  target="_blank"
                  className="text-sm text-gray-600"
                >
                  {data?.twitterURL}
                </a>
              </div>
            )}
          </>
        ),
        elements: [] as React.ReactNode[],
        connectWalletRequired: false,
      },
      {
        title: "Team",
        render: () => (
          <div className="grid grid-cols-3 gap-4">
            {["John", "Doe", "Alice", "Bob", "Lan", "Linh"].map((name) => (
              <Card
                className="flex flex-col items-center gap-1 p-4 bg-gray-400"
                key={name}
              >
                <img
                  src="https://i.pravatar.cc/100"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-xs text-gray-600">CEO</div>

                <div className="flex gap-2">
                  <a href="#" target="_blank">
                    <IoLogoLinkedin className="w-6 h-6" />
                  </a>
                  <a href="#" target="_blank">
                    <IoLogoTwitter className="w-6 h-6" />
                  </a>
                  <a href="#" target="_blank">
                    <IoLogoInstagram className="w-6 h-6" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        ),
        connectWalletRequired: false,
      },
      {
        title: "Staking",
        render: () => <StakingInfo />,
        connectWalletRequired: true,
      },
      {
        title: "Whitelist locked",
        render: () => <WhitelistTable />,
        connectWalletRequired: true,
      },
      {
        title: "IDO start",
        render: () => <IdoStart />,
        connectWalletRequired: true,
      },
      {
        title: "Claim",
        render: () => <Claim />,
        connectWalletRequired: true,
      },
      {
        title: "History",
        render: () => <div></div>,
        connectWalletRequired: true,
      },
    ],
    []
  );

  const { address } = useAccount();

  const { data: userWhiteListInfo } = api.project.getUserWhiteListInfo.useQuery(
    {
      id: query?.id as string,
      walletAddress: address as string,
    },
    {
      enabled: !!query?.id && !!address,
    }
  );

  const [currentStep, setCurrentStep] = React.useState(0);
  const [maxStep, setMaxStep] = React.useState(4);

  useEffect(() => {
    if (!userWhiteListInfo?.isIdoStarted) {
      setMaxStep(4);
      setCurrentStep(4);
    }

    if (userWhiteListInfo?.isIdoEnded) {
      setMaxStep(5);
      setCurrentStep(5);
    }

    if (userWhiteListInfo?.isClaimed) {
      setMaxStep(6);
      setCurrentStep(6);
    }
  }, [isConnected, userWhiteListInfo]);

  return (
    <div className="flex mb-10 w-full items-center justify-center">
      <div className="aspect-square w-[600px] space-y-4 rounded-md bg-gray-800 p-8 shadow-md">
        <div className="text-center text-2xl font-semibold">
          {steps[currentStep]?.title || <Spinner />}
        </div>

        <div className="overflow-x-auto py-4">
          <div className="flex w-[1000px] text-center">
            {steps.map((step, index) => (
              <div key={step.title} className="flex-1">
                <button
                  onClick={() => {
                    if (index > maxStep) return;
                    return setCurrentStep(index);
                  }}
                >
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div
                      className={cn(
                        "flex aspect-square w-14 items-center justify-center rounded-full bg-gray-900 font-bold text-white hover:opacity-80",
                        {
                          "bg-green-500": index < maxStep,
                        }
                      )}
                    >
                      {index < maxStep ? <AiOutlineCheck /> : index + 1}
                    </div>
                    <div className="text-sm font-semibold flex items-center whitespace-nowrap">
                      {index === maxStep && <Spinner className="w-4" />}
                      {step.title}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {steps[currentStep]?.connectWalletRequired && !isConnected ? (
          <PleaseConnectYourWallet />
        ) : (
          <div className="space-y-3 py-4">{steps[currentStep]?.render()}</div>
        )}
      </div>
    </div>
  );
}

export function Main() {
  const router = useRouter();
  const { query } = router;
  const projectId = query?.id as string;

  const { data: project } = api.project.getOne.useQuery(
    {
      id: projectId,
    },
    {
      enabled: !!projectId,
    }
  );

  return (
    <>
      <PageHeader title="Project Details" text="project details" />
      {/* ================> Project Details start here <================== */}
      <section className="pro-details padding-top padding-bottom">
        <div className="container">
          <div className="pro-details__wrapper">
            {/* project item */}
            <div className="pro-details__block mb-4">
              <div className="pro-details__block-inner">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-7">
                    <div className="pro-details__item-wrap">
                      <div className="pro-details__item">
                        <div className="pro-details__item-thumb">
                          <div className="relative w-full h-full overflow-hidden">
                            <Image
                              src="/images/igo/author/1.png"
                              alt="IGO Project"
                              fill
                            />
                          </div>
                        </div>
                        <div className="pro-details__item-content">
                          <h4>{project?.name}</h4>
                          <Interweave content={project?.descriptionContent} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="pro-details__info">
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Targetted Raised
                            </h6>
                            <p className="pro-details__info-value">
                              {commify(
                                formatEther(project?.targettedRaise || 0)
                              )}{" "}
                              {project?.token.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Total Raised
                            </h6>
                            <p className="pro-details__info-value">
                              {commify(
                                formatEther(project?.token.totalRaised || 0)
                              )}{" "}
                              {project?.token.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Initial Supply
                            </h6>
                            <p className="pro-details__info-value">
                              {commify(
                                formatEther(project?.token.totalSupply || 0)
                              )}{" "}
                              {project?.token.symbol}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* token infos */}
            <div className="pro-details__token mb-5">
              <div className="row g-4 row-cols-auto ">
                <div className="col">
                  <div className="pro-details__token-item d-flex flex-wrap justify-content-between align-items-center gap-40">
                    <div className="pro-details__token-title">
                      <span>$</span>
                      <h6>Token Price:</h6>
                    </div>
                    <div className="pro-details__token-value">
                      <p>
                        {commify(
                          formatEther(project?.IDOContract[0].idoPrice || 0)
                        )}{" "}
                        <sub>
                          {project?.token.symbol} /{" "}
                          {project?.IDOContract[0].purchaseTokenSymbol}
                        </sub>
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="col">
                  <div className="pro-details__token-item d-flex flex-wrap justify-content-between align-items-center gap-40"> {project?.token.symbol}
                    <div className="pro-details__token-title">
                      <span>$</span>
                      <h6>Token Price :</h6>
                    </div>
                    <div className="pro-details__token-value">
                      <p>
                        250000 <sub>USD</sub>
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* project description */}
            <div className="pro-details__desc">
              <div className="row flex-lg-row-reverse g-5">
                <div className="col-lg-8">
                  <div className="pro-details__desc-content">
                    <div
                      data-bs-spy="scroll"
                      data-bs-target="#pro-details-navlist"
                      data-bs-smooth-scroll="true"
                      data-bs-root-margin="0px 0px -60%"
                      className="scrollspy-example"
                      tabIndex={0}
                    >
                      <MainTest />

                      {/* about */}
                      <section id="pro-details-about">
                        <h4>About</h4>
                        <Interweave content={project?.aboutContent} />
                      </section>
                      {/* token */}
                      <section id="pro-details-token">
                        <h4>Token Details</h4>
                        <Interweave content={project?.tokenDetailsContent} />
                      </section>
                      {/* Roadmap */}
                      <section id="pro-details-roadmap">
                        <h4>Roadmap</h4>
                        <Interweave content={project?.roadmapContent} />
                      </section>
                      {/* backers */}
                      <section id="pro-details-backers">
                        <h4> Our Backers</h4>
                        <Interweave content={project?.backerContent} />
                      </section>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <aside>
                    <div className="pro-details__desc-nav">
                      {/* navlist */}
                      <div
                        className="list-group bg--primary-color mb-4"
                        id="pro-details-navlist"
                      >
                        <Link
                          className="list-group-item list-group-item-action"
                          href="#pro-details-about"
                        >
                          <FontAwesomeIcon icon={faWindowRestore} />
                          About
                        </Link>
                        <Link
                          className="list-group-item list-group-item-action"
                          href="#pro-details-token"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faDiagramProject} />
                          Token
                        </Link>
                        <Link
                          className="list-group-item list-group-item-action"
                          href="#pro-details-roadmap"
                        >
                          <FontAwesomeIcon icon={faRoad} />
                          Roadmap
                        </Link>
                        <Link
                          className="list-group-item list-group-item-action"
                          href="#pro-details-backers"
                        >
                          <FontAwesomeIcon icon={faUserAstronaut} />
                          Backers
                        </Link>
                      </div>
                      {/* pro details link */}
                      <div className="pro-details__links">
                        <div className="pro-details__links-item">
                          <div className="pro-details__links-title">
                            <h6>Social Media</h6>
                          </div>
                          <div className="pro-details__links-content">
                            <ul className="social">
                              <li className="social__item">
                                <Link href="#" className="social__link">
                                  <FontAwesomeIcon icon={faTwitter} />
                                </Link>
                              </li>
                              <li className="social__item">
                                <Link href="#" className="social__link">
                                  <FontAwesomeIcon icon={faDiscord} />
                                </Link>
                              </li>
                              <li className="social__item">
                                <Link href="#" className="social__link">
                                  <FontAwesomeIcon icon={faTwitch} />
                                </Link>
                              </li>
                              <li className="social__item">
                                <Link href="#" className="social__link">
                                  <FontAwesomeIcon icon={faInstagram} />
                                </Link>
                              </li>
                              <li className="social__item">
                                <Link href="#" className="social__link">
                                  <FontAwesomeIcon icon={faLinkedinIn} />
                                </Link>
                              </li>
                              <li className="social__item">
                                <Link href="#" className="social__link">
                                  <FontAwesomeIcon icon={faFacebookF} />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="pro-details__links-item">
                          <div className="pro-details__links-title">
                            <h6>Website Link</h6>
                          </div>
                          <div className="pro-details__links-content">
                            <Link className="pro-details__links-btn" href="#">
                              www.example.com{" "}
                              <span>
                                <FontAwesomeIcon icon={faGlobe} />
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="pro-details__links-item">
                          <div className="pro-details__links-title">
                            <h6>Download Whitepaper</h6>
                          </div>
                          <div className="pro-details__links-content">
                            <Link className="pro-details__links-btn" href="#">
                              Whitepaper{" "}
                              <span>
                                <FontAwesomeIcon icon={faCloudArrowDown} />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================> Project Details end here <================== */}
      <ApplyToLaunch />
    </>
  );
}
