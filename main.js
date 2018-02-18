const contentScroller = document.querySelector(".horizontal-scroller__list");
const listItems = [...document.querySelectorAll(".horizontal-scroller__item")];

let scrollTotal = 0;

const moveSlider = e => {
  const scrollerWidth = -totalScrollerWidth(listItems);
  let scrollAmount = +e.deltaY;
  scrollTotal = scrollTotal + -scrollAmount;

  if (scrollTotal <= scrollerWidth) {
    scrollTotal = scrollerWidth;
  }

  scrollLimitChecker(scrollerWidth);
};

const scrollLimitChecker = (scrollerWidth) => {
  if (scrollTotal >= scrollerWidth) {
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
  }
  if (scrollTotal >= 0) {
    scrollTotal = 0;
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
  }
};

const totalScrollerWidth = listItems => {
  let scrollerWidth = listItems
    .map(listItem => listItem.offsetWidth)
    .reduce((total, amount) => total + amount);
  return scrollerWidth - window.innerWidth;
};

window.addEventListener("mousewheel", e => {
  moveSlider(e);
});
