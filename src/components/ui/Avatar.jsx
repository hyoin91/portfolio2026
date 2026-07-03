import styled from "styled-components";
import avatarSrc from "../../assets/images/avatar.svg"


function Avatar({ src = avatarSrc, alt = "profile" }) {
  return <StyledAvatar src={src} alt={alt} />;
}

export default Avatar;

//---------------------styled----------------//

const StyledAvatar = styled.img`
  width: var(--sizing-avatar-md);
  height: var(--sizing-avatar-md);
  border-radius: 50%;
  object-fit: cover;
`
