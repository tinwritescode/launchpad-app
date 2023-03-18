import React from "react";

import * as S from "./ProjectSummary.style";

interface Props {}

const ProjectSummary: React.FC<Props> = () => {
  return (
    <S.Container>
      <div>
        <div className="left">
          <a href="#prjSummary">Project Summary</a>
          <a href="#prjSchedule">Schedule</a>
          <a href="#prjComparision">Comparision</a>
          <a href="#prjTokenomics">Tokenomics</a>
          <a href="#prjRoadmap">Roadmap</a>
          <a href="#prjTeam">Team Mmeber</a>
          <a href="#prjInvestors">Investors</a>
        </div>

        <div className="right">
          <div id="prjSummary">
            <h1>Project Summary</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              ut aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, ut aliquam nisl nisl
              sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
              nisl aliquam nisl, ut aliquam nisl nisl sit amet nisl. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              ut aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, ut aliquam nisl nisl
              sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
              nisl aliquam nisl, ut aliquam nisl nisl sit amet nisl. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              ut aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, ut aliquam nisl nisl
              sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
              nisl aliquam nisl, ut aliquam nisl nisl sit amet nisl. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              ut aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, ut aliquam nisl nisl
              sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
              nisl aliquam nisl, ut aliquam nisl nisl sit amet nisl. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              ut aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, ut aliquam nisl nisl
              sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
              nisl aliquam nisl, ut aliquam nisl nisl sit amet nisl. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              ut aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, ut aliquam nisl nisl
              sit amet nisl. Sed tincidunt, nisl eget ultricies tincidunt, nisl
              nisl aliquam nisl, ut aliquam nisl nisl sit amet nisl. Sed
              tincidunt, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              ut aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, ut aliquam nisl nisl
              sit amet nisl. Sed
            </p>
          </div>
          <div id="prjSchedule">Schedule</div>
          <div id="prjComparision">Comparision</div>
          <div id="prjTokenomics">Tokenomics</div>
          <div id="prjRoadmap">Roadmap</div>
          <div id="prjTeam">Team Mmeber</div>
          <div id="prjInvestors">Investors</div>
        </div>
      </div>
    </S.Container>
  );
};

export default ProjectSummary;
