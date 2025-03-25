function newlang(lang) {
  fetch(lang + '.txt')
    .then(res => res.text())
    .then(text => {
      const sections = text.split('##').filter(Boolean);
      const main = document.querySelector('main');
      const menu = document.getElementById("menu-left");

      // Tractament de seccions
      sections.forEach((sec, i) => {
        const id = 'box' + (i + 1);
        let box = document.getElementById(id);

        if (!box) {
          box = document.createElement('div');
          box.id = id;
          box.className = 'content-box';
          main.appendChild(box);
        }

        const lines = sec.trim().split('\n');
        const title = lines[0];
        const content = lines.slice(1).join('<br>');
        box.innerHTML = `<h2>${title}</h2><p>${content}</p>`;

        // Tractament de menú
        const menuId = 'menu-box' + (i + 1);
        let menuItem = document.getElementById(menuId);

        if (!menuItem) {
          menuItem = document.createElement("li");
          menuItem.id = menuId;
          const a = document.createElement("a");
          a.href = "#" + id;
          a.textContent = title;
          menuItem.appendChild(a);
          menu.appendChild(menuItem);
        } else {
          const a = menuItem.querySelector("a");
          a.href = "#" + id;
          a.textContent = title;
        }
      });

      // Eliminar box# sobrants
      let n = sections.length + 1;
      let extra;
      while ((extra = document.getElementById('box' + n))) {
        extra.remove();
        n++;
      }

      // Eliminar menu-box# sobrants
      n = sections.length + 1;
      let extraMenu;
      while ((extraMenu = document.getElementById('menu-box' + n))) {
        extraMenu.remove();
        n++;
      }

      window.scrollTo(0, 0); // tornar a l'inici
    });
}

newlang("en");