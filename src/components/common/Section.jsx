import styled,{css} from "styled-components";
import {Link} from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Text from "../ui/Text";
import Icon from "../ui/Icon";
import { Column, RowBetween } from "../layout/Layout";

const VARIANTS = {
    default:{
        titleSize: "heading",
    titleColor: "text-primary",
    topOffset: 0 ,
    gap: 6,
    card: css`
      background: var(--component-card-default-background);
      border-radius: var(--component-card-default-radius);
      padding: var(--component-card-default-padding);
      box-shadow: var(--component-card-default-shadow);
      overflow: hidden;
    `, 
    },
    feature:{
       titleSize: "title",
        titleColor: "text-on-feature",
        topOffset: 0,
        gap: 4,
        card: css`
        background: var(--component-feature-card-panel-background);
        border-radius: var(--component-feature-card-radius);
        padding: var(--component-feature-card-padding);
        padding-bottom: calc(var(--component-feature-card-padding) * 3 );
        position: relative;
        overflow: hidden;
        isolation: isolate;
        `,
    },
    plain:{
        titleSize: "title",
        titleColor: "text-primary",
        topOffset: 0,
        gap: 4,
        card: css``,
    }
}
function Section({
    id,
    title,
    action,
    moreTo,
    children,
    topOffset,
    gap,
    grow = false,
    variant = "default"
}){
    const style = VARIANTS[variant];
    return(
        <Card id={id} $gap={gap ?? style.gap} $variant={variant} $grow={grow}>
            <RowBetween>
                <TitleText 
                    size={style.titleSize}
                    color={style.titleColor} 
                    $topoffset={topOffset ?? style.topOffset}
                    >
                    {title}
                </TitleText>
                {action ? action 
                    : moreTo && (
                        <MoreBtn to ={moreTo}>
                            <Icon component={ArrowUpRight} size="md" color="text-secondary"/>
                        </MoreBtn>
                    )}
            </RowBetween>
            {children}
        </Card>
    );
}

export default Section;

//---------------------styled----------------//

const Card= styled(Column)`
    ${({$variant})=> VARIANTS[$variant].card}
    position: relative;
    ${({$grow})=>$grow && `flex-grow:1;`}
`;
const TitleText = styled(Text)`
    padding-top:${({$topoffset})=>`
      var(--spacing-${$topoffset})
    `};
`;
const MoreBtn = styled(Link)`
     background:var(--component-button-more-background);
     padding:var(--component-button-more-padding);
     border-radius:var(--component-button-more-radius);
     display: flex;
     cursor: pointer;
`;