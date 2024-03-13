class HeaderCustom extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <header class="header">
          <div class="header_content">
            <div class="logo">
              <img class="logo_img" src="./icon.png" alt="logo resto radar indo">
            </div>
            <button id="hamburger" class="hamburger_menu" tabindex="0" aria-label="menu hamburger">☰</button>
            <nav id="drawer" class="nav">
              <ul class="nav_list">
                <li><a href="/" class="nav_item">Home</a></li>
                <li><a href="#/favorite" class="nav_item">Favorite</a></li>
                <li><a href="https://bit.ly/sintonghtst" target="__blank" class="nav_item">About Us</a></li>
              </ul>
            </nav>
          </div>
        </header>
      `;
  }
}

class OverlayCustom extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div id="loading-overlay" class="loading">
          <div class="loader"></div>
        </div>
      `;
  }
}

class JumbotronCustom extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="jumbotron">
          <picture>
            <source media="(max-width: 600px)" srcset="./images/hero-image_2_compress-small.jpg">
            <img src="./images/hero-image_2_compress-large.jpg">
          </picture>
          <div class="jumbotron_overlay">
            <div class="jumbotron_teks">
                <h1 class="jumbotron_title">Selamat Datang di Resto Radar Indo</h1>
                <p class="jumbotron_tagline">Temukan Pilihan Kuliner Terbaik di Kota Anda</p>
            </div>
          </div>
        </div>
      `;
  }
}

class FooterCustom extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <footer class="footer">
          <div class="footer_content">
            <p>RestoRadarIndo.com adalah situs web yang menyediakan daftar restoran terbaik di kota Anda. Temukan dan jelajahi berbagai pilihan kuliner dari restoran-restoran terkemuka.</p><br>
            <p>&copy; <span id="currentYear"></span> RestoRadarIndo.com. All rights reserved.</p>
          </div>
        </footer>
      `;
  }
}

customElements.define('header-custom', HeaderCustom);
customElements.define('overlay-custom', OverlayCustom);
customElements.define('jumbotron-custom', JumbotronCustom);
customElements.define('footer-custom', FooterCustom);
