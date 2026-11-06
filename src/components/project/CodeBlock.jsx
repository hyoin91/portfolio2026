import styled from "styled-components";

/* diff 줄의 성격 판정. "---"/"+++" 같은 머리글은 diff가 아니라 파일 표시라 제외 */
function diffKind(line) {
  if (line.startsWith("+") && !line.startsWith("+++")) return "add";
  if (line.startsWith("-") && !line.startsWith("---")) return "del";
  return null;
}

function CodeBlock({ code, lang }) {
  if (!code) return null;

  const lines = code.split("\n");

  return (
    <Pre>
      <code>
        {lines.map((line, index) => (
          /* 줄 순서가 바뀌지 않는 정적 목록이라 index를 key로 써도 안전하다 */
          <Line key={index} $kind={lang === "diff" ? diffKind(line) : null}>
            {line === "" ? " " : line}
          </Line>
        ))}
      </code>
    </Pre>
  );
}

export default CodeBlock;

//---------------------styled----------------//

const Pre = styled.pre`
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-3) 0;
  overflow-x: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: var(--font-sizes-12);
  line-height: 1.7;
`;

const TINTS = {
  add: "var(--color-success-subtle)",  /* 추가한 줄은 초록 */
  del: "var(--color-danger-subtle)",   /* 지운 줄은 빨강 — 거의 모든 diff 도구의 약속 */
};
const MARKS = {
  add: "var(--color-success-primary)",
  del: "var(--color-danger-primary)",
};

const Line = styled.span`
  display: block;
  padding: 0 var(--spacing-3);
  white-space: pre;
  background: ${({ $kind }) => TINTS[$kind] ?? "transparent"};
  box-shadow: ${({ $kind }) =>
    $kind ? `inset 2px 0 0 ${MARKS[$kind]}` : "none"};
`;
