import Simple from "../../../components/base/Simple";
import { commify } from "ethers/lib/utils";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const tooltip = (
  <Tooltip>
    <h4>Your current tier</h4>
  </Tooltip>
);

const TierItem = (tier, index, isCurrentTier) => (
  <div key={`tier-${index}`} className="col">
    <div className="tier__item">
      <div className={`tier__inner ${isCurrentTier ? "tier__rainbow" : ""}`}>
        <div className="tier__head">
          <h4>Tier {index + 1}</h4>
          <div className="tier__thumb">
            <img width={100} src={tier.img} alt="Icon" />
          </div>
        </div>
        <div className="tier__body">
          <h4>{tier.name}</h4>
          <ul>
            <li>
              <p className="tier__title">Staking Requirements</p>
              <p className="tier__value">{commify(tier.stakingRequired)}</p>
            </li>
            <li>
              <p className="tier__title">Token Allocation</p>
              <p className="tier__value">{tier.percentage} %</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

function Tier({ tierList, currentTier }) {
  return (
    <div className="tier padding-top padding-bottom">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Choose" title="Tier System" />
            </div>
          </div>
        </div>
        <div className="section__wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-6 row-cols-lg-3 row-cols-sm-2 row-cols-1">
            {tierList.map((tier, index) =>
              index === currentTier ? (
                <OverlayTrigger placement="top" overlay={tooltip}>
                  {TierItem(tier, index, true)}
                </OverlayTrigger>
              ) : (
                TierItem(tier, index, false)
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tier;
