import styled from "styled-components";
import Text from "../ui/Text";
import Icon from "../ui/Icon";

import Section from "../common/Section";
import { Column, Row } from "../layout/Layout";

import { Bell, ChartLine, FolderTree, Share2, Sparkles } from "lucide-react";

const FEATURE_ICONS={
    alert:Bell,
    organize: FolderTree,
    chart: ChartLine,
    share: Share2,
};

function  KeyFeatures ({features=[]}){

    if(features.length === 0 ) return null;

    return(
        <KeyWrap>
 <Section
            title= "Key Features"
            variant="plain"
        >
            <List>
                {features.map((feature)=>(
                    <Item
                        key={feature.title}
                        $gap={1}
                    >
                        <IconWrap>
                            <Icon
                                component={FEATURE_ICONS[feature.icon] ?? Sparkles}
                                 size="sm"
                                
                                 strokeWidth={1.5}
/>
                        </IconWrap>
                        
                         <Text
                            size="text"
                            color="text-primary"
                        >
                            {feature.title}
                        </Text>
                        
                        
                    </Item>
                ))}
            </List>
        </Section>
        </KeyWrap>
       
    )
}
export default KeyFeatures;
//---------------------styled----------------//
const KeyWrap =  styled.div`
    margin-top: 0.5rem;
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
`;

const Item = styled(Row)`
    align-items: center;
    border-radius: var(--component-feature-card-radius);
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-background-page);   /* 흰 카드 위의 옅은 회색 줄 */
`;
const IconWrap = styled.div`
    flex: 0 0 auto;
    display: flex;
    border-radius: 50%;
    margin-right:var(--spacing-1);
    padding:var(--spacing-2);
    background: var(--color-surface-primary);
`;