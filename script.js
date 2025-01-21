function init() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! 
  // So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. 
  // We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

init()

let cursor = document.querySelector(".cursor")
let main = document.querySelector(".main")
main.addEventListener("mousemove", function(dets){
    cursor.style.left = dets.x+ 20 + "px";
    cursor.style.top = dets.y+ 20 + "px";
})

// let vid_cursor = document.querySelector(".page1 video")
// vid_cursor.addEventListener("mouseenter", function(dets){
//     cursor.innerHTML="sound on";
// })
// const video = document.getElementById('hero_video');

//     // Add a click event listener to the video
//     video.addEventListener('click', () => {
//       if (video.muted) {
//         video.muted = false; // Unmute the video
//         console.log('Video unmuted');
//       } else {
//         video.muted = true; // Mute the video again
//         console.log('Video muted');
//       }
//     });


let tl = gsap.timeline({
    scrollTrigger:{
        trigger:".page1 h1",
        scroller:".main",
        start:"top 27%",
        end: "top 0%",
        scrub:3
    }
})

tl.to(".page1 h1", {
    x:-100,   
},"heading")

tl.to(".page1 h2", {
    x:100
},"heading")

tl.to(".page1 video",{
    width:"90%"
},"heading")

let tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:".page1 h1",
        scroller:".main",
        start:"top -115%",
        end: "top -120%",
        scrub:3
    }
})
tl2.to(".main",{
    backgroundColor:"#FEFCFF"
})

let tl3 = gsap.timeline({
    scrollTrigger:{
        trigger:".page1 h1",
        scroller:".main",
        start:"top -350%",
        end: "top -400%",
        scrub:3
    }
})
tl3.to(".main",{
    backgroundColor:"#0F0D0D"
})


var box = document.querySelectorAll(".box")
box.forEach(elem => {
    elem.addEventListener("mouseenter", function(){
        let att = elem.getAttribute("data-image")
        cursor.style.width = "400px"
        cursor.style.height = "300px"
        cursor.style.backgroundPosition = "center"
        cursor.style.backgroundSize = "cover"
        cursor.style.borderRadius = "0"
        cursor.style.backgroundImage = `url(${att})`
        cursor.style.mixBlendMode = "normal"
    })
    elem.addEventListener("mouseleave", function(){
        elem.style.backgroundColor = "transparent"
        cursor.style.width = "20px"
        cursor.style.height = "20px"
        cursor.style.borderRadius = "50%"
        cursor.style.backgroundImage = `none`
        cursor.style.mixBlendMode = "difference"
    })
});