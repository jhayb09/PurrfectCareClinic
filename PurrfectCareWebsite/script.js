const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryNavContainer = document.querySelector('.gallery-nav');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });

        this.updateNav();
    }

    updateNav() {
        const activeIndex = this.carouselArray.findIndex(item => item.classList.contains('gallery-item-3'));
        const navItems = document.querySelectorAll('.gallery-nav li');
        navItems.forEach((navItem, index) => {
            if (index === activeIndex) {
                navItem.classList.add('gallery-item-selected');
            } else {
                navItem.classList.remove('gallery-item-selected');
            }
        });
    }

    setCurrentState(direction) {
        if (direction.className.includes('gallery-controls-previous')) {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            button.innerText = control;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }

    setNav() {
        this.carouselArray.forEach(() => {
            const navItem = document.createElement('li');
            galleryNavContainer.appendChild(navItem);
        });
        this.updateNav();
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.setNav();

exampleCarousel.handleNavClick = (index) => {
    const activeIndex = exampleCarousel.carouselArray.findIndex(item => item.classList.contains('gallery-item-3'));
    const direction = index > activeIndex ? 'next' : 'previous';
    exampleCarousel.setCurrentState({ className: `gallery-controls-${direction}` });
  };
  
  // Add event listeners to the pagination dots
  document.querySelectorAll('.gallery-nav li').forEach((navItem, index) => {
    navItem.addEventListener('click', () => {
      exampleCarousel.handleNavClick(index);
    });
  });
  const menuIcon = document.querySelector('.menu-icon');
  const navContainer = document.querySelector('.nav-container');

  menuIcon.addEventListener('click', () => {
      navContainer.classList.toggle('show-nav');
  });






