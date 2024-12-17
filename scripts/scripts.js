class TabManager {
    constructor(config, defaultTabIndex = 0) {
        this.tabs = config;
        this.defaultTabIndex = defaultTabIndex;
        this.init();
    }

    init() {
        // Найти все кнопки и вкладки, привязать события
        this.tabs.forEach((tab, index) => {
            const toggleButton = document.getElementById(tab.toggleID);
            const tabElement = document.getElementById(tab.tabID);

            if (!toggleButton || !tabElement) {
                console.warn(`Не удалось найти элемент с ID: ${tab.toggleID} или ${tab.tabID}`);
                return;
            }

            // Установка обработчика события клика
            toggleButton.addEventListener('click', () => {
                this.showTab(index);
            });
        });

        // Открыть вкладку по умолчанию
        this.showTab(this.defaultTabIndex);
    }

    showTab(index) {
        this.tabs.forEach((tab, i) => {
            const toggleButton = document.getElementById(tab.toggleID);
            const tabElement = document.getElementById(tab.tabID);

            if (!toggleButton || !tabElement) {
                return;
            }

            if (i === index) {
                // Показать вкладку и активировать кнопку
                tabElement.classList.add('visible');
                tabElement.classList.remove('hidden');
                toggleButton.classList.add('button-orange');
                toggleButton.classList.remove('button');
            } else {
                // Скрыть вкладку и деактивировать кнопку
                tabElement.classList.remove('visible');
                tabElement.classList.add('hidden');
                toggleButton.classList.remove('button-orange');
                toggleButton.classList.add('button');
            }
        });
    }
}

class Menu {
    constructor(config) {
        this.toggle = document.getElementById(config.toggleID);
        this.menu = document.getElementById(config.menuID);
        this.nav = document.getElementById(config.navID);
        this.langToggle = document.getElementById(config.langToggleID);
        this.langMenu = document.getElementById(config.langMenuID);
        this._isOpen = false;
        this._isLangMenuOpen = false;
        this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => {
            this._showMenu();
        });

        this.langToggle.addEventListener('click', () => {
            this._showLangMenu();
        })

        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                this.menu.classList.add('shadow-md');
                this.menu.classList.add('card-gradient');
                this.menu.classList.remove('bg-neutral-100');
            } else {
                this.menu.classList.remove('shadow-md');
                this.menu.classList.remove('card-gradient');
                this.menu.classList.add('bg-neutral-100');
            }
        });

        this._dropdowns = [];
        document.querySelectorAll('.menu-dropdown').forEach((item) => {
            this._dropdowns.push({
                toggle: item.querySelector('.menu-dropdown-toggle'),
                list: item.querySelector('.menu-dropdown-list'),
                isOpen: false
            });
        });

        this._dropdowns.forEach((item, index) => {
            item.toggle.addEventListener('click', () => {
                this._dropdown(index);
            });
        });
    }
    
    _showMenu() {
        switch (this._isOpen) {
            case true:
                this._isOpen = false;
                this.nav.classList.add('menu-hidden');
                break;
            case false:
                this._isOpen = true;
                this.nav.classList.remove('menu-hidden');
                break;
        }
    }

    _showLangMenu() {
        switch (this._isLangMenuOpen) {
            case true:
                this._isLangMenuOpen = false;
                this.langMenu.classList.add('hidden');
                break;
            case false:
                this._isLangMenuOpen = true;
                this.langMenu.classList.remove('hidden');
                break;
        }
    }

    _dropdown(dropdownIndex) {
        console.log(this._dropdowns[dropdownIndex].isOpen)
        function applyClasses(arr) {
            arr.forEach((item) => {
                if(item.isOpen) {
                    item.list.classList.add('menu-dropdown-list-dropped');
                } else {
                    item.list.classList.remove('menu-dropdown-list-dropped');
                }
            })
        }
        switch (this._dropdowns[dropdownIndex].isOpen) {
            case true:
                this._dropdowns[dropdownIndex].isOpen = false;
                applyClasses(this._dropdowns);
                break;
            case false:
                this._dropdowns.forEach((item) => {
                    item.isOpen = false;
                });
                this._dropdowns[dropdownIndex].isOpen = true;
                applyClasses(this._dropdowns);
                break;
        }
    }
}