const tl = new TimelineMax();

tl
    .from(contentScroller, .9, { opacity: 0, y: -80 })
    .to(contentScroller, .9, { opacity: 1, y: 0, ease: Back.easeOut.config(1.7) })