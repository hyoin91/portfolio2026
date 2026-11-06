/* 굿소비(goodsobi) 트러블슈팅.
   원문: 저장소 루트의 트러블슈팅.md
   한 건을 추가하려면 이 배열에 객체를 하나 더 넣으면 된다 — 배열 순서가 곧 노출 순서.
   id는 번호가 아니라 말로 짓는다(URL이 되고, 순서가 바뀌어도 링크가 안 깨진다).
   date = 포트폴리오에 올린 날(YYYY-MM-DD) — 대시보드 Latest Updates 에 이 값으로 뜬다. */
const goodsobi = [
  {
    id: "effect-infinite-loop",
    date: "2026-11-06",
    no: 33,
    title: "effect가 끝없이 다시 실행되던 무한 루프",
    area: "React Hooks · 리렌더링",
    summary: "렌더마다 새로 만들어지는 함수를 의존성에 넣어 effect가 끝없이 돌던 문제",
    feature: "공유 진입 — 쿠팡에서 공유한 상품을 찜하고 상세로 이동",

    problem:
      "쿠팡 앱에서 아직 찜하지 않은 상품을 공유하면, 찜은 저장되는데 상세 화면으로 넘어가지 않고 빈 화면에서 멈췄다. 앱(WebView)의 CPU가 103%, 메모리가 1.0GB까지 올랐고, 같은 IP의 API 요청 한도를 다 써서 429 응답을 받았다. 라이브 배포본에서 발생했다.",

    investigationIntro: "앱 팀이 실기기에서 잰 수치와 진단을 받아, 고리가 생기는 순서를 코드로 따라갔다.",
    investigation: [
      "share.phase가 \"done\"이 되면 effect가 실행되고, addToCart()로 찜 목록에 상품을 넣는다",
      "addToCart가 찜 목록 상태(setItems)를 바꾸면 CartProvider가 다시 렌더된다",
      "Provider 함수 본문이 다시 실행되면서 addToCart가 «내용은 같지만 다른» 새 함수로 만들어진다",
      "React는 의존성을 Object.is로 비교한다 → 이전 addToCart !== 새 addToCart → effect가 다시 실행되고 처음으로 돌아간다. 한 바퀴마다 찜 등록 POST가 한 건씩 나갔다",
    ],

    cause: [
      "useEffect 의존성 배열의 addToCart가 Context Provider에서 렌더마다 새로 만들어지는 함수였다",
      "그 함수를 부르는 일 자체가 Provider를 다시 렌더시켜, 함수가 바뀌고 effect가 다시 도는 고리가 생겼다",
    ],

    solution: [
      {
        text: "useRef로 «이미 처리함» 표시를 두어, effect가 다시 실행돼도 찜 추가와 이동은 한 번만 하게 했다.",
        lang: "diff",
        code: `+const handledRef = useRef(false);   // 화면에 그릴 값이 아니라 기억만 할 값 → ref

 useEffect(() => {
   if (share.phase !== "done") return;
+  if (handledRef.current) return;   // 두 번째 실행부터는 여기서 바로 나간다
   const v = share.verdict;
   if (v?.product_id == null) return;
+  handledRef.current = true;        // 일하기 «전»에 먼저 표시

   if (!v.is_favorited) addToCart(mapVerdictToCard(v));
   navigate(\`/prd/\${v.product_id}\`, { replace: true });
 }, [share.phase, share.verdict, addToCart, navigate]);`,
        note: "state가 아니라 ref인 이유 — state로 했다면 표시를 바꾸는 것 자체가 리렌더를 일으켜, 끊으려던 고리를 한 바퀴 더 돌렸을 것이다. 표시를 일하기 전에 세운 건, 찜 추가 도중 예외가 나도 다음 렌더에서 같은 일을 반복하지 않게 하려는 것이다.",
      },
      {
        text: "앱 팀이 준 처방 세 가지는 서로 대체재가 아니라, 푸는 문제가 달랐다.",
        table: {
          head: ["방법", "푸는 문제", "못 푸는 것"],
          rows: [
            ["useRef 깃발 (적용)", "중복 부수효과(POST·이동)", "effect가 계속 다시 실행되는 것 자체"],
            ["useCallback", "함수 참조가 렌더마다 바뀌는 것", "의존성이 바뀌면 함수는 다시 만들어진다"],
            ["Provider 구조 개선", "함수 참조 불안정, 불필요한 리렌더", "«한 번만 해야 하는 일»의 보장"],
          ],
        },
        note: "addToCart는 안에서 items를 직접 읽는다. 그래서 useCallback을 쓰려면 의존성에 items가 들어가는데, 이 함수가 바로 items를 바꾸니 결국 같은 고리가 남는다(코드를 읽고 내린 분석). 근본 해결은 Provider 구조 개선이고, «한 번만 해야 하는 일»에는 그 뒤에도 깃발을 안전장치로 남기는 게 자연스럽다.",
      },
    ],

    contribution: [
      { who: "앱 팀", text: "실기기 증상과 CPU·메모리·429 응답을 분석해 원인을 진단하고 해결 방향 제안" },
      { who: "AI", text: "useRef를 활용한 구현안과 적용 원리 설명" },
      { who: "본인", text: "제안된 해결 방식의 동작 원리를 학습하고 코드에 적용, 로컬 환경에서 동작 여부 검증" },
    ],

    result:
      "공유한 상품이 찜에 한 번만 담기고 바로 상세 화면으로 넘어간다. 반복 요청과 CPU 폭주가 사라졌다.",
    verification: [
      { who: "본인", text: "로컬에서 공유 주소로 진입해 상세 화면으로 이동하는 것을 확인" },
      { who: "앱 팀", text: "다음 배포본(20261006) 실기기 재검증 — 상세 이동 3/3, 렌더러 CPU 0%, 서버의 찜은 상품마다 1행" },
    ],
    tech: ["useEffect", "useRef", "Context API", "참조 동일성"],
    lessons: [
      "함수도 렌더마다 새로 만들어지는 «값»이다. 의존성 배열은 내용이 아니라 참조로 비교한다",
      "의존성이 매번 바뀐다고 배열에서 빼면 안 된다. 값을 안정시키거나, 한 번만 해야 하는 일을 따로 막는다",
      "useRef 깃발은 안전장치이지 원인 제거가 아니다. 최종 중복 방지는 멱등한 서버 API(already_favorited)가 받쳐 준다",
    ],
  },
  {
    id: "optimistic-overwrite",
    date: "2026-11-06",
    no: 40,
    title: "서버 응답이 방금 한 낙관적 업데이트를 덮어쓰던 문제",
    area: "비동기 경쟁 상태",
    summary: "늦게 도착한 찜 목록이 그 사이 추가한 찜을 통째로 덮어쓰던 문제",
    feature: "찜 — 공유로 찜하기, 앱 시작 직후 하트 누르기",

    problem:
      "쿠팡에서 공유하면 찜이 저장되고 상세로 넘어간다. 그런데 상세의 하단 버튼이 «찜하기»(= 안 찜함)로 보였고, 찜 탭에도 그 상품이 없었다. 서버에는 정상 저장돼 있어서 앱을 다시 켜야 보였다. 3번 중 2번만 재현됐다.",

    investigation: [
      "재현 조건부터 봤다 — 판정이 0.2초로 빠를 때만 나고, 2.5초로 느렸던 한 번은 정상이었다 → 타이밍 경쟁으로 판단",
      "앱이 켜지면 찜 목록 GET이 출발한다. 그 사이 공유가 화면에 찜을 낙관적으로 추가하고 POST를 보낸다",
      "늦게 도착한 GET 응답이 setItems(서버 목록)로 화면을 «GET이 출발한 시점의 목록»으로 통째 교체했다",
      "같은 구조라 «앱 켜자마자 하트 누르기»에서도 생길 수 있는 문제였다",
    ],

    cause: [
      "서버 응답으로 상태를 통째로 교체하는 코드가 «기다리는 동안 아무 일도 없었다»를 전제하고 있었다",
    ],

    solution: [
      {
        text: "세 가지 처방을 비교해 «합치기»를 골랐다.",
        table: {
          head: ["방법", "장점", "단점"],
          rows: [
            ["A. 로딩 중 변경을 기억했다가 도착한 목록에 다시 얹기 (적용)", "요청이 늘지 않음, «앱 켜자마자 하트»도 함께 해결", "코드가 조금 늘어남"],
            ["B. 로딩 중 변경이 있었으면 목록을 한 번 더 받기", "이해하기 쉬움", "요청 1번 추가, 깜빡일 수 있음"],
            ["C. 공유 쪽이 첫 로드가 끝난 뒤에 찜하기", "공유 파일만 고침", "«앱 켜자마자 하트» 문제는 남음"],
          ],
        },
        note: "원인이 덮어쓰기 한 줄에 있으니 거기를 고치는 게 맞다고 봤다. C는 공유라는 증상 하나만 막는다.",
      },
      {
        text: "로딩 중에 한 추가·삭제를 기억했다가, 도착한 목록 위에 다시 얹었다.",
        lang: "diff",
        code: `+const loadedRef = useRef(!hasInstallUuid());   // 첫 방문은 불러올 게 없으니 처음부터 «도착함»
+const addedWhileLoading   = useRef(new Map());  // id → 상품
+const removedWhileLoading = useRef(new Set());  // id
 …
-setItems(mapFavoritesTree(data));
+setItems(applyWhileLoading(mapFavoritesTree(data)));
 …
 .finally(() => {
+  loadedRef.current = true;                    // 이후엔 화면이 곧 최신 — 메모 중단
+  addedWhileLoading.current.clear();
+  removedWhileLoading.current.clear();
 });`,
        note: "메모는 화면에 그릴 값이 아니라 기억만 하는 값이라 useRef에 뒀다. 추가하면 «삭제 메모»를, 삭제하면 «추가 메모»를 지워 마지막 동작만 남긴다. 실패 폴백(localStorage)도 «덮어쓰기»라 같은 합치기를 적용했다.",
      },
    ],

    contribution: [
      { who: "앱 팀", text: "«빠를 때만 난다»는 재현 조건을 정리해 원인을 진단하고 해결 방법 세 가지 제안" },
      { who: "AI", text: "세 방법의 장단점을 비교해 합치기 방식을 추천하고, 로딩 중 변경을 useRef에 기억하는 설계 설명" },
      { who: "본인", text: "장단점 비교를 바탕으로 합치기 방식을 선택하고, 설계를 이해하며 CartContext에 단계별로 적용" },
    ],

    result:
      "앱을 켜자마자 공유하거나 찜해도, 찜이 화면과 찜 탭에 그대로 남는다. 요청 수는 늘지 않았다.",
    verification: [
      { who: "앱 팀", text: "10-20 실기기에서 수정 확인" },
    ],
    tech: ["낙관적 업데이트", "경쟁 상태", "useRef", "Context API"],
    lessons: [
      "«서버 응답으로 통째로 교체»는 «기다리는 동안 아무 일도 없었다»를 전제로 한다. 앱 시작 직후처럼 그 전제가 깨지는 곳을 따로 봐야 한다",
      "«가끔만 난다 / 빠를 때만 난다»면 경쟁 상태를 먼저 의심한다",
      "성공(.then)만 고치고 실패 폴백(.catch)을 빼먹기 쉽다. 폴백도 덮어쓰기다",
      "고치고 나니 다음 문제가 드러났다. 버그가 다른 버그를 가리는 경우가 있다",
    ],
  },
  {
    id: "scroll-jump",
    date: "2026-11-06",
    no: 27,
    title: "카테고리를 바꾸면 화면이 번쩍이며 맨 위로 튕기던 문제",
    area: "로딩 상태 설계 · UX",
    summary: "다시 불러오는 동안 목록이 스피너로 바뀌어 스크롤이 맨 위로 당겨지던 문제",
    feature: "상품 목록 — 카테고리 칩 전환",

    problem:
      "상품 목록을 한참 내려간 상태에서 다른 카테고리 칩을 누르면, 화면이 번쩍하고 «불러오는 중»이 잠깐 뜬 뒤 페이지 맨 위로 튕겨 올라갔다.",

    investigationIntro: "가설을 세우고 코드로 하나씩 확인했다.",
    investigation: [
      "가설 ① 주소가 바뀌어 스크롤을 올리는 코드가 돌았다 → ScrollTop은 주소(pathname)가 바뀔 때만 동작하는데, 카테고리는 주소를 바꾸지 않는다. 기각",
      "가설 ② 로딩 중 렌더링이 레이아웃을 바꿨다 → 레이아웃이 {loading ? <PageLoading/> : children}이었다. 카테고리를 바꾸면 상품 100개가 있던 본문이 스피너 하나로 교체된다",
      "문서 높이가 갑자기 줄어 브라우저가 스크롤을 위로 당긴 것이었다. «번쩍임»과 «튕김»은 같은 원인의 두 증상이었다",
    ],

    cause: [
      "«처음 들어와서 보여줄 게 없는 로딩»과 «이미 목록이 있는데 다시 불러오는 로딩»을 구분하지 않고, 둘 다 본문 전체를 스피너로 바꿨다",
    ],

    solution: [
      {
        text: "보여줄 게 하나도 없을 때만 로딩 화면을 띄우게 했다.",
        lang: "diff",
        code: `-<PageLayout loading={loading}>
+<PageLayout loading={loading && products.length === 0}>`,
        note: "레이아웃의 loading prop에는 «처음 들어와 아직 보여줄 것이 없을 때만 참으로 넘긴다»는 주석을 남겼다.",
      },
      {
        text: "같은 방향으로 로딩 표시를 상황별로 나눴다.",
        table: {
          head: ["상황", "보여주는 것"],
          rows: [
            ["처음 진입 · 카테고리 변경", "칩(탭)은 남기고 목록 영역만 스켈레톤"],
            ["더 보기", "스피너"],
            ["0.2초 안에 도착", "아무것도 안 그림 (useDelayedShow)"],
          ],
        },
        note: "훅에서 loadingFirst = loading && page === 1을 따로 내보내 «카테고리 변경»과 «더 보기»를 구분했다.",
      },
    ],

    // TODO: 누가 했는지 기록이 없음(문서 ❓) — 확인되면 contribution 추가

    result:
      "카테고리를 바꿔도 보던 자리에 머무르고 목록만 바뀐다. 처음 진입할 때는 로딩 화면이 나온다.",
    tech: ["조건부 렌더링", "로딩 상태 설계", "스켈레톤 UI", "Layout Shift"],
    lessons: [
      "«로딩 중»은 한 가지가 아니다. 아무것도 없는 상태의 기다림과, 있는 것을 새로 받는 기다림은 보여줄 것이 다르다",
      "높이가 있는 요소를 없애면, 그 아래 요소와 스크롤 위치가 함께 흔들린다",
      "첫 가설을 코드로 확인해 기각한 덕분에 엉뚱한 곳을 고치지 않았다",
    ],
  },
  {
    id: "push-deeplink",
    date: "2026-11-06",
    no: 26,
    title: "앱을 완전히 끈 상태에서만 푸시 딥링크가 사라지던 문제",
    area: "하이브리드 앱 · 실행 순서",
    summary: "웹이 리스너를 붙이기 전에 앱이 보낸 이벤트를 놓치던 문제",
    feature: "푸시 알림 — 탭하면 상품 상세로 이동",

    problem:
      "푸시 알림을 누르면 해당 상품 상세로 가야 한다. 앱이 켜져 있을 때는 정상이었지만, 앱을 완전히 끈 상태에서 누르면 홈 화면이 떴다. 앱이 켜진 상태에서 «정상»으로 확인하고 넘어갔던 버그였다.",

    investigation: [
      "앱 로그로 «알림 수신 → 보관 → 웹 준비 신호 수신 → 보관분 전달» 네 단계가 모두 통과한 것을 확인 → 앱은 보냈고 웹이 못 받았다",
      "웹 준비 신호와 이벤트 전달이 같은 밀리초(12:59:56.447)에 찍혀 있었다",
      "웹의 리스너는 React가 마운트된 뒤 useEffect에서 붙는다. 앱이 꺼져 있다 켜질 때는 그보다 먼저 이벤트가 와 있었다",
    ],

    cause: [
      "이벤트는 그 순간 지나가 버린다. 리스너가 붙기 전에 온 딥링크는 아무도 받지 못했고, 다시 받을 방법도 없었다",
      "앱이 켜진 상태와 꺼진 상태는 코드 실행 순서가 통째로 달랐다",
    ],

    solution: [
      {
        text: "앱이 window.__APP__.deeplink에 남겨 둔 값을 마운트 때 한 번 읽어 회수했다.",
        lang: "diff",
        code: ` useEffect(() => {
   if (!isInApp) return;
+  const handle = (payload) => {
+    const raw = payload?.product_id;
+    const productId = raw == null || raw === "None" ? null : raw;
+    if (productId) navigate(\`/prd/\${productId}\`);
+  };
+  const onDeeplink = (e) => handle(e.detail);
   window.addEventListener("app:deeplink", onDeeplink);   // ① 리스너를 먼저
+  handle(window.__APP__?.deeplink);                      // ② 이미 와 있던 값 회수
+  if (window.__APP__) window.__APP__.deeplink = null;    // ③ 소비했으니 비움
   return () => window.removeEventListener("app:deeplink", onDeeplink);
 }, [navigate]);`,
        note: "리스너를 먼저 걸고 그다음 값을 읽어야, 그 사이에 오는 이벤트도 놓치지 않는다. 읽은 뒤 null로 비워 새로고침해도 다시 이동하지 않게 했다.",
      },
    ],

    contribution: [
      { who: "앱 팀", text: "앱 로그로 끊긴 지점 확인, 타임스탬프 단서 발견, 원인 진단과 처방(window.__APP__.deeplink 읽기) 제시" },
      // TODO: 실제 코드 작성 · 순서/비우기 결정을 누가 했는지(문서 ❓) — 확인되면 추가
    ],

    result:
      "앱을 완전히 종료한 상태에서 알림을 탭해도 그 상품 상세로 간다.",
    verification: [
      { who: "앱 팀", text: "09-18 배포본 실기기에서 확인" },
    ],
    tech: ["Android WebView", "CustomEvent", "useEffect", "하이브리드 앱 브리지"],
    lessons: [
      "이벤트는 그 순간 지나가고, 상태는 남는다. 놓치면 안 되는 값은 상태에 정본을 두고, 이벤트는 알림으로만 쓴다",
      "«한 상황에서 됐다»가 «다른 상황에서도 된다»를 보증하지 않는다",
      "앱/웹 경계 문제는 어느 쪽에서 끊겼는지부터 가르면 빠르다",
    ],
  },
  {
    id: "first-visit-blank",
    date: "2026-11-06",
    no: 34,
    title: "첫 방문자에게만 앱 전체가 빈 화면이던 문제",
    area: "디버깅 · Error Boundary",
    summary: "첫 방문자만 지나는 분기에서 지워진 setter를 불러 앱 전체가 멈추던 문제",
    feature: "앱 전체 — 공유 링크로 처음 들어온 사용자",

    problem:
      "공유 링크를 받은 지인이 빈 화면만 보인다고 했다. 같은 주소가 내 쪽에서는 정상이었다.",

    investigationIntro: "«나는 되는데 지인은 안 된다» — 두 환경의 차이를 하나씩 지워 나갔다.",
    investigation: [
      "서버가 그 주소에 돌려주는 응답(상태 200 · OG · 번들 파일명)을 확인 → 정상. 서버가 아니라 브라우저에서 실행될 때의 문제",
      "배포 시점이 엇갈렸을 가능성 → 지인이 방금 열었다고 해서 기각",
      "카카오톡 인앱 브라우저만의 문제인지 → 크롬·삼성 인터넷에서도 안 나와서 기각",
      "«나는 앱이 있고 지인은 없다»는 차이를 «처음 방문한 사람»으로 다시 읽었다",
      "시크릿 창(저장소가 빈 첫 방문 상태)으로 열자 재현 → 콘솔에 setLoading is not defined",
    ],

    cause: [
      "CartContext의 «첫 방문자면 서버 호출을 건너뛴다» 분기가, 이미 지워진 상태의 setter를 부르고 있었다",
      "이 Provider가 앱 전체를 감싸서 첫 방문자는 홈·검색·상세 전부 빈 화면이었다. 개발하는 쪽은 기기에 사용자 ID가 늘 있어서 이 분기에 들어가 본 적이 없었다",
    ],

    solution: [
      {
        text: "문제의 한 줄을 지우고, 같은 종류(부르는데 정의가 없는 setter)가 더 있는지 코드 전체를 검색했다.",
        lang: "diff",
        code: ` useEffect(() => {
   // 첫 방문이면 서버에 아무것도 없다 — 건너뛴다
   if (!hasInstallUuid()) {
-    setLoading(false);
     return;
   }
   apiGet("/me/favorites/tree/")`,
      },
      {
        text: "빈 화면 대신 원인을 보여주는 안전망(Error Boundary)을 Provider 바깥에 뒀다.",
        lang: "jsx",
        code: `{/* Provider «바깥»에 둔다 — 이번에 터진 것이 CartProvider였고,
    안쪽에 두면 그걸 못 잡는다 */}
<ErrorBoundary>
  <AuthProvider>
    <CartProvider>
      …
    </CartProvider>
  </AuthProvider>
</ErrorBoundary>`,
        note: "Error Boundary는 아직 class 컴포넌트로만 만들 수 있다. 일부러 에러를 터뜨려 화면에 에러 문구가 나오는 것을 확인했다.",
      },
    ],

    contribution: [
      { who: "본인", text: "«나는 앱이 있고 지인은 없다»는 환경 차이를 짚고, 시크릿 창에서 콘솔 에러를 확보해 재현" },
      { who: "본인", text: "원인 코드를 제거하고 Error Boundary 도입을 우선하기로 결정, 일부러 에러를 내 동작 검증" },
      { who: "AI", text: "서버 응답 확인과 가설 제시·기각, 환경 차이를 «첫 방문자»로 재해석해 시크릿 창 재현 제안" },
      { who: "AI", text: "같은 유형의 오류(정의 없는 setter) 전체 검색, Error Boundary 위치와 구현 방식 제안" },
    ],

    result:
      "첫 방문자도 화면을 정상으로 본다. 앞으로 렌더 중 에러가 나도 빈 화면 대신 원인이 화면에 표시된다.",
    verification: [
      { who: "본인", text: "localhost 시크릿 창에서 정상 표시 확인, 수정본(dist 20261007) 배포 요청" },
    ],
    tech: ["Error Boundary", "Context API", "디버깅", "재현 조건 좁히기"],
    lessons: [
      "«나는 되는데»는 가장 강한 단서다. 그 차이를 «앱 유무»가 아니라 «방문 이력»으로 읽어내는 게 핵심이었다",
      "개발자는 늘 재방문자다. 첫 방문자 전용 분기를 건드렸으면 시크릿 창으로 한 번 열어 본다",
      "상태를 지울 때는 그 setter를 쓰는 곳을 전부 검색한다. 문서 메모도 코드와 함께 낡는다",
      "빌드는 «없는 이름»을 잡지 못한다. 빈 화면은 아무것도 알려주지 않으니 에러 경계가 기본 안전망이다",
    ],
  },
];

export default goodsobi;
