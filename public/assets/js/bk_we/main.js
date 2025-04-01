new WOW().init();

const triggers = gsap.utils.toArray('.gsap_trigger');
triggers.forEach((trigger) => {
  gsap.fromTo(
    trigger.querySelector('.gsap_target'),
    { filter: 'blur(0px)' },
    {
      scrollTrigger: {
        trigger: trigger,
        scrub: true,
        start: 'bottom center-=20%',
        end: 'bottom center-=40%',
      },
      filter: 'blur(10px)',
    }
  );
  gsap.fromTo(
    trigger.querySelector('.gsap_target'),
    { opacity:0,filter: 'blur(10px)' },
    {
      scrollTrigger: {
        trigger: trigger,
        scrub: true,
        start: 'top center+=40%',
        end: 'top center',
      },
      opacity:1,
      filter: 'blur(0px)',
    }
  );
});

function animStart() {
  const tl = gsap.timeline({ defaults: { duration: 0.5 } });
  const text = new SplitType('.split');

    tl.fromTo(['.img1', '.img2', '.img3', '.img4', '.img5', '.img6', '.img7', '.img8', '.img9', '.img10', '.img11', '.img12'], {

    y: -10,
    opacity:0,

  },
  {
// duration:1,
    y: 0,
    opacity:1,
    stagger: 0.02,
    ease: 'power3.out',
  })
    .fromTo('#Hero .el_bg', { opacity: 0 }, { opacity: 0.4,delay:1 },"-=1")
    .fromTo('.hotel', { y: -50,opacity:0 }, { y: 0,opacity:1 })
    .fromTo('#Feature01', { y: 50,opacity:0 }, { y: 0,opacity:1 },"-=.5")
    .fromTo(
      ['#Hero .gsap_el1', '#Hero .gsap_el2'],
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 1 },"-=.5"
    )
    .from(text.chars, { opacity: 0, y: 40, skewX: 30, stagger: 0.1, duration: 1 },"-=.5");
}

Pace.on('start', function () {
  // console.log('start');
});

Pace.on('done', function () {
  // console.log('done');
  animStart();
});
