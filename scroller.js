const contentScroller = document.querySelector(".horizontal-scroller__list");
const listItems = [
  ...document.querySelectorAll(".horizontal-scroller__item-container")
];
const scrollerNav = document.querySelector(".horizontal-scroller__nav");
const scrollerIndicator = document.querySelector(
  ".horizontal-scroller__indicator"
);

let scrollTotal = 0;

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
  if (scrollTotal >= scrollerWidth) {
    let navScrollPosition = (window.innerWidth / 100 * 35);
    console.log(navScrollPosition);
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
    .map(listItem => {
      const listItemStyle = window.getComputedStyle(listItem);
      const listItemWidth = listItem.offsetWidth;
      const inlineBlockMargin = 4; // inline block adds 4px margin not registered
      const listItemMargin =
        parseFloat(listItemStyle.marginLeft) +
        parseFloat(listItemStyle.marginRight);
      return listItemWidth + listItemMargin - inlineBlockMargin;
    })
    .reduce((total, amount) => total + amount);
  return scrollerWidth - window.innerWidth;
};

window.addEventListener("mousewheel", e => {
  if (window.innerWidth > 800) {
    moveSlider(e);
  }
});
