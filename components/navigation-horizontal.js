class CustomNavigationHorizontal extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
        }
        .logo {
          font-size: 1.25rem;
          font-weight: 700;
          color: #f15a24;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          color: #4B5563;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #4F46E5;
        }
        .nav-link.active {
          color: #4F46E5;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #4F46E5;
          border-radius: 2px;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      <nav>
        <a href="/" class="logo">
          <img src="assets/images/logo.png" alt="Logo DIEUVOITTOUT" style="height: 90px; width: auto; max-width: 200px; object-fit: contain;">
</a>
<div class="nav-links">
          <a href="/" class="nav-link">Accueil</a>
          <a href="apropos.html" class="nav-link">À Propos</a>
          <a href="etudes.html" class="nav-link">Études</a>
          <a href="priere.html" class="nav-link">Prière</a>
          <a href="temoignages.html" class="nav-link">Témoignages</a>
          <a href="contact.html" class="nav-link">Contact</a>
</div>
        <button class="mobile-menu-btn">
          <i data-feather="menu"></i>
        </button>
      </nav>
    `;
  }
}
customElements.define('custom-navigation-horizontal', CustomNavigationHorizontal);