import {
  faDiscord,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitch,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCloudArrowDown,
  faDiagramProject,
  faDiceD6,
  faGlobe,
  faRoad,
  faUserAstronaut,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApplyToLaunch, PageHeader } from '@strawberry/ui';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { api } from '../../../../../utils/api';

// export function MainTest() {
//   const router = useRouter();
//   const query = router.query;
//   const { isConnected } = useAccount();
//   const { data } = api.project.getOne.useQuery(
//     { id: query?.id as string },
//     {
//       enabled: !!query?.id,
//     }
//   );

//   /**
//    * Xem thông tin dự án: tên dự án, giá IDO, giới thiệu ngắn
//    * Xem team (logo, linkedin, twitter)
//    * Xem rank của mình, các rank hiện có, nút staking để lên rank
//    * Các mạng xã hội của dự án
//    * Trạng thái dự án
//    */
//   const steps = useMemo(
//     () => [
//       {
//         title: 'Project info',
//         elements: [
//           <div>
//             <div className="flex gap-6 items-center">
//               <img
//                 src={data?.image}
//                 className="w-20 h-20 rounded-full object-cover"
//               />
//               <div className="flex flex-col gap-1">
//                 <div className="text-2xl font-bold">{data?.name}</div>
//                 <div className="text-sm font-semibold text-gray-600">
//                   ${data?.token?.symbol}
//                 </div>
//               </div>
//             </div>
//           </div>,
//           <div>
//             <Label className="flex items-center gap-1">
//               <IoMdInformationCircleOutline />
//               Description:
//             </Label>
//             <p
//               className={cn(
//                 'text-sm text-gray-600',
//                 'whitespace-pre-wrap',
//                 'overflow-ellipsis overflow-hidden',
//                 'my-2'
//               )}
//             >
//               {data?.summaryContent}
//             </p>
//           </div>,
//           data?.websiteURL && (
//             <div>
//               <Label className="flex items-center gap-1">
//                 <IoIosGlobe color="#1DA1F2" />
//                 Website:
//               </Label>
//               <a
//                 href={data?.websiteURL}
//                 target="_blank"
//                 className="text-sm text-gray-600"
//               >
//                 {data?.websiteURL}
//               </a>
//             </div>
//           ),
//           data?.facebookURL && (
//             <div>
//               <Label className="flex items-center gap-1">
//                 <IoLogoFacebook color="#4267B2" />
//                 Facebook Page:
//               </Label>
//               <a
//                 href={data?.facebookURL}
//                 target="_blank"
//                 className="text-sm text-gray-600"
//               >
//                 {data?.facebookURL}
//               </a>
//             </div>
//           ),
//           data?.telegramURL && (
//             <div>
//               <Label className="flex items-center gap-1">
//                 <IoIosPaperPlane
//                   style={{ borderRadius: '50%', background: '#1DA1F2' }}
//                   color="#fff"
//                 />
//                 Telegram Channel:
//               </Label>
//               <a
//                 href={data?.telegramURL}
//                 target="_blank"
//                 className="text-sm text-gray-600"
//               >
//                 {data?.telegramURL}
//               </a>
//             </div>
//           ),
//           data?.twitterURL && (
//             <div>
//               <Label className="flex items-center gap-1">
//                 <IoLogoTwitter color="#1DA1F2" />
//                 Twitter Page:
//               </Label>
//               <a
//                 href={data?.twitterURL}
//                 target="_blank"
//                 className="text-sm text-gray-600"
//               >
//                 {data?.twitterURL}
//               </a>
//             </div>
//           ),
//         ] as React.ReactNode[],
//         connectWalletRequired: false,
//       },
//       {
//         title: 'Team',
//         elements: [
//           <div className="grid grid-cols-3 gap-4">
//             {['John', 'Doe', 'Alice', 'Bob', 'Lan', 'Linh'].map((name) => (
//               <Card className="flex flex-col items-center gap-1 p-4" key={name}>
//                 <img
//                   src="https://i.pravatar.cc/100"
//                   className="w-20 h-20 rounded-full object-cover"
//                 />
//                 <div className="text-sm font-semibold">{name}</div>
//                 <div className="text-xs text-gray-600">CEO</div>

//                 <div className="flex gap-2">
//                   <a href="#" target="_blank">
//                     <IoLogoLinkedin className="w-6 h-6" />
//                   </a>
//                   <a href="#" target="_blank">
//                     <IoLogoTwitter className="w-6 h-6" />
//                   </a>
//                   <a href="#" target="_blank">
//                     <IoLogoInstagram className="w-6 h-6" />
//                   </a>
//                 </div>
//               </Card>
//             ))}
//           </div>,
//         ] as React.ReactNode[],
//         connectWalletRequired: false,
//       },
//       {
//         title: 'Staking',
//         elements: [<StakingInfo />] as React.ReactNode[],
//         connectWalletRequired: true,
//       },
//       {
//         title: 'Whitelist locked',
//         elements: [<WhitelistTable />] as React.ReactNode[],
//         connectWalletRequired: true,
//       },
//       {
//         title: 'IDO start',
//         elements: [<IdoStart />] as React.ReactNode[],
//         connectWalletRequired: true,
//       },
//       {
//         title: 'Claim',
//         elements: [<Claim />] as React.ReactNode[],
//         connectWalletRequired: true,
//       },
//       {
//         title: 'History',
//         elements: [] as React.ReactNode[],
//         connectWalletRequired: true,
//       },
//     ],
//     []
//   );

//   const { address } = useAccount();

//   const { data: userWhiteListInfo } = api.project.getUserWhiteListInfo.useQuery(
//     {
//       id: query?.id as string,
//       walletAddress: address as string,
//     },
//     {
//       enabled: !!query?.id && !!address,
//     }
//   );

//   const [currentStep, setCurrentStep] = React.useState(0);
//   const [maxStep, setMaxStep] = React.useState(4);

//   useEffect(() => {
//     if (!userWhiteListInfo?.isIdoStarted) {
//       setMaxStep(4);
//       setCurrentStep(4);
//     }

//     if (userWhiteListInfo?.isIdoEnded) {
//       setMaxStep(5);
//       setCurrentStep(5);
//     }

//     if (userWhiteListInfo?.isClaimed) {
//       setMaxStep(6);
//       setCurrentStep(6);
//     }
//   }, [isConnected, userWhiteListInfo]);

//   return (
//     <div className="flex py-10 w-full items-center justify-center">
//       <div className="aspect-square w-[600px] space-y-4 rounded-md border bg-gray-50 p-8 shadow-md">
//         <div className="text-center text-2xl font-semibold">
//           {steps[currentStep]?.title || <Spinner />}
//         </div>

//         <div className="overflow-x-auto py-4">
//           <div className="flex w-[1000px] text-center">
//             {steps.map((step, index) => (
//               <div key={step.title} className="flex-1">
//                 <button
//                   onClick={() => {
//                     if (index > maxStep) return;
//                     return setCurrentStep(index);
//                   }}
//                 >
//                   <div className="flex flex-col items-center justify-center space-y-1">
//                     <div
//                       className={cn(
//                         'flex aspect-square w-14 items-center justify-center rounded-full bg-gray-800 p-4 font-bold text-white hover:opacity-80',
//                         {
//                           'bg-green-500': index < maxStep,
//                         }
//                       )}
//                     >
//                       {index < maxStep ? <AiOutlineCheck /> : index + 1}
//                     </div>
//                     <div className="text-sm font-semibold flex items-center whitespace-nowrap">
//                       {index === maxStep && <Spinner className="w-4" />}
//                       {step.title}
//                     </div>
//                   </div>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {steps[currentStep]?.connectWalletRequired && !isConnected ? (
//           <PleaseConnectYourWallet />
//         ) : (
//           <div className="space-y-3 py-4">{steps[currentStep]?.elements}</div>
//         )}
//       </div>
//     </div>
//   );
// }

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
      Project:
      {JSON.stringify(project)}
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
                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Repellendus obcaecati quas ex, praesentium
                            omnis cum, corrupti repudiandae placeat sapiente sit
                            exercitationem mollitia veniam illum. Autem nobis
                            aliquid provident illo ad.
                          </p>
                        </div>
                      </div>
                      <div className="btn-group mt-4 d-flex flex-wrap gap-20">
                        <Link
                          href="/login"
                          className="default-btn default-btn--small"
                        >
                          <span>Claim Token</span>
                        </Link>
                        <Link
                          href="/signup"
                          className="default-btn default-btn--small default-btn--secondary"
                        >
                          <span>Register Now</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="pro-details__info">
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Total Supply
                            </h6>
                            <p className="pro-details__info-value">
                              1,000,000,000 Bzon
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">FDV</h6>
                            <p className="pro-details__info-value">30M USD</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Initial Supply
                            </h6>
                            <p className="pro-details__info-value">
                              1,300,000,0 Bzon
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Initial Market Cap
                            </h6>
                            <p className="pro-details__info-value">6.48M USD</p>
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
                      <h6>Token Price :</h6>
                    </div>
                    <div className="pro-details__token-value">
                      <p>
                        0.25 <sub>USD</sub>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="pro-details__token-item d-flex flex-wrap justify-content-between align-items-center gap-40">
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
                </div>
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
                      {/* about */}
                      <section id="pro-details-about">
                        <h4>About TorkGo</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Optio animi, id ducimus eum tempora minus labore
                          saepe fuga eius dolor non veritatis excepturi
                          perferendis molestiae nulla quia officiis sunt soluta.
                        </p>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Laborum dolores alias aliquid iusto eaque
                          perferendis.
                        </p>
                        <div className="pro-details__img my-4">
                          <Image
                            src="/images/blog/single/01.jpg"
                            alt="Project Image"
                            width={800}
                            height={400}
                          />
                        </div>
                        <h5>Metaverse</h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Soluta, debitis tenetur dolorem a ab voluptas
                          dolore nesciunt saepe optio amet temporibus ipsum
                          beatae est quisquam.
                        </p>
                        <div className="pro-details__img my-4">
                          <Image
                            src="/images/blog/single/02.jpg"
                            alt="Project Image"
                            width={800}
                            height={400}
                          />
                        </div>
                      </section>
                      {/* token */}
                      <section id="pro-details-token">
                        <h4> TorkGo Token Details</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Optio animi, id ducimus eum tempora minus labore
                          saepe fuga eius dolor non veritatis excepturi
                          perferendis molestiae nulla quia officiis sunt soluta.
                        </p>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Laborum dolores alias aliquid iusto eaque
                          perferendis.
                        </p>
                        <div className="pro-details__token-info mt-4">
                          <h5>Token Info</h5>
                          <ul className="pro-details__tokenlist">
                            <li className="pro-details__tokenlist-item">
                              <FontAwesomeIcon icon={faDiceD6} />
                              Lorem ipsum dolor sit amet.
                            </li>
                            <li className="pro-details__tokenlist-item">
                              Opsum dolor sit amet.
                            </li>
                            <li className="pro-details__tokenlist-item">
                              <FontAwesomeIcon icon={faDiceD6} />
                              Dolor sit amet.
                            </li>
                            <li className="pro-details__tokenlist-item">
                              <FontAwesomeIcon icon={faDiceD6} />
                              Zit amet Lorem, ipsum.
                            </li>
                            <li className="pro-details__tokenlist-item">
                              <FontAwesomeIcon icon={faDiceD6} />
                              Xmet dio lor em.
                            </li>
                            <li className="pro-details__tokenlist-item">
                              <FontAwesomeIcon icon={faDiceD6} />
                              Elor sit amet.
                            </li>
                          </ul>
                        </div>
                        <div className="pro-details__img my-4">
                          <Image
                            src="/images/blog/single/03.jpg"
                            alt="Token Image"
                            width={800}
                            height={400}
                          />
                        </div>
                      </section>
                      {/* Roadmap */}
                      <section id="pro-details-roadmap">
                        <h4> TorkGo Roadmap</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Optio animi, id ducimus eum tempora minus labore
                          saepe fuga eius dolor non veritatis excepturi
                          perferendis molestiae nulla quia officiis sunt soluta.
                        </p>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Laborum dolores alias aliquid iusto eaque
                          perferendis.
                        </p>
                        <div className="pro-details__img my-4">
                          <Image
                            width={800}
                            height={400}
                            src="/images/blog/single/04.jpg"
                            alt="roadmap Image"
                          />
                        </div>
                      </section>
                      {/* backers */}
                      <section id="pro-details-backers">
                        <h4> Our Backers</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Optio animi, id ducimus eum tempora minus labore
                          saepe fuga eius dolor non veritatis excepturi
                          perferendis molestiae nulla quia officiis sunt soluta.
                        </p>
                        <div className="pro-details__img my-4">
                          <Image
                            src="/images/blog/single/05.jpg"
                            alt="Project Image"
                            height={400}
                            width={800}
                          />
                        </div>
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
                          {' '}
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
                              www.example.com{' '}
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
                              Whitepaper{' '}
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
