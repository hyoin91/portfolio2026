# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 가이드다.
배경 설명이 더 필요하면 `portfolio_claude_handoff.txt`(인수인계 메모, 한글)를 참고할 것.

## 사용자 배경 (코드 설명 시 참고)

사용자는 퍼블리셔(HTML/CSS 마크업·퍼블리싱 실무 경력 있음)이고, React는 공부한
지 얼마 안 된 초기 학습 단계다. 코드를 설명하거나 분석할 때:

- prop, state, hook, JSX 같은 React 개념은 당연히 아는 걸로 가정하지 말고
  정의부터 짚어줄 것 (가능하면 HTML/CSS로 이미 알고 있을 개념에 빗대어 설명).
- `key`, `end` 같은 특정 컴포넌트 전용 prop이 나오면 "왜 이 prop이 필요한지"
  (버그/문제 상황)까지 설명할 것 — 단순히 "이런 게 있다"보다 "이게 없으면 어떤
  문제가 생기는지"가 이해에 더 도움이 됨.
- 사용자가 직접 짠 코드를 붙여넣고 해석해달라고 하는 경우가 많으므로, 코드
  한 줄 한 줄 짚어가며 설명하는 스타일을 유지할 것.
- 다른 프로젝트(`C:\Users\91081\Desktop\goodsobi`, 이하 "굿소비")와 자주 비교하며
  질문함. 굿소비 코드를 그대로 복붙하기보다, 이 프로젝트의 토큰 이름 체계에 맞게
  다시 짜주는 방향으로 안내할 것 (두 프로젝트의 CSS 변수 네이밍이 다름).
- **설명 포맷 (사용자가 명시적으로 선호한다고 확인함, 2026-07-02):**
  1. 여러 개념이 얽혀 있으면 번호로 먼저 분리해서 각각 정의부터 (예: "1. to / 2. end")
  2. 지금 짜고 있는 실제 코드 대신 **간단한 새 예시**(다른 메뉴/변수명 등)로 개념을
     먼저 이해시키고, 맨 마지막에 실제 프로젝트 코드에 적용해서 마무리
  3. before/after 비교는 표로 보여주되 **한 번에 하나의 차이만** 비교 (여러 변수를
     동시에 표에 욱여넣지 말 것)
  4. "언제/왜 쓰는지"를 실무에서 대조되는 두 케이스로 보여주기 (예: 정확히 일치해야
     하는 상황 vs 느슨하게 유지돼야 하는 상황)
  5. 마지막에 기억하기 쉬운 한 줄 요약으로 정리

## 작업 방식 (필독)

사용자가 연습 삼아 직접 타이핑하며 코드를 작성하고 싶어한다. **Write/Edit 도구로
파일을 직접 만들거나 수정하지 말 것 — 설정 파일, package.json, 컴포넌트, 스타일
등 파일 종류를 가리지 않고 전부 해당된다.** 대신 코드를 채팅에 코드블록으로
제시하고 사용자가 직접 파일에 붙여넣도록 한다. `npm install` 같은 명령 실행이나
`git` 조작처럼 파일 내용 자체가 아닌 작업은 지금까지처럼 직접 수행해도 되지만,
실행 전 사용자에게 알리고 진행하는 편이 안전하다. 사용자가 "이번엔 네가 직접
써줘" 등으로 예외를 요청하면 그때만 직접 파일을 수정한다.

**git 커밋은 사용자가 명시적으로 요청할 때만 한다** (harness 공통 규칙). 의미
있는 마디(예: 라우팅 정상 동작 확인, 컴포넌트 하나 완성 등)에 도달하면 먼저
"여기서 커밋할까요?"라고 물어보고, 사용자가 승낙하면 그때 커밋한다. 사용자가
먼저 자주 커밋하도록 요청하는 습관은 없으므로, Claude가 적절한 타이밍마다
제안하는 역할을 한다 (2026-07-02 확인).

각종 버그(오타, import 누락, 대소문자 불일치 등)를 확인할 때는 사용자가 붙여넣은
말만 믿지 말고 실제 파일을 다시 Read해서 확인할 것 — 이 프로젝트에서 "다
고쳤다"고 했는데 실제로는 일부만 반영된 경우가 여러 번 있었다.

## 프로젝트 개요

- 이름: portfolio2026 (로컬 폴더명: `portfolio`)
- GitHub: hyoin91/portfolio2026
- React 기반 개인 포트폴리오. 단순 소개 페이지가 아니라 **CMS / Dashboard 스타일의
  Portfolio Management System** 컨셉으로 만든다.
- 목표: 디자인 토큰 기반 디자인 시스템(Figma Tokens Studio → GitHub → CSS
  Variables → styled-components)을 포트폴리오 자체의 강점으로 보여주고,
  대표 프로젝트인 Goodsobi(React 기반 소비 관리 서비스)를 중심으로 구성한다.
- 사용자가 별도로 실제 대시보드 디자인 시안(이미지)을 공유함 — 상단에 로고+가로
  탭 네비(Dashboard/Projects/About/Contact)+다크모드 토글+프로필 아바타가 있는
  헤더, 그 아래 Skill Balance/프로필 카드/Recently Project/Project State/
  Features Project(굿소비)/Key Features 등 카드형 대시보드 레이아웃. **당초
  인수인계 메모의 "왼쪽 세로 Sidebar" 구상은 이 시안 확인 후 "상단 가로 Header"로
  변경됨.**

## 현재 상태 (2026-07-02 기준)

### 완료됨

- **Vite + React 초기화**: `package.json`, `vite.config.js`, `index.html` 직접
  작성 (기존 파일과 충돌 방지 위해 `npm create vite`는 사용 안 함).
- **설치된 패키지**: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`,
  `styled-components`, `react-router-dom`(v7), `lucide-react`.
- **라우팅**: `main.jsx`(`BrowserRouter`) → `App.jsx`(`ThemeProvider` +
  `GlobalStyle` + `Router`) → `routes/Router.jsx`(`MainLayout`을 레이아웃
  라우트로 감싸고 그 안에 `/`, `/projects`, `/projects/:id`, `/about`,
  `/contact`를 중첩 라우트로 등록. `/design-system`은 아직 주석 처리됨) 구조
  정상 동작 확인.
- **레이아웃 컴포넌트**:
  - `components/layout/MainLayout.jsx` — `Header` + `<Outlet />` 구조. 완료.
  - `components/layout/Header.jsx` — `Logo`(로고 이미지) + `Nav` + `Avatar`
    조립 완료. 로고는 별도 파일/컴포넌트로 안 만들고, `Header.jsx` 안에
    `const Logo = styled.img\`\`;`로 가볍게 로컬 정의만 해서 씀 (재사용도
    안 되고 props도 안 받는 정적 이미지라 분리할 필요 없다고 판단 — "언제
    컴포넌트로 분리하는가" 판단 기준: 재사용되는지 / props로 달라지는지 /
    내부 로직·상태가 있는지, 셋 다 아니면 분리 안 함).
  - `components/layout/Nav.jsx` — 원래 `Sidebar.jsx`였던 걸 시안(상단 가로
    탭)에 맞춰 이름 변경 + 스타일 조정 완료.
  - `src/assets/icons/logo.svg`, `src/assets/images/avatar.svg` 파일 존재,
    각각 `import`로 불러와서 사용 중 (문자열 경로 직접 쓰지 않음).
- **UI 프리미티브 컴포넌트** (`components/ui/`):
  - `Icon.jsx` — `size`(`--sizing-icon-*`)/`color`(`--color-*`) 토큰 연결,
    `component`(SVG 컴포넌트, 예: lucide-react) 또는 `src`(이미지) 둘 다 지원.
    굿소비의 `Icon.jsx`에서 rotate/variant/dark-invert 등은 빼고 단순화한 버전.
  - `Text.jsx` — `src/styles/typography.js` 기반, `size` prop 하나로 폰트
    스타일 결정 (`as` prop으로 실제 태그는 자유롭게 변경 가능).
  - `Avatar.jsx` — 프로필 이미지, `src/assets/images/avatar.svg`를 기본값으로
    import해서 사용. 완료.
  - `ThemeToggle.jsx` — `useState`로 `isDark` 상태 관리, 클릭 시
    `document.documentElement.setAttribute("data-theme", ...)`로 실제
    라이트/다크 전환. Sun/Moon(lucide-react) 아이콘으로 현재 상태 표시.
    `Header.jsx`에 조립 완료, 사용자가 직접 테스트해서 정상 동작 확인함
    (2026-07-03). 사소한 오타로 다크 아닐 때 값이 `"Light"`(대문자 L)로
    들어가는데, `tokens.css`가 `[data-theme="dark"]`만 특별 취급이라 실제
    동작엔 영향 없음 — 급하지 않으면 나중에 소문자로 정리.
  - `layout` vs `ui` vs `common` 폴더 구분 컨벤션 확정: `layout`=페이지 구조를
    한 번만 잡는 뼈대(MainLayout/Header/Nav), `ui`=어디서든 재사용되는 원자
    단위 부품(Icon/Text/Avatar/ThemeToggle), `common`=여러 페이지 공용 조합형
    UI(현재 미사용).
- **`src/styles/typography.js`**: 굿소비처럼 `variant`+`size` 두 축이 아니라
  `caption`/`body`/`title`/`heading`/`display` 다섯 단계 이름 하나만 쓰는 축으로
  결정함 (실무에서도 Tailwind/Chakra 등은 축 하나가 더 일반적). `body`가 기본값.
  `title`/`heading`/`display`에는 `responsive` 서브 객체(768px 이하에서 폰트
  크기+굵기를 같이 축소)를 추가함. `Text.jsx`는 `bold` prop(수동 강조,
  반응형 상태에서도 우선 적용)도 지원함.
- **디자인 토큰 대개편** (아래 "디자인 토큰 아키텍처" 절 참고): core/semantic/
  component 섹션 분리, component가 semantic을 `var()` 체인으로 참조하도록 개편,
  dark에 하드코딩됐던 값들 core로 승격, 안 쓰는 색상 정리, 빌드 스크립트를
  CommonJS → ESM으로 전환.
- 모든 페이지 컴포넌트(`Dashboard`, `Projects`, `ProjectDetail`, `DesignSystem`,
  `About`, `Contact`)는 최소 placeholder 상태로 존재하고 라우팅까지는 연결됨.

### 진행 중 / 미완료

- **`Header` 완성됨** (Logo + Nav + ThemeToggle + Avatar, 2026-07-03). 다음
  단계는 페이지 콘텐츠 구현.
- 아이콘 사이즈(`sizing.icon.*`) 전체가 화면 크기에 따라 한꺼번에 줄어드는
  방식은 사용자가 원치 않는다고 확인함 (모든 아이콘이 같이 줄어드는 게 안
  맞다고 판단). 대신 `Text`의 `title`/`heading`/`display`처럼, 반응형이
  필요한 컴포넌트마다 개별적으로 `responsive` 오버라이드를 넣는 방식으로 감.
- `src/data/projects.js`, `src/data/skills.js` — 빈 파일.
  `src/components/common/`, `src/utils/` — 아직 사용 안 함.
  `docs/DESIGN_SYSTEM.md` — 빈 파일.
- Dashboard/Projects/ProjectDetail/About/Contact/DesignSystem 페이지 전부
  실제 UI(시안 기준) 미구현, placeholder 텍스트만 있음.

## 디자인 토큰 아키텍처

원칙: **Core → Semantic → Component** (component는 semantic만 참조, raw 값이나
core를 직접 참조하지 않음)

- 토큰은 `tokens/portfolio-tokens.json` **단일 파일**로 존재하며,
  `$metadata.tokenSetOrder`로 `core / semantic-light / semantic-dark /
  component` 세트를 구분한다. 원래 있던 최상위 `"portfolio"` 키(레거시,
  빌드 스크립트가 아예 안 읽던 죽은 블록)는 삭제 대상으로 안내함 —
  실제로 지워졌는지 확인 필요.
- **안 쓰는 색상 정리**: `color.blue.600/700`, `color.neutral.200`,
  `color.glass.white64/black48`는 어디서도 참조되지 않아 core에서 제거하도록
  안내함.
- **semantic-dark 하드코딩 → core 참조로 통일**: 기존엔 semantic-dark의 여러
  색(`brand.primary` 등)이 core 참조 없이 직접 hex로 박혀 있었음. 색상 값은
  전혀 안 바꾸고, 그 값들을 core에 새 스텝으로 승격해서 참조하게 정리함
  (`purple.25/200/300/750/950`, `blue.400`, `teal.300` 추가, Key Features
  패널/카드용 회색빛 청록 톤은 기존 teal/neutral과 색감이 안 맞아 새 그룹
  `color.slate`(100/600/700/800/900)로 분리).
- `core.sizing.icon`에 `xl`(40px) 추가함 (`Icon` 컴포넌트가 `xs`~`xl` 5단계
  지원하도록).
- component 토큰에서 실제 UI 롤 라벨(frontend/publishing/design)은 **chip이
  아니라 badge**로 다룬다 (`component.badge.frontend/publishing/design`).

### 빌드 스크립트 — ESM으로 전환됨

`package.json`에 Vite/React용 `"type": "module"`을 넣으면서 기존 CommonJS
(`require`/`module.exports`) 스크립트가 깨짐 → `scripts/build-css.js`,
`build-theme.js`, `build-tokens.js` 전부 `import`/`export` 문법으로 재작성함.
`require.main === module` 같은 "단독 실행 감지"는 크로스플랫폼에서 번거로워서
제거하고, `build-tokens.js`만 직접 실행되는 진입점으로 단순화함.

### tokens.css 생성 방식 — 참조 체인을 `var()`로 유지

`build-css.js`는 이제 참조(`{color.purple.500}`)를 만나면 **끝까지 resolve해서
최종 리터럴 값으로 바꾸지 않고, 딱 한 단계만 `var(--color-purple-500)`로
연결한다.** 그래서:
- `tokens.css`의 `:root`에 Core/Semantic(light)/Component 섹션이 주석으로
  분리되어 나온다.
- component 값은 항상 `var(--color-brand-soft)`처럼 semantic을 가리키는
  참조로 나오고, `[data-theme="dark"]` 블록엔 component가 아예 안 나온다
  (semantic 변수만 바뀌면 component는 CSS 캐스케이딩으로 자동으로 따라감).
- `:root` = 기본값(라이트)이자 항상 적용되는 안전망, `[data-theme="dark"]` =
  그 위에 얹는 예외 오버라이드. `data-theme` 속성이 아직 없어도(다크모드 토글
  기능 만들기 전에도) 사이트가 라이트로 정상 표시되는 이유가 이것.

### 스타일 작성 컨벤션 — `var(--x)` 직접 사용, `theme.xxx` 지양

- `theme.js`의 값은 실제 색상이 아니라 전부 `var(--x)` 문자열만 감싼 것이라
  (`build-theme.js`가 값이 아니라 변수명만 변환), `theme.xxx`로 접근하나
  `var(--x)`로 직접 쓰나 결과 CSS가 완전히 동일하다. `lightTheme`/`darkTheme`도
  내용이 같다 — 실제 라이트/다크 전환은 `<html data-theme="dark">` 속성과
  `tokens.css`의 `[data-theme="dark"]` 블록이 담당한다.
- 위 이유로 **styled-components 스타일 작성 시 `theme.xxx` 대신 `var(--x)`를
  직접 쓰기로 확정함** (2026-07-02). `ThemeProvider`/`theme.js` 연결은
  유지하되(추후 필요해지면 활용), 현재 컴포넌트 스타일링에서는 안 쓴다.

### 자동 생성 파일 — 직접 수정 금지

- `src/styles/tokens.css`, `src/styles/theme.js`
- 수정이 필요하면 `tokens/portfolio-tokens.json`을 고친 뒤 재생성:

```
node scripts/build-tokens.js
```

## 이미지/아이콘 자산 규칙

- **사진류(프로필 등)**: `src/assets/images/`에 넣고, 쓰는 컴포넌트에서 파일
  전체 경로를 `import`해서 사용 (`<img src="...">`처럼 문자열 경로를 직접 쓰면
  Vite가 처리 못해서 깨짐). 예: `import avatarSrc from "../../assets/images/avatar.svg";`
- **아이콘**: 커스텀 아이콘 모음 파일(`images.js` 식)을 따로 안 만들고
  `lucide-react`를 이름으로 바로 import해서 `Icon` 컴포넌트에 넘긴다.
  `<Icon component={Search} size="md" color="text-secondary" />`. `Icon.jsx`가
  아이콘 자체를 대체하는 게 아니라, 어떤 아이콘이든 우리 토큰 시스템(사이즈/색상)에
  연결해주는 어댑터 역할이라 계속 유지함.

## 환경 관련 주의사항

- 인수인계 메모(`portfolio_claude_handoff.txt`)는 사용자의 **원래 CMD 환경** 기준으로
  작성되었지만, 실제로는 사용자가 별도 cmd 창을 쓰기도 하고 PowerShell도 쓴다.
  명령어 안내 시 사용자가 어떤 셸을 쓰는지(프롬프트 모양으로 구분: `C:\...>`는
  cmd, `PS C:\...>`는 PowerShell) 확인하고 그에 맞게 안내할 것.

## 다음 작업 순서

1. `Dashboard` 페이지를 시안 기준으로 실제 구현 (Welcome, Skill Balance,
   프로필 카드, Recently Project, Project State, Features Project, Key
   Features 등 섹션별로 나눠서 진행 권장).
2. Goodsobi 대표 프로젝트 카드 + Key Features를 토큰 기반 스타일로 구현.
3. `DesignSystem` 페이지 구현 (Core/Semantic/Component 토큰, 컬러 팔레트,
   타이포그래피, Button/Badge/Chip/Card 샘플, Light/Dark 구조 소개).
4. `Projects`, `ProjectDetail`, `About`, `Contact` 페이지 실제 콘텐츠 구현.

## 대표 프로젝트: Goodsobi (참고용 콘텐츠)

Dashboard/Projects 페이지에 들어갈 소개 문구와 핵심 기능은
`portfolio_claude_handoff.txt` 16번 항목 참고. 요약:

- "상품의 최저가 알림과 찜 관리를 제공하는 React 기반 소비 관리 서비스"
- 최저가 알림 설정, 찜 상품 관리(저장·삭제·Undo), 드래그 앤 드롭 폴더 정리,
  최근 검색어 저장(localStorage)

굿소비 실제 소스는 `C:\Users\91081\Desktop\goodsobi`에 있음. 사용자가 종종
그 프로젝트의 컴포넌트(`Icon.jsx`, `Text.jsx` 등)를 참고하자고 하는데, CSS
변수 네이밍이 이 프로젝트와 달라서(`--ds-*` 접두사 vs 접두사 없음) 그대로
복붙하면 깨진다 — 패턴만 참고하고 이 프로젝트 토큰 이름에 맞게 새로 작성할 것.
