class BlockCode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['file', 'lang'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  async copyCode() {
    const slot = this.shadowRoot.querySelector('slot');
    const assignedNodes = slot.assignedNodes();
    let text = '';

    assignedNodes.forEach(node => {
      text += node.textContent;
    });

    try {
      await navigator.clipboard.writeText(text.trim());
      const copyBtn = this.shadowRoot.querySelector('.copy-btn span');
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '¡Copiado!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    } catch (err) {
      console.error('Error al copiar el código: ', err);
    }
  }

  render() {
    const file = this.getAttribute('file') || '';
    const lang = this.getAttribute('lang') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 2rem 0 !important;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          padding: 20px;
        }

        .code-container {
          background-color: #121212;
          border: 1px solid #2d2d2d;
          border-radius: 6px;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #1e1e1e;
          padding: 8px 16px;
          border-bottom: 1px solid #2d2d2d;
          user-select: none;
        }

        .left-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .file-name {
          color: #bcbcbc;
          font-size: 13px;
          font-family: monospace;
        }

        .lang-badge {
          background-color: #2d2d2d;
          color: #8e8e8e;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 500;
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #bcbcbc;
          font-size: 13px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .copy-btn:hover {
          background-color: #2d2d2d;
          color: #ffffff;
        }

        .copy-icon {
          width: 14px;
          height: 14px;
          fill: currentColor;
        }

        .code-body {
          padding: 16px;
          overflow-x: hidden;
          margin: 0;
        }

        /* Estilos aplicados al contenido del slot (Markdown/MDX) */
        ::slotted(pre) {
          margin: 0 !important;
          background: transparent !important;
          padding: 0 !important;
          white-space: pre-wrap !important;      /* permite wrap */
          word-break: break-word !important;     /* corta palabras larguísimas */
          overflow-wrap: anywhere !important;    /* evita que se salga del contenedor */
        }

        ::slotted(code) {
          font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          color: #e3e3e3;
        }
      </style>

      <div class="code-container">
        <div class="top-bar">
          <div class="left-info">
            ${file ? `<span class="file-name">${file}</span>` : ''}
            ${lang ? `<span class="lang-badge">${lang}</span>` : ''}
          </div>
          <button class="copy-btn" id="copyMe">
            <svg class="copy-icon" viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            <span>Copiar</span>
          </button>
        </div>
        <div class="code-body">
          <slot></slot>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('copyMe').addEventListener('click', () => this.copyCode());
  }
}

customElements.define('block-code', BlockCode);
