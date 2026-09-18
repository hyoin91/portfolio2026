import styled from "styled-components";
import Text from "../ui/Text";
import Section from "../common/Section";
import { Column } from "../layout/Layout";

function  KeyFeatures ({features=[]}){

    if(features.length === 0 ) return null;

    return(
        <KeyWrap>
 <Section
            title= "Key Features"
            variant="feature"
        >
            <Glow $size={400} $top={-74} $left={-39} />
            <Glow $size={400} $top={30} $left={47} />
            <Glow $size={400} $top={-90} $left={26} />
            <Glow $size={400} $top={25} $left={-10} />

            <Grid>
                {features.map((feature)=>(
                    <Item
                        key={feature.title}
                        $gap={1}
                    >
                        <Text
                            size="text"
                            weight="semibold"
                            color="text-on-feature"
                        >
                            {feature.title}
                        </Text>
                        <Text
                            size="caption"
                            color="text-on-feature-muted"
                        >
                            {feature.desc}
                        </Text>
                    </Item>
                ))}
            </Grid>
        </Section>
        </KeyWrap>
       
    )
}
export default KeyFeatures;
//---------------------styled----------------//
const KeyWrap =  styled.div`
    margin-top: auto;
    margin-bottom: calc(var(--component-card-default-padding) * -2);
   
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }

`;

const Glow = styled.span`
    position: absolute;
    z-index: -1;
    top: ${({ $top = 0 }) => `${$top}%`};
    left: ${({ $left = 0 }) => `${$left}%`};
    width: ${({ $size = 320 }) => `${$size}px`};
    height: ${({ $size = 320 }) => `${$size}px`};
    border-radius: 50%;
    background: radial-gradient(
        circle,
        var(--color-surface-feature-glow) 0%,
        transparent 67%
    );
    opacity: 0.5;
    pointer-events: none;
`;

const Item = styled(Column)`

    border: 0.5px solid var(--component-feature-card-border);
    border-radius: var(--component-feature-card-radius);
    padding: var(--component-feature-card-padding);

`;
