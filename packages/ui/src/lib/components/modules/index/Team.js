import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Simple from "../../../components/base/Simple";

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";

const myTeam = [
  {
    img: "/images/team/2.jpg",
    name: "Tin Nguyen",
    role: "Founder & Chief Executive Officer",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/6.jpg",
    name: "Vy Ho",
    role: "Co-Founder & Chief Marketing Officer",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/5.png",
    name: "Toan Tran",
    role: "CEO & Co-Founder",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/1.png",
    name: "Phat Nguyen",
    role: "CEO",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/3.jpg",
    name: "Kien Nguyen",
    role: "CEO",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/4.png",
    name: "Thieu Dang",
    role: "CEO",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
];

function Team({ team = myTeam }) {
  return (
    <section
      className="team padding-bottom shape-1r bg--primary-color"
      id="team"
    >
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Team" title="Meet the crew" />
            </div>
          </div>
        </div>
        <div className="team__wrapper">
          <div className="row justify-content-center g-4">
            {team.map((member, index) => (
              <div key={`team-member-${index}`} className="col-lg-3 col-sm-6">
                <div
                  className="team__item aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="team__thumb">
                    <Image
                      style={{ width: "350px", height: "250px" }}
                      width={250}
                      height={250}
                      src={member.img}
                      alt="Team Member Image"
                    />
                  </div>
                  <div className="team__content">
                    <h4>
                      <Link href="/team-member">{member.name}</Link>
                    </h4>
                    <p>{member.role}</p>
                    <ul className="social">
                      {member.facebook && (
                        <li className="social__item">
                          <Link href={member.facebook} className="social__link">
                            <FontAwesomeIcon icon={faFacebookF} />
                          </Link>
                        </li>
                      )}
                      {member.linkedin && (
                        <li className="social__item">
                          <Link href={member.linkedin} className="social__link">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                          </Link>
                        </li>
                      )}
                      {member.twitter && (
                        <li className="social__item">
                          <Link href={member.twitter} className="social__link">
                            <FontAwesomeIcon icon={faTwitter} />
                          </Link>
                        </li>
                      )}
                      {member.instagram && (
                        <li className="social__item">
                          <Link
                            href={member.instagram}
                            className="social__link"
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
