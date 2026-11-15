document.addEventListener("DOMContentLoaded",function(){
  var t=document.getElementById("menu-toggle"),n=document.getElementById("nav-links");
  function set(o){n.classList.toggle("active",o);t.setAttribute("aria-expanded",o);t.textContent=o?"✕":"☰";}
  t.addEventListener("click",function(){set(!n.classList.contains("active"))});
  n.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){set(false)})});

  // ---- Contact form (sent through Formspree) ----
  // Paste your Formspree form link here, e.g. "https://formspree.io/f/abcdwxyz"
  var FORM_ENDPOINT = "https://formspree.io/f/maoeoybz";

  var f=document.getElementById("contact-form");
  var note=document.getElementById("form-note");
  var btn=f.querySelector("button[type=submit]");

  f.addEventListener("submit",function(e){
    e.preventDefault();
    if(FORM_ENDPOINT.indexOf("YOUR_FORM_ID")!==-1){
      note.textContent="The form is not connected yet. Please email us at info@kalebucybertechafrica.com.";
      note.className="note error";
      return;
    }
    btn.disabled=true; btn.textContent="Sending...";
    note.className="note"; note.textContent="";

    fetch(FORM_ENDPOINT,{
      method:"POST",
      headers:{"Accept":"application/json"},
      body:new FormData(f)
    }).then(function(r){
      if(!r.ok) throw new Error("failed");
      f.reset();
      note.textContent="Thank you. Your message has been sent and we will reply soon.";
      note.className="note success";
    }).catch(function(){
      note.textContent="Your message could not be sent. Please try again or email info@kalebucybertechafrica.com.";
      note.className="note error";
    }).finally(function(){
      btn.disabled=false; btn.textContent="Send message";
    });
  });
});

// ---- Hero text animation (words rise in one after another) ----
document.addEventListener("DOMContentLoaded",function(){
  var h=document.querySelector(".hero h1");
  if(!h) return;
  var words=h.textContent.trim().split(/\s+/);
  h.setAttribute("aria-label",words.join(" "));
  h.textContent="";
  words.forEach(function(w,i){
    var s=document.createElement("span");
    s.className="w"; s.setAttribute("aria-hidden","true");
    s.style.setProperty("--i",i);
    s.textContent=w;
    h.appendChild(s);
    if(i<words.length-1) h.appendChild(document.createTextNode(" "));
  });
  var n=words.length;
  var lead=document.querySelector(".hero .lead");
  var acts=document.querySelector(".hero .actions");
  var trust=document.querySelector(".hero .trust");
  [lead,acts,trust].forEach(function(el,k){
    if(!el) return;
    el.classList.add("fade-up");
    el.style.setProperty("--d",(n*0.09+0.35+k*0.15)+"s");
  });

  // Play the reveal when the hero is on screen, then repeat a gentle wave every 5 seconds
  var hero=document.querySelector(".hero");
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var doneT=null, waveT=null, loopT=null;

  function startHero(){
    hero.classList.add("play");
    clearTimeout(doneT);
    doneT=setTimeout(function(){ hero.classList.add("done"); }, (n*90)+1000);
    if(reduce) return;
    clearInterval(loopT);
    loopT=setInterval(function(){
      if(document.hidden || !hero.classList.contains("done")) return;
      h.classList.remove("wave"); void h.offsetWidth; h.classList.add("wave");
      clearTimeout(waveT);
      waveT=setTimeout(function(){ h.classList.remove("wave"); }, (n*70)+900);
    }, 5000);
  }
  function stopHero(){
    clearTimeout(doneT); clearTimeout(waveT); clearInterval(loopT);
    h.classList.remove("wave");
    hero.classList.remove("play","done");
  }

  if("IntersectionObserver" in window){
    new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ if(!hero.classList.contains("play")) startHero(); }
        else if(e.intersectionRatio===0){ stopHero(); }
      });
    },{threshold:[0,0.25]}).observe(hero);
  } else {
    startHero();
  }
});
