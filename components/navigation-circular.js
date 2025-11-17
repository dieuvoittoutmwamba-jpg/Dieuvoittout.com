class CustomNavigationCircular extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
        }
        .menu-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #4F46E5;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
          transition: transform 0.3s ease;
          position: relative;
          z-index: 2;
        }
        .menu-toggle:hover {
          transform: scale(1.1);
        }
        .menu-items {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
        }
        .menu-item {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          color: #4F46E5;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          opacity: 0;
          transform: scale(0);
          cursor: pointer;
        }
        .menu-item:hover {
          background: #f15a24;
          color: white;
        }
        :host([open]) .menu-item {
          opacity: 1;
          transform: scale(1);
        }
        :host([open]) .menu-item:nth-child(1) {
          transform: translate(-70px, -30px) scale(1);
        }
        :host([open]) .menu-item:nth-child(2) {
          transform: translate(-50px, -70px) scale(1);
        }
        :host([open]) .menu-item:nth-child(3) {
          transform: translate(0, -90px) scale(1);
        }
        :host([open]) .menu-item:nth-child(4) {
          transform: translate(50px, -70px) scale(1);
        }
      </style>
      <div class="menu-toggle" id="toggle">
        <i data-feather="plus"></i>
      </div>
      <div class="menu-items">
        <a href="/" class="menu-item" title="Accueil">
          <i data-feather="home"></i>
        </a>
        <a href="etudes.html" class="menu-item" title="Études">
          <i data-feather="book"></i>
        </a>
<a href="priere.html" class="menu-item" title="Prière">
          <i data-feather="pray"></i>
        </a>
<a href="#" class="menu-item" title="Contact">
          <i data-feather="mail"></i>
        </a>
      </div>
    `;

    const toggle = this.shadowRoot.getElementById('toggle');
    toggle.addEventListener('click', () => {
      this.hasAttribute('open') 
        ? this.removeAttribute('open') 
        : this.setAttribute('open', '');
      feather.replace();
    });
  }
}
customElements.define('custom-navigation-circular', CustomNavigationCircular);