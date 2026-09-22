import styled from "styled-components";
import Text from "../ui/Text";
import{ media } from "../../styles/media"
import { Column, RowBetween } from "../layout/Layout";
import profileSrc from "../../assets/images/profile.svg";

function ProfileCard(){

    return(
      
        <Card>
            <Photo src={profileSrc} alt="Hyoin Lee"/>
            <Scrim/>
            <Bottom>
                <Column>
                    <Text as="h3" size="heading" color="text-inverse" mdScale={0.75}>
                      Hyoin Lee
                    </Text>
                    <Text size="body" color="text-inverse">
                     UI Engineer
                    </Text>
                </Column>
                    <Text size="body" color="text-inverse">
                      2023 - Present
                    </Text>
            </Bottom>
        </Card>
    );
}
export default  ProfileCard;

//---------------------styled----------------//
const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: var(--component-card-default-radius);
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;   
  display: block;
`;

/* 사진 아래쪽을 어둡게 → 흰 글자 가독성 확보 */
const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #A3D7EA,  #a3d7ea00 45%);
`;

const Bottom = styled(RowBetween)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: flex-end;   /* RowBetween 기본 center를 아래정렬로 덮어씀 */
  padding: var(--component-card-default-padding);
  ${media.maxMd}{
      flex-direction: column;
      align-items: flex-start;
  }
`;
