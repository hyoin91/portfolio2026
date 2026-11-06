import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* 주소가 바뀌면 스크롤을 맨 위로.
   라우터는 페이지를 새로 받지 않고 내용만 바꿔 끼워서, 그냥 두면 이전 스크롤 높이가 남는다.
   주소에 #이 있으면 그 섹션을 화면 맨 위에 맞춘다 */
function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const target = document.getElementById(hash.slice(1));
            if (target) {
                target.scrollIntoView({ block: "start" });
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
}

export default ScrollToTop;
