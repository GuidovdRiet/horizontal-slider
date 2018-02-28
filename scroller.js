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

// Width van de slider / 100 * 10%; Is 10% van de slider width;
// Als de sliderWidth 10% is, is dit 100% van de totaal mogelijke slider width
// De speed moet dan ook 10% zijn van de totale snelheid waarop de slider beweegt 

const scrollLimitChecker = (scrollerWidth, e) => {
  // Hoeveel procent is de scroller van het geheel?
  const scrollerNavWidthPercent = scrollerWidth / scrollerNav.offsetWidth;
  if (scrollTotal >= scrollerWidth) {
    contentScroller.style.transform = `translate3d(${scrollTotal}px, 0, 0)`;
    scrollerIndicator.style.transform = `translate3d(${(scrollTotal / scrollerNavWidthPercent) - scrollerIndicator.offsetWidth}px, 0, 0)`;
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