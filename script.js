document.addEventListener("DOMContentLoaded",function(){
  var t=document.getElementById("menu-toggle"),n=document.getElementById("nav-links");
  function set(o){n.classList.toggle("active",o);t.setAttribute("aria-expanded",o);t.textContent=o?"✕":"☰";}
  t.addEventListener("click",function(){set(!n.classList.contains("active"))});
  n.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){set(false)})});

  // ---- Contact form (sent through Formspree) ----
  // Paste your Formspree form link here, e.g. "https://formspree.io/f/abcdwxyz"
  var FORM_ENDPOINT = "https://formspree.io/f/maeoeybz";

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
