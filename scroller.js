const contentScroller = document.querySelector(".horizontal-scroller__list");
const listItems = [...document.querySelectorAll(".horizontal-scroller__item")];
const scrollerNav = document.querySelector(".horizontal-scroller__nav");
const scrollerIndicator = document.querySelector(
  ".horizontal-scroller__indicator"
);

let scrollTotal = 0;

const moveSlider = e => {
  const scrollerWidth = -totalContentWidth(listItems);
  const scrollAmount = +e.deltaY;
  scrollTotal = scrollTotal + -scrollAmount;
  if (scrollTotal <= scrollerWidth) {
    scrollTotal = scrollerWidth;
  }
  scrollLimitChecker(scrollerWidth);
};

const scrollLimitChecker = scrollerWidth => {
  if (scrollTotal >= scrollerWidth) {
    let navScrollPosition = -scrollTotal / 100 * 21.9;
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
    scrollerIndicator.style.transform = `translate3d(${navScrollPosition}px, 0, 0)`;
  }
  if (scrollTotal >= 0) {
    scrollTotal = 0;
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
  }
};

const totalContentWidth = listItems => {
  let scrollerWidth = listItems
    .map(listItem => listItem.offsetWidth)
    .reduce((total, amount) => total + amount);
  return scrollerWidth - window.innerWidth;
};

window.addEventListener("mousewheel", e => {
  moveSlider(e);
});
