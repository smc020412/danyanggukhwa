// 책임: 스크롤에 비례해 장식 패턴을 아래로 이동한다. 전단지 상태는 변경하지 않는다.
// 입력: 스크롤 위치와 화면·모션 설정. 출력: 배경 요소의 CSS 변수.
// 소유 상태: 예약한 프레임 ID. 의존성: .flower-background와 브라우저 API.
// 생명주기: 데스크톱이며 모션을 허용할 때만 구독하고, 조건 변경 시 해제한다.
const flowerBackground = document.querySelector('.flower-background');
const flowerMotion = window.matchMedia(
  '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
);
const backgroundScrollRatio = 0.2;
let flowerFrame = null;

function updateFlowerBackground() {
  flowerBackground.style.setProperty('--flower-offset', `${window.scrollY * backgroundScrollRatio}px`);
  flowerFrame = null;
}

function scheduleFlowerUpdate() {
  if (flowerFrame === null) {
    flowerFrame = window.requestAnimationFrame(updateFlowerBackground);
  }
}

function syncFlowerMotion() {
  window.removeEventListener('scroll', scheduleFlowerUpdate);
  if (flowerFrame !== null) {
    window.cancelAnimationFrame(flowerFrame);
    flowerFrame = null;
  }

  if (flowerMotion.matches) {
    window.addEventListener('scroll', scheduleFlowerUpdate, { passive: true });
    scheduleFlowerUpdate();
  } else {
    flowerBackground.style.removeProperty('--flower-offset');
  }
}

flowerMotion.addEventListener('change', syncFlowerMotion);
syncFlowerMotion();
