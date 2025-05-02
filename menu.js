// Carregar el menú
fetch("menu.html")
  .then(res => res.text())
  .then(html => {
    const cont = document.getElementById("menu-container");
    cont.innerHTML = html;
    prepararMenu();
  });

// Crear visor flotant
const visor = document.createElement("div");
visor.id = "visorFlotant";
visor.style.position = "fixed";
visor.style.background = "white";
visor.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
visor.style.display = "none";
visor.style.zIndex = "2000";
visor.innerHTML = `
  <div id="visorBarra" style="height:40px; background:#0a3d62; display:flex; align-items:center; justify-content:space-between; padding:0 10px; color:white;">
    <div style="display:flex; align-items:center;">
      <img src="img/logo_pelat.png" alt="Logo" style="height:30px; margin-right:10px;">
      <span style="font-size:1rem; font-weight:bold;">Atria-ERP Relational</span>
    </div>
    <div>
      <button id="pantallaCompleta" style="font-size:18px;cursor:pointer;background:none;border:none;color:white;margin-right:10px;">🖵</button>
      <button id="tancarVisor" style="font-size:20px;cursor:pointer;background:none;border:none;color:white;">&times;</button>
    </div>
  </div>
  <div id="visorContingut" style="width:100%;height:calc(100% - 40px);overflow:auto;"></div>
`;
document.body.appendChild(visor);

// Funció per obrir el visor
function obrirVisor(url, ample = "80%", alt = "80%", top = "10%", left = "10%") {
  const contingut = document.getElementById("visorContingut");
  contingut.innerHTML = "";

  if (url.endsWith(".pdf")) {
    contingut.innerHTML = `<iframe src='${url}' width='100%' height='100%' style='border:none;'></iframe>`;
  } else if (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg") || url.endsWith(".webp")) {
    contingut.innerHTML = `<img src='${url}' style='max-width:100%;max-height:100%;margin:auto;display:block;'>`;
  } else {
    contingut.innerHTML = `<iframe src='${url}' width='100%' height='100%' style='border:none;'></iframe>`;
  }

  visor.style.width = ample;
  visor.style.height = alt;
  visor.style.top = top;
  visor.style.left = left;
  visor.style.display = "block";
}

// Tancar visor i pantalla completa
document.addEventListener("click", (e) => {
  if (e.target.id === "tancarVisor") {
    visor.style.display = "none";
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
  if (e.target.id === "pantallaCompleta") {
    if (!document.fullscreenElement) {
      visor.requestFullscreen().catch(err => {
        console.error(`Error en pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  if (visor.style.display === "block" && !visor.contains(e.target) && !e.target.closest("#menu-container")) {
    visor.style.display = "none";
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
});

// Preparar les opcions del menú
function prepararMenu() {
  const enllaços = document.querySelectorAll("#menuLateral a");
  enllaços.forEach((enllaç) => {
    enllaç.addEventListener("click", (e) => {
      const subMenu = enllaç.nextElementSibling;
      if (subMenu && subMenu.tagName === "UL") {
        e.preventDefault();
        const desplegat = subMenu.style.display === "block";
        subMenu.style.display = desplegat ? "none" : "block";

        // Actualitzar la fletxa
        const fletxa = enllaç.querySelector(".fletxa");
        if (fletxa) {
          fletxa.textContent = desplegat ? "▼" : "▲";
        }
        return;
      }

      e.preventDefault();
      const url = enllaç.getAttribute("data-url");
      const ample = enllaç.getAttribute("data-width") || "80%";
      const alt = enllaç.getAttribute("data-height") || "80%";
      const top = enllaç.getAttribute("data-top") || "10%";
      const left = enllaç.getAttribute("data-left") || "10%";
	  const fullscreen = enllaç.getAttribute("data-fullscreen") === "true";

       if (url) {
        if (url.includes("prezi.com")) {
          if (fullscreen) {
            window.open(
              url,
              "_blank",
              `toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${screen.width},height=${screen.height},top=0,left=0`
            );
          } else {
            const ampladaPx = Math.floor((parseFloat(ample) / 100) * screen.availWidth);
            const alcadaPx = Math.floor((parseFloat(alt) / 100) * screen.availHeight);
            const topPx = Math.floor((parseFloat(top) / 100) * screen.availHeight);
            const leftPx = Math.floor((parseFloat(left) / 100) * screen.availWidth);

            window.open(
              url,
              "_blank",
              `toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${ampladaPx},height=${alcadaPx},top=${topPx},left=${leftPx}`
            );
          }
        } else {
          obrirVisor(url, ample, alt, top, left);
        }
      } else {
        const href = enllaç.getAttribute("href");
        if (href && href !== "#") {
          window.open(href, "_blank");
        }
      }
    });
  });

  // Afegir fletxeta final als que tenen submenú
  document.querySelectorAll("#menuLateral li > a").forEach(enllaç => {
    if (enllaç.nextElementSibling && enllaç.nextElementSibling.tagName === "UL") {
      const span = document.createElement("span");
      span.className = "fletxa";
      span.textContent = "▼"; // Fletxa inicial
      span.style.float = "right";
      span.style.marginRight = "10px";
      enllaç.appendChild(span);
    }
  });

  // Afegir puntets ● davant de cada subopció
  document.querySelectorAll("#menuLateral li ul li a").forEach(subenllaç => {
    const punt = document.createElement("span");
    punt.textContent = "● ";
    subenllaç.insertBefore(punt, subenllaç.firstChild);
  });
}


// Funció de toggle per al menú lateral
function toggleMenu() {
  document.body.classList.toggle("menu-obert");
}
