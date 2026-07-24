import styled from "styled-components";
import { ArrowUpRight } from "lucide-react";
import Text from "../ui/Text";
import Icon from "../ui/Icon";
import { Column, RowBetween } from "../layout/Layout";

function Section({
    title,
    action,
    more,
    children,
    topOffset= 8,
    gap = 6
}){
    return(
        <Card $gap={gap}>
            <RowBetween>
                <TitleText 
                    size="heading" 
                    $topoffset={topOffset}
                    >
                    {title}
                </TitleText>
                {action ? action 
                    : more && (
                        <MoreBtn type="button">
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
    background:var(--component-card-default-background) ;
    border-radius: var(--component-card-default-radius);
    padding: var(--component-card-default-padding);
    box-shadow: var(--component-card-default-shadow);
`;
const TitleText = styled(Text)`
    padding-top:${({$topoffset})=>`
      var(--spacing-${$topoffset})
    `};
`;
const MoreBtn = styled.button`
     border: none;
     background:var(--component-button-more-background);
     padding:var(--component-button-more-padding);
     border-radius:var(--component-button-more-radius);
     display: flex;
     cursor: pointer;
`;