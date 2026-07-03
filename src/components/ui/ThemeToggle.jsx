import { useState } from "react";
import styled from "styled-components"
import {Sun,Moon} from "lucide-react"
import Icon from "./Icon"

function ThemeToggle(){

    const [isDark, setIsDark] = useState(false);

    function handleClick(){

        const nextIsDark = !isDark;
        setIsDark(nextIsDark);
        document.documentElement.setAttribute(
            "data-theme", 
            nextIsDark ? "dark" 
            : "Light"
        );
    }
    return(
    <ToggleBtn onClick={handleClick}>
        <Icon 
            component={isDark ? Moon : Sun}
            size="md"
        />
    </ToggleBtn>
);
}

export default ThemeToggle;
//---------------------styled----------------//
const ToggleBtn = styled.button`
 display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--sizing-avatar-md);
  height: var(--sizing-avatar-md);
  border-radius: var(--border-radius-pill);
  background: var(--component-button-ghost-background);
`;