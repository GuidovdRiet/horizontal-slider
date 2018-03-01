const contentScroller = document.querySelector(".horizontal-scroller__list");
const listItems = [
  ...document.querySelectorAll(".horizontal-scroller__item-container")
];
const scrollerNav = document.querySelector(".horizontal-scroller__nav");
const scrollerIndicator = document.querySelector(
  ".horizontal-scroller__indicator"
);

let scrollTotal = 0;
let scrollerIndicatorPosition = 0;

const moveSlider = e => {
  const scrollerWidth = -totalContentWidth(listItems);
  const scrollAmountY = +e.deltaY;
  const scrollAmountX = +e.deltaX;
  scrollTotal = scrollTotal + -scrollAmountY;
  scrollTotal = scrollTotal + -scrollAmountX;
  if (scrollTotal <= scrollerWidth) {
    scrollTotal = scrollerWidth;
  }
  scrollLimitChecker(scrollerWidth, e);
};

const scrollLimitChecker = (scrollerWidth, e) => {
  const scrollerNavWidthPercent = scrollerWidth / scrollerNav.offsetWidth;
  scrollerIndicatorPosition = scrollTotal / scrollerNavWidthPercent - scrollerIndicator.offsetWidth;
  if (scrollTotal >= scrollerWidth) {
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
    scrollerIndicator.style.transform = `translate3d(${scrollerIndicatorPosition}px, 0, 0)`;
  }
  if (scrollTotal >= 0) {
    scrollTotal = 0;
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
  }
  if (scrollerIndicatorPosition <= 0) {
    scrollerIndicatorPosition = 0;
    scrollerIndicator.style.transform = `translate3d(${scrollerIndicatorPosition}px, 0, 0)`;
  }
};

const totalContentWidth = listItems => {
  let scrollerWidth = listItems
    .map(listItem => {
      const listItemStyle = window.getComputedStyle(listItem);
      const listItemWidth = listItem.offsetWidth;
      const inlineBlockMargin = 4; // inline block adds 4px margin not registered
      const listItemMargin =
        parseFloat(listItemStyle.marginLeft) +
        parseFloat(listItemStyle.marginRight);
      return listItemWidth + listItemMargin + inlineBlockMargin;
    })
    .reduce((total, amount) => total + amount);
  return scrollerWidth - window.innerWidth;
};

window.addEventListener("mousewheel", e => {
  if (window.innerWidth > 800) {
    moveSlider(e);
  }
});
