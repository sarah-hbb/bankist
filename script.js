"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const header = document.querySelector(".header");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContents = document.querySelectorAll(".operations__content");

const sections = document.querySelectorAll(".section");

////////////////////////////////////////////////////////
// MODAL WINDOW
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);

///////////////////////////////////////////////////////
//COOKIE BUTTON
const message = document.createElement("div");
message.classList.add("cookie-message");
const cookieButton = document.createElement("button");
cookieButton.classList.add("btn", "btn--close--cookie");
cookieButton.innerHTML = "Got It!";
message.innerHTML = " we use cookies for improve functionality and analytics.";
message.insertAdjacentElement("beforeend", cookieButton);
header.append(message);
//Style
message.style.backgroundColor = "#37383d";
message.style.width = "100vw";
message.style.height = "8vh";
//delete cookie message
document
  .querySelector(".btn--close--cookie")
  .addEventListener("click", function () {
    message.remove();
  });

//////////////////////////////////////////////////////
//button scrolling [Learn More button]
btnScrollTo.addEventListener("click", function (e) {
  ////SMOOTH scrolling to section--1

  // OLD SCOOL WAY of SMOOTH SCROLLING
  /*
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
   window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top+window.pageYOffset,
         behavior: 'smooth'
     });
     */
  // NEW WAY OF SMOOTH SCROLLING
  section1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////////
// PAGE NAVIGATION

////MENU SMOOTH SCROLLING
/*
*************ITS A BAD PRACTICE TO ATTACH AN EVENT HANDLER TO MULTIPLE ELEMENTS BY forEach, ITS BETTER TO ATTACH THE EVENT HANDLER TO THE PARRENT ELEMENT*********************

document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })
})
*/

//1.Add event listener to common parent element
//2. Determin what element originate event [where event actually happens]
document.querySelector(".nav__links").addEventListener("click", function (e) {
  //Matching strategy
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Navigation bar: Menu Fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/////////////////////////////////////////////////////
// opration TABS buttons
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  //Guard clause
  if (!clicked) return;
  ////remove active classes
  //remove active class from all tabs
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  //remove active classes from all contents
  tabsContents.forEach((c) =>
    c.classList.remove("operations__content--active")
  );

  /////Activation
  //activate tab
  clicked.classList.add("operations__tab--active");
  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////MY CODE 🌝 ///
/*
//showing relevant content
const showRelevantContent = (tab) => {
  const dataTab = tab.getAttribute("data-tab");
  const operationTab = document.querySelector(".operations__tab--" + dataTab);
  const operationContent = document.querySelector(
    ".operations__content--" + dataTab
  );
  operationTab.classList.add("operations__tab--active");
  operationContent.classList.add("operations__content--active");
};

//removing active tab
const removeActiveTab = () => {
  tabContainer
    .querySelector(".operations__tab--active")
    .classList.remove("operations__tab--active");
};

//removing active content
const removeActiveContent = () => {
  const operations = document.querySelector(".operations");
  operations
    .querySelector(".operations__content--active")
    .classList.remove("operations__content--active");
};

tabs.forEach((tab) => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();
    //remove active class from active tab
    removeActiveTab();
    //remove active content
    removeActiveContent();
    //show relevant content
    showRelevantContent(tab);
  });
});
*/

/////////////////////////////////////////////////////
//Sticky Navigation:Intersection Observer API

// Intersection Observer API explained
/* ***********************************
const obsCallback = function(entries,observer){
//entries are threshold entries
  entries.forEach(entry=>{
    console.log(entry);
  })
};
const obsOptions = {
  //root is the element that the target element (Section1) is intersectig. we set it to null when we want to intersect target element with the viewport
  root: null,
  // threshold is the percentage of intercetion at which the observer callback will be called
  threshold: [1,0]
};
const observer = new IntersectionObserver(obsCallback,obsOptions);
observer.observe(header)
/* callback function element will get called each time the observed [target] element (section1) intersects the root element (viewport) at the threshold we defined.
*************************************
*/

//stikcy navigation
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, options);

headerObserver.observe(header);

///////////////////////////////////////////////////////////
//Reveal Sections

const sectionReaveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
  //console.log(entry.target , entry.isIntersecting);
};
const ops = {
  root: null,
  threshold: 0.1,
};
const sectionObserver = new IntersectionObserver(sectionReaveal, ops);
sections.forEach((section) => {
  //first add class section--hidden to hide all the sections
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

//////////////////////////////////////////////////////////
//Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]");

const lazyLoading = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const opts = {
  root: null,
  threshold: 0,
  rootMargin: "200px",
};
const imgObserver = new IntersectionObserver(lazyLoading, opts);

imgTargets.forEach((imgTarget) => imgObserver.observe(imgTarget));

//////////////////////////////////////////////////////////
//Slider
const slider =function(){


const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
// const sliders = document.querySelector(".slider");
const dotContainer =document.querySelector('.dots')

let curSlide = 0;
const maxSlide = slides.length;



//FUNCTIONS

//insert as many dots as the number of slides
const createDots = function (){
  slides.forEach(function(_,i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
} 

//activate style for slide that we are going to e.g: goToSlide(slide=2) activDots(slide=2)
const activeDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

//to make the pictures visible at once
// slider.style.transform='scale(0.4) translateX(-800px)';
//slider.style.overflow = "visible";

//1-place the slides [with position:absolout] side by side
/* 🚦🚦🚦 slides.forEach((s, i) => {
  s.style.transform = `translateX(${i * 100}%)`;
 }); same as===== goToSlide(0)🚦🚦🚦 */

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};



//Next slide
const nextSlide = function (){
    if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDots(curSlide);
}
//Previous slide
const prevSlide = function (){
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
goToSlide(curSlide);
activeDots(curSlide)
}

const init = function(){
  goToSlide(0);
  createDots();
  activeDots(0);
}
init()

//Event Handlers
//Clicking on slider right button [next slide]
btnRight.addEventListener("click",nextSlide);
//Clicking on slider left button [previous slide]
btnLeft.addEventListener("click",prevSlide);

//event handler with arrow left and arrow right
document.addEventListener('keydown',function(e) {
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide()
})

//Dots clicking
dotContainer.addEventListener('click',function(e) {
  if(e.target.classList.contains('dots__dot')){
    const {slide} =e.target.dataset;
    goToSlide(slide);
    activeDots(slide)
  }
})
}
slider();

