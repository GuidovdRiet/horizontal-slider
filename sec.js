const contentScroller = document.querySelector(".horizontal-scroller__list");
const listItems = [...document.querySelectorAll(".horizontal-scroller__item")];

let scrollTotal = 0;
let scrollLimit = [];

const moveSlider = e => {
  let scrollAmount = +e.deltaY;
  scrollTotal = scrollTotal + -scrollAmount;
  console.log(totalScrollerWidth(listItems));
  console.log(scrollLimit[0]);
  if (scrollTotal <= scrollLimit[0]) {
    scrollTotal = scrollLimit[0];
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
  } else if (scrollTotal >= 0) {
    scrollTotal = 0;
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
  } else {
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
  }
  scrollLimitChecker();
};

const scrollLimitChecker = e => {
  const scrollLeftOffset = Math.abs(
    contentScroller.getBoundingClientRect().left
  );
  const scrollLimitReached = setScrollBoundary(
    totalScrollerWidth(listItems),
    scrollLeftOffset
  );
  if (scrollLimitReached) {
    scrollLimit.push(scrollTotal);
  }
};

const setScrollBoundary = (totalScrollerWidth, scrollerAmount) => {
  if (totalScrollerWidth <= scrollerAmount) {
    return true;
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
