
import Link from "next/link";
import Image from 'next/image';

function ProjectCard() {
  return (
    <div className="project__item">
      <div className="project__item-inner">
        <div className="project__item-thumb">
          <Image src="/images/igo/item/01.jpg"
            width={500}
            height={500}
            alt="IGO cover"
          />
          <span className="badge">
            <Image src="/images/chain/solana.png"
              width={35}
              height={35}
              alt="chain logo"
            />
          </span>
        </div>
        <div className="project__item-content">
          <div className="project__item-top">
            <div className="project__item-author">
              <Link href="#">
                <Image src="/images/igo/author/1.png"
                  width={80}
                  height={80}
                  alt="author image"
                />
              </Link>
              <h4>Dexer Xone</h4>
            </div>
          </div>
          <div className="project__item-middle">
            <ul className="project__infolist">
              <li className="project__infolist-item">
                <p className="project__infolist-name">Round Name:</p>
                <p className="project__infolist-data">Public</p>
              </li>
              <li className="project__infolist-item">
                <p className="project__infolist-name">Participent</p>
                <p className="project__infolist-data">42</p>
              </li>
              <li className="project__infolist-item">
                <p className="project__infolist-name">Project Start</p>
                <p className="project__infolist-data">TBA</p>
              </li>
            </ul>
            <div className="project__item-amount">
              <p>Raised Ammount</p>
              <h6>
                <span className="color--theme-color">5000</span> /
                <span>15000 BUSD</span>
              </h6>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow={25}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
          <div className="project__item-bottom">
            <Link href="/projectdetails" className="default-btn default-btn--small">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
