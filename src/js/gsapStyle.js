import gsap from 'gsap';

function animateIcons(selector, duration, y, x, scale = 1, ease, opacity = 1) {
  const icons = document.querySelectorAll(selector);

  icons.forEach((icon) => {
    gsap.from(icon, { duration: duration, y: y, x: x, scale: scale, ease: ease, opacity: opacity });
  });
}

animateIcons('.githubGsap', 0.2, -300);
animateIcons('.frontendMasterGsap', 0.4, -300);
animateIcons('.linkedinGsap', 0.6, -300);
animateIcons('.twitterGsap', 0.8, -300);
animateIcons('#introduction', 1.2, 0, 0);
animateIcons('.emilbacklund', 0.8, 0, -1000);
animateIcons('#headshot', 0.8, 0, 1000);
animateIcons('#headshotMobile', 0.8, 0, 0, 0);
animateIcons('.contactBtn', 0.6, 1000, 0);
