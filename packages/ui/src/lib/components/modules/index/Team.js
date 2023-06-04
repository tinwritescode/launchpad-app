import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Simple from "../../../components/base/Simple";

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const myTeam = [
  {
    img: "/images/team/1.png",
    name: "John Doe",
    role: "CEO & Founder",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/2.png",
    name: "John Doe",
    role: "CEO & Founder",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/1.png",
    name: "John Doe",
    role: "CEO & Founder",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/2.png",
    name: "John Doe",
    role: "CEO & Founder",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/1.png",
    name: "John Doe",
    role: "CEO & Founder",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  {
    img: "/images/team/2.png",
    name: "John Doe",
    role: "CEO & Founder",
    facebook: null,
    twitter: null,
    linkedin: null,
    instagram: null,
  },
];

function Team({ team = myTeam }) {
  return (
    <section className="team padding-bottom shape-1r" id="team">
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
                    <img
                      width="auto"
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
