import styled from "styled-components";
import Section from "../common/Section";
import Text from "../ui/Text";
import Icon from "../ui/Icon";
import { Column, Row } from "../layout/Layout";

import figma from "../../assets/images/skills/figma.svg";
import photoshop from "../../assets/images/skills/photoshop.svg";
import illustrator from "../../assets/images/skills/illustrator.svg";
import html from "../../assets/images/skills/html.svg";
import css from "../../assets/images/skills/css.svg";
import react from "../../assets/images/skills/react.svg";
import javascript from "../../assets/images/skills/javascript.svg";
import typescript from "../../assets/images/skills/typescript.svg";

const skillGroup=[
    {category:"Design",item:[figma,photoshop,illustrator]},
    {category:"Publishing",item:[html, css]},
    {category:"Frontend",item:[react, javascript, typescript]},
]

function SkillsCard(){
    return(
        <Section 
            title="Skills & Tools"
            topOffset= {0}
            gap = {2}
        >
            <Column $gap={3}>
                {skillGroup.map((group)=>(
                    <Column
                        key={group.category}
                     >
                        <SkillTitle size="body">
                            {group.category}
                        </SkillTitle>
                        <Row $gap={1}>
                            {group.item.map((src)=>(
                                <Icon
                                    key={src}
                                    src={src}
                                    size="2xl"
                                    alt={src}
                                />
                            ))}
                        </Row>
                    </Column>
                    
                ))
                }
            </Column>
        </Section>
    );
}

export default SkillsCard;
//---------------------styled----------------//

const SkillTitle = styled(Text)`
    margin-bottom:1px;
`;

