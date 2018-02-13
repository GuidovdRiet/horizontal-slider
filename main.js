const contentScroller = document.querySelector(".horizontal-scroller__list");
const listItems = [...document.querySelectorAll(".horizontal-scroller__item")];

let scrollTotal = 0;
let scrollLimit = [ ];

const moveSlider = e => {
  const scrollAmount = +e.deltaY;
  scrollTotal = scrollTotal + -scrollAmount;
  if(scrollTotal <= scrollLimit[0]) {
    scrollTotal = scrollLimit[0];
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
  const isScrollLimitReached = setScrollBoundary(
    totalScrollerWidth(listItems),
    scrollLeftOffset
  );
  if (isScrollLimitReached) {
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
