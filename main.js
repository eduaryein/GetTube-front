/*
GetTube - YouTube Clone
Copyright (C) 2023 Eduardo Nava (@winxer)

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).
For more details, visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

// Función para desplazar las categorías
function scrollCategories(scrollAmount) {
  const categoriesList = document.getElementById("categoriesList");
  if (!categoriesList) {
    console.error("Contenedor de categorías no encontrado.");
    return;
  }
  categoriesList.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
}

// Función para desplazar los videos
function wx_scrollVideos(containerId, direction) {
  const wx_videosList = document.getElementById(containerId);
  if (!wx_videosList) {
    console.error(`Contenedor de videos no encontrado: ${containerId}`);
    return;
  }

  const wx_videoWidth = wx_videosList.querySelector('.wx-video').offsetWidth + 20; // Ancho del video + gap
  let wx_currentScroll = wx_videosList.scrollLeft;
  wx_currentScroll += direction * wx_videoWidth;
  wx_videosList.scrollTo({ left: wx_currentScroll, behavior: 'smooth' });

  // Ocultar/mostrar flechas según la posición
  wx_updateButtons(containerId);
}

// Función para actualizar las flechas
function wx_updateButtons(containerId) {
  const wx_videosList = document.getElementById(containerId);
  if (!wx_videosList) {
    console.error(`Contenedor de videos no encontrado: ${containerId}`);
    return;
  }

  // Extraer el número del ID del contenedor (por ejemplo, "1" de "wx_videosList_1")
  const containerNumber = containerId.split('_').pop(); // Usamos pop() para obtener el último segmento

  const wx_leftButton = document.getElementById(`wx_leftButton_${containerNumber}`);
  const wx_rightButton = document.getElementById(`wx_rightButton_${containerNumber}`);

  const wx_currentScroll = wx_videosList.scrollLeft;
  wx_leftButton.style.display = wx_currentScroll > 0 ? 'flex' : 'none';
  wx_rightButton.style.display = wx_currentScroll < wx_videosList.scrollWidth - wx_videosList.clientWidth ? 'flex' : 'none';
}

// Inicializar botones para todos los contenedores de videos
document.addEventListener('DOMContentLoaded', function () {
  const videoContainers = document.querySelectorAll('.wx-videos-container');

  videoContainers.forEach((container, index) => {
    const containerId = `wx_videosList_${index + 1}`;
    const wx_videosList = document.getElementById(containerId);

    if (!wx_videosList) {
      console.error(`Contenedor de videos no encontrado: ${containerId}`);
      return;
    }

    // Asignar eventos a las flechas
    const wx_leftButton = document.getElementById(`wx_leftButton_${index + 1}`);
    const wx_rightButton = document.getElementById(`wx_rightButton_${index + 1}`);

    if (!wx_leftButton || !wx_rightButton) {
      console.error(`Botones de flecha no encontrados para el contenedor: ${containerId}`);
      return;
    }

    wx_leftButton.addEventListener('click', () => wx_scrollVideos(containerId, -1));
    wx_rightButton.addEventListener('click', () => wx_scrollVideos(containerId, 1));

    // Inicializar botones de navegación de videos
    wx_updateButtons(containerId);

    // Evento para actualizar las flechas al hacer scroll manual
    wx_videosList.addEventListener('scroll', () => wx_updateButtons(containerId));
  });

  // Menú
  const menuButton = document.querySelector('.wx-left-movil button');
  const asideMenu = document.getElementById('menu_aside');
  const mainContent = document.getElementById('content');
  const overlay = document.getElementById('overlay');
  const isMobile = window.innerWidth < 767;

  if (!menuButton || !asideMenu || !mainContent || !overlay) {
    console.error('Elementos del menú no encontrados.');
    return;
  }

  // Función para abrir/cerrar el menú
  function toggleMenu() {
    if (window.innerWidth >= 768) {
      // Para pantallas grandes
      asideMenu.classList.toggle('wx-sidenav-hidden');
      mainContent.classList.toggle('wx-main-expanded');
    } else {
      // Para dispositivos móviles
      asideMenu.classList.toggle('wx-sidenav-open');
      overlay.style.display = asideMenu.classList.contains('wx-sidenav-open') ? 'block' : 'none';
    }
  }

  // Evento para el botón del menú
  menuButton.addEventListener('click', toggleMenu);

  // Evento para cerrar el menú al hacer clic en el overlay (solo en móviles)
  overlay.addEventListener('click', function () {
    if (isMobile) {
      asideMenu.classList.remove('wx-sidenav-open');
      overlay.style.display = 'none';
    }
  });

  // Cerrar el menú al hacer clic fuera de él en dispositivos móviles
  document.addEventListener('click', function (event) {
    if (isMobile && asideMenu.classList.contains('wx-sidenav-open')) {
      const isClickInsideMenu = asideMenu.contains(event.target);
      const isClickOnMenuButton = menuButton.contains(event.target);

      if (!isClickInsideMenu && !isClickOnMenuButton) {
        asideMenu.classList.remove('wx-sidenav-open');
        overlay.style.display = 'none';
      }
    }
  });

  // Ajustar el menú al cambiar el tamaño de la ventana
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      asideMenu.classList.remove('wx-sidenav-open');
      overlay.style.display = 'none';
    }
  });
});

// Función para alternar entre modo claro y oscuro
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const isDarkMode = body.getAttribute('data-theme') === 'dark';

  // Cambiar el tema
  if (isDarkMode) {
    body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Icono de luna (modo oscuro)
    localStorage.setItem('theme', 'light'); // Guardar preferencia
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Icono de sol (modo claro)
    localStorage.setItem('theme', 'dark'); // Guardar preferencia
  }
}

// Aplicar el tema guardado al cargar la página
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');

  body.setAttribute('data-theme', savedTheme);

  // Actualizar el ícono del botón
  if (savedTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Asignar evento al botón de cambio de tema
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Aplicar el tema guardado
  applySavedTheme();
});