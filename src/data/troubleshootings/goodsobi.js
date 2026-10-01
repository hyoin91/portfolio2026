/* 굿소비(goodsobi) 트러블슈팅.
   원문: 저장소 루트의 트러블슈팅.md
   한 건을 추가하려면 이 배열에 객체를 하나 더 넣으면 된다 — 배열 순서가 곧 노출 순서.
   id는 번호가 아니라 말로 짓는다(URL이 되고, 순서가 바뀌어도 링크가 안 깨진다). */
const goodsobi = [
  {
    id: "search-race",
    no: 2,
    title: "검색 결과에 이전 검색이 섞이던 문제",
    area: "비동기 처리",
    summary: "늦게 도착한 이전 응답이 새 결과를 덮어쓰던 문제",
    feature: "상품 검색 — 검색어 입력, 정렬 변경, 무한 스크롤",

    problem:
      "검색어나 정렬을 빠르게 바꾸면 이전 조건의 결과가 화면에 남거나 섞였다. 새로 검색했는데 1페이지가 아니라 2페이지부터 요청이 나가기도 했다.",

    investigationIntro: "증상이 두 개였다. 원인이 같은지 다른지부터 나눴다.",
    investigation: [
      "요청을 보낸 순서와 응답이 도착한 순서를 비교했다 → 먼저 보낸 요청이 나중에 도착하는 경우가 있었다. 늦게 온 옛날 결과가 새 결과를 덮어쓰고 있다고 봤다",
      "\"2페이지부터 요청\" 증상은 따로 봤다. 페이지 번호를 1로 되돌리는 코드의 위치를 확인하니 useEffect 안이었다",
      "useEffect는 화면을 다 그린 뒤에 실행된다. 즉 검색어가 바뀐 그 순간에는 아직 옛날 페이지 번호로 요청이 이미 나간 뒤였다",
    ],

    causeIntro: "원인이 둘이었다.",
    cause: [
      "응답 순서 뒤바뀜 — 네트워크는 먼저 보낸 요청이 먼저 도착한다고 보장하지 않는다. 늦게 온 이전 결과가 새 결과를 덮었다",
      "되돌리는 시점 — 페이지 번호 리셋을 useEffect로 미뤄서, 낡은 번호로 요청이 한 번 더 나갔다",
    ],

    solution: [
      {
        text: "페이지 리셋을 화면 그리는 도중에 처리했다.",
        lang: "diff",
        code: `-useEffect(() => {
  -  setPage(1);
  -  setProducts([]);
  -}, [keyword, sortId, categoryId]);       // 한 박자 늦는다
  +// 검색 조건이 바뀌면 그 자리에서 바로 되돌린다
  +const [query, setQuery] = useState({ keyword, sortId, categoryId });
  +if (query.keyword !== keyword || query.sortId !== sortId || query.categoryId !== categoryId) {
  +  setQuery({ keyword, sortId, categoryId });
  +  setPage(1);
  +  setProducts([]);
  +}`,
        note: "낯설어 보이지만 React가 \"이전 값을 보고 상태를 조정할 때\" 권장하는 방식이다. 이렇게 하면 React가 요청을 내보내기 전에 되돌린 값으로 다시 계산한다.",
      },
      {
        text: "늦게 온 응답은 버리게 했다.",
        lang: "diff",
        code: ` useEffect(() => {
  +  let ignore = false;                     // 이 요청이 아직 유효한가
     apiGet(\`/products/?\${params}\`)
       .then((data) => {
  +      if (ignore) return;                 // 조건이 이미 바뀌었으면 버린다
         setProducts(prev => page === 1 ? mapped : [...prev, ...mapped]);
       });
  +  return () => { ignore = true; };        // 조건이 바뀌면 이전 요청을 무효로
   }, [keyword, sortId, categoryId, page]);`,
        note: "요청을 아예 취소하는 방법(AbortController)도 있었다. 하지만 이미 나간 요청을 취소하는 것보다 결과를 무시하는 쪽이 단순하고 부작용이 없다고 판단했다. 어차피 서버는 응답을 만들었고, 우리가 안 쓰면 그만이다.",
      },
      {
        text: "무한 스크롤은 IntersectionObserver로 만들었다. 화면 맨 아래 감지용 요소를 두고, 그게 보이면 다음 페이지를 부른다. 스크롤 이벤트를 계속 듣는 방식보다 가볍다.",
      },
    ],

    result:
      "검색어와 정렬을 빠르게 바꿔도 결과가 섞이지 않는다. 쓸데없이 나가던 중복 요청도 사라졌다.",
    tech: ["React Hooks", "IntersectionObserver", "비동기 처리", "REST API"],
    value:
      "응답 순서가 뒤바뀌는 문제를 알아채고 처리한 사례라 난이도가 높다. 두 증상을 뭉뚱그리지 않고 나눠서 각각 원인을 찾은 과정, AbortController 대신 플래그를 택한 판단 근거가 드러난다. React가 언제 무엇을 실행하는지에 대한 이해도 함께 보여준다.",
  },
  {
    id: "dnd-click",
    no: 8,
    title: "폴더 안 상품을 눌러도 상세로 가지 않던 문제",
    area: "dnd-kit · 클릭과 드래그",
    summary: "클릭과 드래그를 가르는 기준선이 없어 클릭이 드래그로 오해받던 문제",
    feature: "찜 폴더 — 드래그로 정리, 상품 상세 이동",

    problem:
      "폴더를 열어 상품 썸네일을 눌러도 아무 반응이 없었다. 다른 화면에서는 \"가끔 안 눌린다\"는 증상도 있었다.",

    investigationIntro: "두 증상을 따로 봤다.",
    investigation: [
      "폴더 안 카드에 클릭 처리가 있는지부터 확인 → onClick이 아예 없었다. 고장 난 게 아니라 안 만든 것이었다",
      "\"가끔 안 눌린다\"는 별개 문제로 보고 dnd-kit(드래그 라이브러리) 설정을 확인 → 드래그를 시작하는 조건이 없었다",
      "조건이 없으면 1px만 움직여도 드래그로 판정되어 클릭이 취소된다. 사람이 버튼을 누를 때 손가락은 항상 미세하게 움직인다. 그래서 \"가끔 안 눌린다\"로 나타난다",
    ],

    cause: [
      "클릭 처리를 안 만들었다",
      "드래그와 클릭을 가르는 기준선이 없어서 클릭이 드래그로 오해받았다",
    ],

    solution: [
      {
        text: "클릭을 연결했다.",
        lang: "diff",
        code: ` <FolderThumb
     src={resizeThumb(item.thumbnail, THUMB.sm)}
     alt={item.Name}
  +  onClick={() => navigate(\`/prd/\${item.id}\`)}
   />`,
      },
      {
        text: "드래그 시작 기준선을 넣었다.",
        lang: "diff",
        code: ` const sensors = useSensors(
  -  useSensor(PointerSensor),
  -  useSensor(TouchSensor)
  +  useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  +  useSensor(TouchSensor,   { activationConstraint: { delay: 150, tolerance: 5 } })
   );`,
        note: "마우스와 손가락은 성질이 달라서 기준도 다르게 잡았다. 마우스는 5px 이상 움직여야 드래그로 본다. 손가락은 원래 흔들리니까 거리가 아니라 시간으로 잰다 — 150ms 이상 누르고 있으면 드래그, 그 사이 5px 흔들림은 봐준다.",
      },
      {
        text: "카드 위에 버튼을 얹을 때는 신호가 위로 올라가는 걸 막았다.",
        lang: "jsx",
        code: `<BellBtn
    onPointerDown={(e) => e.stopPropagation()}
    onTouchStart={(e) => e.stopPropagation()}
    onClick={(e) => { e.stopPropagation(); setIsAlarmOpen(true); }}
  >`,
        note: "클릭만 막으면 안 된다. 드래그는 누르는 순간(pointerdown) 시작되므로, 그것까지 막아야 버튼을 누를 때 카드가 딸려 움직이지 않는다.",
      },
    ],

    result:
      "폴더 안 썸네일을 누르면 상세로 이동하고, 드래그도 그대로 된다. \"가끔 안 눌린다\"는 증상이 사라졌다.",
    tech: ["React", "dnd-kit", "PointerEvent / TouchEvent", "이벤트 전파"],
    value:
      "같은 요소에 클릭과 드래그를 함께 얹을 때 생기는 충돌을 다뤘다. 마우스와 터치의 성질 차이를 이해하고 기준을 다르게 잡은 점, \"가끔 안 된다\"는 모호한 증상을 기준선 문제로 특정한 과정이 드러난다. 모바일 웹뷰를 목표로 하는 프로젝트 맥락과도 연결된다.",
  },
  {
    id: "stale-price",
    no: 12,
    title: "오래된 가격을 사실처럼 보여주던 문제",
    area: "데이터 신뢰도 · UX 판단",
    summary: "지금 보는 숫자를 얼마나 믿어도 되는지 사용자가 알 수 없던 문제",
    feature: "상품 상세·골드박스 — 가격 표시, 역대 최저가 배지",

    problem:
      "가격 수집 주기가 상품마다 달라지면서, 어떤 상품은 몇 시간 전 가격이 지금 가격인 것처럼 표시됐다. 가격 비교 서비스에서 이건 신뢰와 바로 이어지는 문제였다.",

    investigation: [
      "서버가 주는 신선도 정보(price_freshness)의 구조부터 확인했다 → stale(오래됨), refreshing(다시 확인 중), age_sec(몇 초 지났나)",
      "누가 판정할 것인가를 먼저 정해야 했다. 프론트에서 \"24시간 넘으면 오래됨\" 식으로 자를 수도 있었다. 하지만 상품마다 수집 주기가 달라서 하나의 기준으로 자르면 틀린다. 서버 판정을 그대로 믿기로 했다",
      "다음은 어디까지 표시할 것인가였다. 모든 카드에 확인 시각을 붙이면 정보는 늘지만, 눈이 그걸 배경처럼 인식해서 정작 위험한 카드가 묻힌다고 봤다. 그래서 오래된 것만 표시하기로 했다",
    ],

    cause: [
      "수집 주기가 바뀌면서 데이터의 최신 정도가 상품마다 크게 달라졌는데, 화면은 모든 가격을 똑같이 \"현재 가격\"으로 보여주고 있었다",
    ],

    solution: [
      {
        text: "경과 시간을 문장으로 바꾸는 함수를 만들고, 상태에 따라 세 가지로 나눠 표시했다.",
        lang: "jsx",
        code: `{product.freshness?.stale ? (
    // ① 오래됨 — 언제 확인한 값인지 밝힌다
    <Text>* {formatAge(product.freshness.ageSec)} 확인된 가격이에요.
      {product.freshness.refreshing && " 다시 확인 중이에요."}
    </Text>
  ) : product.freshness?.refreshing ? (
    // ② 다시 확인 중
    <Text>* 가격을 다시 확인하고 있어요.</Text>
  ) : (
    // ③ 최근 확인했고 안 바뀜
    <Text>* {formatPriceStability(stableSec)}</Text>
  )}`,
        table: {
          head: ["상태", "문구"],
          rows: [
            ["오래됨", "3일 전 확인된 가격이에요"],
            ["다시 확인 중", "가격을 다시 확인하고 있어요"],
            ["최근 확인 + 변동 없음", "5일째 가격 변동이 없어요"],
          ],
        },
        note: "③번은 반드시 마지막에 판정해야 한다. \"가격이 안 바뀌었다\"고 말하려면 그동안 확인은 하고 있었어야 한다. 확인을 안 한 것과 확인했는데 안 바뀐 것은 정반대 뜻인데, 순서를 바꾸면 거짓말이 된다.",
      },
      {
        text: "실제로 이 순서가 한 번 뒤집힌 적이 있었다. refreshing 갈래가 stale 안으로 들어가면서, 오래되진 않았는데 확인 중인 상품이 ③번으로 떨어져 \"5일째 변동 없어요\"라고 단정하고 있었다.",
        note: "마지막 변동 시각은 가격 이력의 마지막 항목에서 가져왔다. 이력은 값이 바뀐 시점만 기록되므로, 마지막 줄이 곧 최근 변동 시각이다.",
      },
    ],

    result:
      "오래된 가격에는 확인 시각이 함께 표시되고, 최근 확인된 상품에는 \"며칠째 그대로\"라는 안심 정보를 준다. 사용자가 지금 보는 숫자를 얼마나 믿어도 되는지 판단할 수 있다.",
    tech: ["React", "날짜/시간 처리", "UX 라이팅", "REST API"],
    value:
      "기능을 만드는 게 아니라 제품 판단이 필요한 문제다. 판정을 서버에 맡긴 이유, 모든 카드가 아니라 오래된 것만 표시한 이유, 문구 순서가 왜 중요한지 — 전부 근거를 갖고 설명할 수 있다. 데이터의 한계를 숨기지 않고 사용자에게 정직하게 전달하는 방향을 택한 점도 서비스를 만드는 태도를 보여준다.",
  },
];

export default goodsobi;
