(function() {
    'use strict';
    
    // Configuration
    const config = {
        position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
        theme: 'light', // light, dark
        language: 'en', // en, es, fr, de, etc.
        features: {
            fontSize: true,
            contrast: true,
            grayscale: true,
            highContrast: true,
            negativeContrast: true,
            lightBackground: true,
            links: true,
            fontFamily: true,
            cursor: true,
            readingGuide: true,
            screenReader: true,
            keyboardNavigation: true
        }
    };

    // Accessibility features implementation
    const AccessibilityWidget = {
        init() {
            this.createWidget();
            this.createPanel();
            this.bindEvents();
            this.loadSettings();
        },

        createWidget() {
            const widget = document.createElement('div');
            widget.id = 'accessibility-widget';
            widget.innerHTML = `
                <button id="accessibility-toggle" aria-label="Accessibility Menu" title="Accessibility Menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </button>
            `;
            document.body.appendChild(widget);
        },

        createPanel() {
            const panel = document.createElement('div');
            panel.id = 'accessibility-panel';
            panel.innerHTML = `
                <div class="accessibility-header">
                    <h3>Accessibility</h3>
                    <button id="close-panel" aria-label="Close">×</button>
                </div>
                <div class="accessibility-content">
                    <div class="accessibility-section">
                        <h4>Text Size</h4>
                        <div class="control-group">
                            <button id="decrease-font" aria-label="Decrease font size">A-</button>
                            <button id="reset-font" aria-label="Reset font size">Reset</button>
                            <button id="increase-font" aria-label="Increase font size">A+</button>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h4>Contrast</h4>
                        <div class="control-group">
                            <button id="high-contrast" aria-label="High contrast">High Contrast</button>
                            <button id="negative-contrast" aria-label="Negative contrast">Negative</button>
                            <button id="grayscale" aria-label="Grayscale">Grayscale</button>
                            <button id="light-background" aria-label="Light background">Light BG</button>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h4>Navigation</h4>
                        <div class="control-group">
                            <button id="highlight-links" aria-label="Highlight links">Highlight Links</button>
                            <button id="reading-guide" aria-label="Reading guide">Reading Guide</button>
                            <button id="big-cursor" aria-label="Big cursor">Big Cursor</button>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h4>Font</h4>
                        <div class="control-group">
                            <button id="font-dyslexic" aria-label="Dyslexic friendly font">Dyslexic</button>
                            <button id="font-sans" aria-label="Sans serif font">Sans Serif</button>
                            <button id="font-serif" aria-label="Serif font">Serif</button>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h4>Reset</h4>
                        <div class="control-group">
                            <button id="reset-all" aria-label="Reset all settings">Reset All</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(panel);
        },

        bindEvents() {
            // Toggle panel
            document.getElementById('accessibility-toggle').addEventListener('click', () => {
                this.togglePanel();
            });

            // Close panel
            document.getElementById('close-panel').addEventListener('click', () => {
                this.hidePanel();
            });

            // Font size controls
            document.getElementById('increase-font').addEventListener('click', () => {
                this.changeFontSize(1);
            });

            document.getElementById('decrease-font').addEventListener('click', () => {
                this.changeFontSize(-1);
            });

            document.getElementById('reset-font').addEventListener('click', () => {
                this.resetFontSize();
            });

            // Contrast controls
            document.getElementById('high-contrast').addEventListener('click', () => {
                this.toggleHighContrast();
            });

            document.getElementById('negative-contrast').addEventListener('click', () => {
                this.toggleNegativeContrast();
            });

            document.getElementById('grayscale').addEventListener('click', () => {
                this.toggleGrayscale();
            });

            document.getElementById('light-background').addEventListener('click', () => {
                this.toggleLightBackground();
            });

            // Navigation controls
            document.getElementById('highlight-links').addEventListener('click', () => {
                this.toggleHighlightLinks();
            });

            document.getElementById('reading-guide').addEventListener('click', () => {
                this.toggleReadingGuide();
            });

            document.getElementById('big-cursor').addEventListener('click', () => {
                this.toggleBigCursor();
            });

            // Font controls
            document.getElementById('font-dyslexic').addEventListener('click', () => {
                this.changeFontFamily('dyslexic');
            });

            document.getElementById('font-sans').addEventListener('click', () => {
                this.changeFontFamily('sans');
            });

            document.getElementById('font-serif').addEventListener('click', () => {
                this.changeFontFamily('serif');
            });

            // Reset all
            document.getElementById('reset-all').addEventListener('click', () => {
                this.resetAll();
            });

            // Close panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('#accessibility-widget') && 
                    !e.target.closest('#accessibility-panel')) {
                    this.hidePanel();
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hidePanel();
                }
            });
        },

        togglePanel() {
            const panel = document.getElementById('accessibility-panel');
            panel.classList.toggle('active');
        },

        hidePanel() {
            const panel = document.getElementById('accessibility-panel');
            panel.classList.remove('active');
        },

        changeFontSize(delta) {
            const currentSize = parseInt(localStorage.getItem('accessibility-font-size') || '100');
            const newSize = Math.max(50, Math.min(200, currentSize + delta * 10));
            localStorage.setItem('accessibility-font-size', newSize);
            document.documentElement.style.fontSize = newSize + '%';
        },

        resetFontSize() {
            localStorage.removeItem('accessibility-font-size');
            document.documentElement.style.fontSize = '100%';
        },

        toggleHighContrast() {
            const isActive = document.body.classList.toggle('accessibility-high-contrast');
            localStorage.setItem('accessibility-high-contrast', isActive);
        },

        toggleNegativeContrast() {
            const isActive = document.body.classList.toggle('accessibility-negative-contrast');
            localStorage.setItem('accessibility-negative-contrast', isActive);
        },

        toggleGrayscale() {
            const isActive = document.body.classList.toggle('accessibility-grayscale');
            localStorage.setItem('accessibility-grayscale', isActive);
        },

        toggleLightBackground() {
            const isActive = document.body.classList.toggle('accessibility-light-bg');
            localStorage.setItem('accessibility-light-bg', isActive);
        },

        toggleHighlightLinks() {
            const isActive = document.body.classList.toggle('accessibility-highlight-links');
            localStorage.setItem('accessibility-highlight-links', isActive);
        },

        toggleReadingGuide() {
            const isActive = document.body.classList.toggle('accessibility-reading-guide');
            localStorage.setItem('accessibility-reading-guide', isActive);
            if (isActive) {
                this.createReadingGuide();
            } else {
                this.removeReadingGuide();
            }
        },

        toggleBigCursor() {
            const isActive = document.body.classList.toggle('accessibility-big-cursor');
            localStorage.setItem('accessibility-big-cursor', isActive);
        },

        changeFontFamily(family) {
            const fonts = {
                dyslexic: 'OpenDyslexic, Arial, sans-serif',
                sans: 'Arial, Helvetica, sans-serif',
                serif: 'Georgia, Times, serif'
            };
            document.body.style.fontFamily = fonts[family];
            localStorage.setItem('accessibility-font-family', family);
        },

        createReadingGuide() {
            const guide = document.createElement('div');
            guide.id = 'reading-guide';
            guide.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: #ff0000;
                z-index: 9999;
                pointer-events: none;
            `;
            document.body.appendChild(guide);
        },

        removeReadingGuide() {
            const guide = document.getElementById('reading-guide');
            if (guide) guide.remove();
        },

        resetAll() {
            // Remove all classes
            document.body.classList.remove(
                'accessibility-high-contrast',
                'accessibility-negative-contrast',
                'accessibility-grayscale',
                'accessibility-light-bg',
                'accessibility-highlight-links',
                'accessibility-reading-guide',
                'accessibility-big-cursor'
            );
            
            // Reset styles
            document.documentElement.style.fontSize = '100%';
            document.body.style.fontFamily = '';
            
            // Clear localStorage
            localStorage.removeItem('accessibility-font-size');
            localStorage.removeItem('accessibility-high-contrast');
            localStorage.removeItem('accessibility-negative-contrast');
            localStorage.removeItem('accessibility-grayscale');
            localStorage.removeItem('accessibility-light-bg');
            localStorage.removeItem('accessibility-highlight-links');
            localStorage.removeItem('accessibility-reading-guide');
            localStorage.removeItem('accessibility-big-cursor');
            localStorage.removeItem('accessibility-font-family');
            
            // Remove reading guide
            this.removeReadingGuide();
        },

        loadSettings() {
            // Load font size
            const fontSize = localStorage.getItem('accessibility-font-size');
            if (fontSize) {
                document.documentElement.style.fontSize = fontSize + '%';
            }

            // Load font family
            const fontFamily = localStorage.getItem('accessibility-font-family');
            if (fontFamily) {
                this.changeFontFamily(fontFamily);
            }

            // Load other settings
            const settings = [
                'accessibility-high-contrast',
                'accessibility-negative-contrast',
                'accessibility-grayscale',
                'accessibility-light-bg',
                'accessibility-highlight-links',
                'accessibility-big-cursor'
            ];

            settings.forEach(setting => {
                if (localStorage.getItem(setting) === 'true') {
                    document.body.classList.add(setting);
                }
            });

            // Load reading guide
            if (localStorage.getItem('accessibility-reading-guide') === 'true') {
                document.body.classList.add('accessibility-reading-guide');
                this.createReadingGuide();
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AccessibilityWidget.init());
    } else {
        AccessibilityWidget.init();
    }
})();
