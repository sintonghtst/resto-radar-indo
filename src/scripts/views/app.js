import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'block';

    try {
      this._content.innerHTML = '';
      this._content.innerHTML = await page.render();
      await page.afterRender();

      const skipLinkElement = document.querySelector('.skip-link');
      skipLinkElement.addEventListener('click', (event) => {
        event.preventDefault();
        const mainContent = document.getElementById('maincontent');
        mainContent.tabIndex = 0;
        mainContent.focus();
      });
    } catch (error) {
      console.error('Error rendering page:', error);
    } finally {
      loadingOverlay.style.display = 'none';
    }
  }
}

export default App;
