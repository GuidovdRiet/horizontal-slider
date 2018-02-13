const contentScroller = document.querySelector(".horizontal-scroller__list");
const listItems = [...document.querySelectorAll(".horizontal-scroller__item")];

let scrollTotal = 0;

const moveSlider = e => {
  const scrollAmount = +e.deltaY;
  scrollTotal = scrollTotal + -scrollAmount;
  contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
  scrollLimitChecker();
};

const setScrollBoundary = (totalScrollerWidth, scrollerAmount) => {
  if (totalScrollerWidth >= scrollerAmount) {
    return true;
  }
};

const scrollLimitChecker = e => {
  const scrollLeftOffset = Math.abs(
    contentScroller.getBoundingClientRect().left
  );
  const isScrollLimitReached = setScrollBoundary(
    totalScrollerWidth(listItems),
    scrollLeftOffset
  );
  if (isScrollLimitReached) {
    console.log('reached');
  }
};

const totalScrollerWidth = listItems => {
  let scrollerWidth = listItems
    .map(listItem => listItem.offsetWidth)
    .reduce((total, amount) => total + amount);
  return scrollerWidth - window.innerWidth;
};

// Move slider on scroll
window.addEventListener("mousewheel", e => {
  moveSlider(e);
});
