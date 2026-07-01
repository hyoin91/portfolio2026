// 자주 쓰는 transition, animation 값을 모아두는 파일

export const transition = {
  fast: "150ms ease",
  normal: "250ms ease",
  slow: "400ms ease",
};

export const fadeIn = `
  animation: fadeIn 250ms ease both;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;