let ready = () => {
    
    // Общие функции
    // Закрыть элемент если тапнули вне его
    const closeElement = (parent, button) => {
        document.addEventListener('click', e => {
            if(!e.target.closest(parent) && !e.target.closest(button)) {
                closeProduct();
            }
        });
    }
    // Кнопка показать еще 
    const moreButton = (element, text, icon) => {
        let arButtons = document.querySelectorAll(element);
        let arrow = '';

        switch (icon) {
            case 'right':
                arrow = `
                <svg width="3" height="6" viewBox="0 0 3 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.12371 0.603844C0.0845106 0.637041 0.0533969 0.676537 0.0321642 0.720053C0.0109314 0.763569 -2.04996e-07 0.810244 -2.02935e-07 0.857386C-2.00874e-07 0.904527 0.0109314 0.951203 0.0321642 0.994719C0.0533969 1.03824 0.0845106 1.07773 0.12371 1.11093L2.03918 2.74646C2.07838 2.77965 2.1095 2.81915 2.13073 2.86267C2.15196 2.90618 2.1629 2.95286 2.1629 3C2.1629 3.04714 2.15196 3.09382 2.13073 3.13733C2.1095 3.18085 2.07838 3.22035 2.03918 3.25354L0.12371 4.88907C0.0845108 4.92227 0.0533971 4.96177 0.0321643 5.00528C0.0109316 5.0488 -1.76824e-08 5.09547 -1.56218e-08 5.14261C-1.35612e-08 5.18976 0.0109316 5.23643 0.0321644 5.27995C0.0533971 5.32346 0.0845108 5.36296 0.12371 5.39616C0.20207 5.46267 0.30807 5.5 0.41856 5.5C0.529049 5.5 0.635049 5.46267 0.713409 5.39616L2.63307 3.75706C2.86803 3.55619 3 3.2839 3 3C3 2.7161 2.86803 2.44381 2.63307 2.24294L0.713409 0.603844C0.635049 0.537333 0.529049 0.5 0.41856 0.5C0.30807 0.5 0.20207 0.537333 0.12371 0.603844Z" fill="#026BB0"/>
                </svg>
                `;
                break;
        
            case 'bottom':
                arrow = `
                    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2923 0.247421C10.2259 0.169022 10.1469 0.106794 10.0599 0.0643288C9.97286 0.0218632 9.87951 6.83319e-08 9.78523 6.7645e-08C9.69095 6.69581e-08 9.59759 0.0218632 9.51056 0.0643288C9.42353 0.106794 9.34454 0.169022 9.27814 0.247421L6.00708 4.07837C5.94069 4.15677 5.8617 4.219 5.77467 4.26146C5.68763 4.30393 5.59428 4.32579 5.5 4.32579C5.40572 4.32579 5.31237 4.30393 5.22533 4.26146C5.1383 4.219 5.05931 4.15677 4.99291 4.07837L1.72186 0.247421C1.65546 0.169022 1.57647 0.106794 1.48944 0.0643287C1.4024 0.0218632 1.30905 5.89414e-09 1.21477 5.20727e-09C1.12049 4.52039e-09 1.02714 0.0218632 0.940104 0.0643287C0.853072 0.106794 0.77408 0.169022 0.707685 0.247421C0.574664 0.404141 0.5 0.616141 0.5 0.837119C0.5 1.0581 0.574664 1.2701 0.707685 1.42682L3.98589 5.26613C4.38763 5.73605 4.9322 6 5.5 6C6.06779 6 6.61237 5.73605 7.01411 5.26613L10.2923 1.42682C10.4253 1.2701 10.5 1.0581 10.5 0.837119C10.5 0.616141 10.4253 0.404141 10.2923 0.247421Z" fill="#026BB0"/>
                    </svg>
                `;
                break;
            
            default:
                break;
        }

        for(var i = 0; i < arButtons.length; i++) {
            if(arButtons[i].children.length > 3) {
                for(var ii = 0; ii < arButtons[i].children.length; ii++) {                
                    if (ii >= 3) {
                        arButtons[i].children[ii].classList.add('hide');
                    }
                }
                let moreBtn = document.createElement("span");
                moreBtn.classList.add('moreBtnJs');
                moreBtn.innerHTML = text + arrow;
                arButtons[i].append(moreBtn.cloneNode(true));
            }
        }

        let moreBtns = document.querySelectorAll('.moreBtnJs');
        for(var i = 0; i < moreBtns.length; i++) {
            moreBtns[i].addEventListener('click', e => {
                let elem = e.target;
                for(var i = 0; i < elem.closest('.menu').children.length; i++) {
                    elem.closest('.menu').children[i].classList.remove('hide');
                }
                elem.closest('.menu').removeChild(elem);
            })
        }
    }   

    // Общие функции

    // Выпадающее меню начало
    let dropdownMenuCatalogItem = document.querySelectorAll('.dropdownMenuCatalog li');
    let submenuActive = document.querySelector('.submenuActive');
    let menuImageActive = document.querySelector('.menuImageActive');
    let btnCatalog = document.querySelector('.btnCatalog');
    let dropdownMenu = document.querySelector('.dropdownMenu');
    let dropdownMenuWrapClose = document.querySelector('.dropdownMenuWrapClose');

    const deleteDinamicMenu = () => {
        submenuActive.innerHTML = '';
        menuImageActive.innerHTML = '';
    }

    btnCatalog.addEventListener('click', e => {
        dropdownMenu.classList.toggle('active');
    });
    dropdownMenuWrapClose.addEventListener('click', e => {
        dropdownMenu.classList.toggle('active');
    });

    dropdownMenuCatalogItem.forEach(li => {
        li.addEventListener('mouseover', e => {
            
            deleteDinamicMenu();
            let currentEl = e.currentTarget;
            
            for(var i = 0; i < dropdownMenuCatalogItem.length; i++) {
                dropdownMenuCatalogItem[i].classList.remove('active');
            }
            currentEl.classList.add('active');

            let submenu = currentEl.querySelector('.submenu').cloneNode(true); // клонировать сообщение
            let imageMenu = currentEl.querySelector('.bigImageMenu').cloneNode(true); // клонировать сообщение
      
            submenuActive.append(submenu);
            menuImageActive.append(imageMenu);

        })
    });
    document.addEventListener('click', e => {
        if(!e.target.closest('.dropdownMenuWrap') && !e.target.closest('.btnCatalog')) {
            dropdownMenu.classList.remove('active');
            deleteDinamicMenu();
        }
    });
    // Выпадающее меню конец

    // Слайдеры начало
    var sliderWrap = document.getElementsByClassName("sliderWrap");

    for(var i = 0; i < sliderWrap.length; i++) {
    
        var el = sliderWrap[i];  
    
        var swiper = el.getElementsByClassName("slider_1")[0];
        var nx = el.getElementsByClassName("swiper-btn-next")[0];
        var pr = el.getElementsByClassName("swiper-btn-prev")[0];
    
        new Swiper(swiper, {
            slidesPerView: 4,  
            spaceBetween: 10,
            navigation: {
                nextEl: nx,
                prevEl: pr
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: 2
                },
                // when window width is >= 640px
                768: {
                  slidesPerView: 4
                }
              }
        });
    }


    const sliderThumbs = new Swiper('.slider__thumbs', { // ищем слайдер превью по селектору
        // задаем параметры
        direction: 'vertical', // вертикальная прокрутка
        slidesPerView: 6, // показывать по 3 превью
        spaceBetween: 7, // расстояние между слайдами
        navigation: { // задаем кнопки навигации
            nextEl: '.slider__next', // кнопка Next
            prevEl: '.slider__prev' // кнопка Prev
        },
        freeMode: true, // при перетаскивании превью ведет себя как при скролле
        breakpoints: { // условия для разных размеров окна браузера
            0: { // при 0px и выше
                direction: 'horizontal', // горизонтальная прокрутка
            },
            768: { // при 768px и выше
                direction: 'vertical', // вертикальная прокрутка
            }
        }
    });
    // Инициализация слайдера изображений
    const sliderImages = new Swiper('.slider__images', { // ищем слайдер превью по селектору
        // задаем параметры
        direction: 'vertical', // вертикальная прокрутка
        slidesPerView: 1, // показывать по 1 изображению
        mousewheel: false, // можно прокручивать изображения колёсиком мыши
        navigation: { // задаем кнопки навигации
            nextEl: '.slider__next', // кнопка Next
            prevEl: '.slider__prev' // кнопка Prev
        },
        grabCursor: true, // менять иконку курсора
        thumbs: { // указываем на превью слайдер
            swiper: sliderThumbs // указываем имя превью слайдера
        },
        breakpoints: { // условия для разных размеров окна браузера
            0: { // при 0px и выше
                direction: 'horizontal', // горизонтальная прокрутка
            },
            768: { // при 768px и выше
                direction: 'vertical', // вертикальная прокрутка
            }
        }
    });
    
    // Слайдеры конец

    // Переключение отображения каталога начало
    let listClone = false;
    let compactClone = false;
    let elemDone = false;

    const changeCatalogView = (view) => {
        let catalogTopGrid = document.querySelector('.catalogTop_grid');
        let productItem = document.querySelectorAll('.productItem');
        const arrElements = (count) => {
            let name = productItem[count].querySelector('.productItemAbout__title').cloneNode(true);
            let stars = productItem[count].querySelector('.productItemAbout__stars').cloneNode(true);
            let productItemBodyInfo = productItem[count].querySelector('.productItemBody_info');
            productItemBodyInfo.prepend(stars);
            productItemBodyInfo.prepend(name);
        }
        const listBlock = () => {
            for(var i = 0; i < productItem.length; i++) {
                let productItemTopDinamic = productItem[i].querySelector('.productItemTop_dinamic').cloneNode(true);
                let productItemBodyImage = productItem[i].querySelector('.productItemBody_image');
                if(elemDone != true) {
                    arrElements(i);
                    productItemBodyImage.append(productItemTopDinamic);
                } 
            }
            elemDone = true;
        }
        const compactBlock = () => {
            for(var i = 0; i < productItem.length; i++) {
                let productItemAboutExist = productItem[i].querySelector('.productItemAbout__exist').cloneNode(true);
                let productItemBodyInfo = productItem[i].querySelector('.productItemBody_info');
                
                if(elemDone != true) {
                    arrElements(i);
                    productItemBodyInfo.append(productItemAboutExist);
                } 
                
            }
            elemDone = true;
        }
        const delClass = () => catalogTopGrid.classList.remove("list" , "comapct", "grid");
        switch (view) {
            case 'grid':
                delClass();
                break;
            case 'list':
                delClass();                
                catalogTopGrid.classList.add('list');
                if(listClone != true) {
                    listBlock();
                    listClone = true;
                }
                break;
            case 'compact':
                delClass();
                catalogTopGrid.classList.add('comapct', 'list');
                if(compactClone != true) {
                    compactBlock();
                    compactClone = true;
                }
                break;
            default:
                break;
        }
    }


    // Переключение отображения каталога конец
    
    // Табы начало

    let tabs = document.querySelector('.tabs');
    let tabsContent = document.querySelector('.tabsContent');

    if(tabs) {
        for(var i = 0; i < tabs.children.length; i++) {
            tabs.children[i].addEventListener('click', e => {
                let curEl = e.target;
                for(var i = 0; i < tabs.children.length; i++) {
                    tabs.children[i].classList.remove('active');
                    tabsContent.children[i].classList.remove('active');
                }
                curEl.classList.add('active');
                tabsContent.children[curEl.dataset.tab].classList.add('active');
            })
        }
    }

    let tabs1 = document.querySelector('.productPageContent_tabs');
    let tabsContent1 = document.querySelector('.productPageContent_content');

    if(tabs1) {
        for(var i = 0; i < tabs1.children.length; i++) {
            tabs1.children[i].addEventListener('click', e => {
                let curEl = e.target;
                for(var i = 0; i < tabs1.children.length; i++) {
                    tabs1.children[i].classList.remove('active');
                    tabsContent1.children[i].classList.remove('active');
                }
                curEl.classList.add('active');
                tabsContent1.children[curEl.dataset.tab].classList.add('active');
            })
        }
    }

    let catalogTopGrid = document.querySelectorAll('.catalogTopGrid a');

    for(var i = 0; i < catalogTopGrid.length; i++) {
        if(catalogTopGrid[i].classList.contains('active')) {
            changeCatalogView(catalogTopGrid[i].dataset.view);
        }
        catalogTopGrid[i].addEventListener('click', e => {
            e.preventDefault();
            for(var i = 0; i < catalogTopGrid.length; i++) {
                catalogTopGrid[i].classList.remove('active');
            }
            e.currentTarget.classList.add('active');
            changeCatalogView(e.currentTarget.dataset.view);
        });
    }
    
    // Табы конец

    // Рейндж количества начало

    let rangeWrap = document.querySelectorAll('.rangeWrap');

    for(var i = 0; i < rangeWrap.length; i++) {

        
        let sliderOne = rangeWrap[i].querySelector(".slider-1");
        let sliderTwo = rangeWrap[i].querySelector(".slider-2");
        let displayValOne = rangeWrap[i].querySelector(".range1");
        let displayValTwo = rangeWrap[i].querySelector(".range2");
        let sliderTrack = rangeWrap[i].querySelector(".slider-track");
        let sliderMaxValue = rangeWrap[i].querySelector(".slider-1").max;
        
        displayValOne.value = sliderOne.value;
        displayValTwo.value = sliderTwo.value;
        fillColor();
        function slideOne(){
            displayValOne.value = sliderOne.value;
            fillColor();
        }
        function slideTwo(){
            displayValTwo.value = sliderTwo.value;
            fillColor();
        }
        function fillColor(){
            percent1 = (sliderOne.value / sliderMaxValue) * 100;
            percent2 = (sliderTwo.value / sliderMaxValue) * 100;
            sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #EC6300 ${percent1}% , #EC6300 ${percent2}%, #dadae5 ${percent2}%)`;
        }
        sliderOne.addEventListener('input', e => {
            slideOne();
        })
        sliderTwo.addEventListener('input', e => {
            slideTwo();
        })
    }
    // Рейндж количества конец

    
    // Табы фильтра начало
    let filterListItemTop = document.querySelectorAll('.filterListItem_top');
    let moreBtnFilter = document.querySelectorAll('.filterListItem .moreBtn');

    for(var i = 0; i < filterListItemTop.length; i++) {
        filterListItemTop[i].addEventListener('click', e => {
            e.currentTarget.closest('.filterListItem').classList.toggle('active');
           
        });
    }

    for(var i = 0; i < moreBtnFilter.length; i++) {
        moreBtnFilter[i].addEventListener('click', e => {
            let items = e.currentTarget.closest('.filterListItem_checkbox').querySelectorAll('.filterListItem_row');
            
            for(var t = 0; t < items.length; t++) {
               if(t > 3) {
                    items[t].classList.toggle('hidden');
               }
            }
            e.currentTarget.classList.add('hidden');
        });
    }

    // Табы фильтра конец

    // --------- Кастомовые селекты на странице начало

    /* Look for any elements with the class "custom-select": */
    const customSelect = (select, count) => {
        x = document.getElementsByClassName(select);
        l = x.length;
        for (i = 0; i < l; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /* For each element, create a new DIV that will act as the selected item: */
            a = document.createElement("div");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            a.setAttribute("value", selElmnt.options[selElmnt.selectedIndex].value);
            x[i].appendChild(a);
            /* For each element, create a new DIV that will contain the option list: */
            b = document.createElement("div");
            b.setAttribute("class", "select-items select-hide");
            for (j = count; j < ll; j++) {
                /* For each option in the original select element,
                create a new DIV that will act as an option item: */
                c = document.createElement("div");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function(e) {
                    /* When an item is clicked, update the original select box,
                    and the selected item: */
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function(e) {
                /* When the select box is clicked, close any other select boxes,
                and open/close the current select box: */
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }

        function closeAllSelect(elmnt) {
            /* A function that will close all select boxes in the document,
            except the current select box: */
            var x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                arrNo.push(i)
                } else {
                y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
                }
            }
        }
        /* If the user clicks anywhere outside the select box,
        then close all select boxes: */
        document.addEventListener("click", closeAllSelect);
    }
    customSelect("customSelect", 0);
    customSelect("deliverySelect", 0);

    // --------- Кастомовые селекты на странице конец


    /*
        Продуктовые аналоги,всплывающие окна 
    */
    let productPageUpsalesContentsBodyItem = document.querySelectorAll('.productPageUpsalesContentsBody_item');
    
    const closeProduct = () => {
        for(var i = 0; i < productPageUpsalesContentsBodyItem.length; i++) {
            productPageUpsalesContentsBodyItem[i].classList.remove('active');
        }
    }

    for(var i = 0; i < productPageUpsalesContentsBodyItem.length; i++) {
        productPageUpsalesContentsBodyItem[i].addEventListener('click', e => {
            closeProduct();
            e.currentTarget.classList.add('active');
        });
    }
    closeElement('.productPageUpsalesContentsBody_dinamic','.productPageUpsalesContentsBody_item');



    /*
        Перенос элементов в мобильной верстке
    */

    let tablet = false;
    let mobile = false;

    function mobileElements (e) {
        
        // Куда переносим
        let mobileMenu = document.querySelector('.mobileMenu');
        let headerWrap = document.querySelector('.headerWrap');
        let mobilePanel = document.querySelector('.mobilePanel');
        let mainCatalogListMobile = document.querySelector('.mainCatalogListMobile');
        //Что переносим
        let menu = document.querySelector('.navigation .menu');
        let city = document.querySelector('.city');
        let burgerMenu = document.querySelector('.burgerMenu');
        let topSocial = document.querySelector('.topSocial');
        let blockPhones = document.querySelector('.blockPhones');
        let shopBlock = document.querySelector('.shopBlock');
        let workingHours = document.querySelector('.workingHours');
        let btnCatalog = document.querySelector('.btnCatalog');
        let mainCatalogList = document.querySelectorAll('.mainCatalogList .card');


        if(window.outerWidth < 993) {

            if(tablet != true) {
                mobileMenu.prepend(menu.cloneNode(true));
                tablet = true;
            }
        }
        
        if(window.outerWidth < 768) {

            if(mobile != true) {
                mobileMenu.prepend(city.cloneNode(true));
                mobileMenu.append(btnCatalog.cloneNode(true));
                mobileMenu.append(topSocial.cloneNode(true));
                mobileMenu.append(workingHours.cloneNode(true));

                mobilePanel.prepend(shopBlock.cloneNode(true));
                mobilePanel.prepend(blockPhones.cloneNode(true));

                headerWrap.insertAdjacentElement('beforeend', burgerMenu);

                // Каталог на главной 
                for(var i = 0; i < mainCatalogList.length; i++) {
                    let mainCatalogItem = document.createElement("div");
                    mainCatalogItem.classList.add('mainCatalogItem');
                    mainCatalogItem.prepend(mainCatalogList[i].cloneNode(true));                    
                    mainCatalogListMobile.append(mainCatalogItem);
                }

                // Переводим в кнопку показать еще 
                moreButton('.mainCatalogItem .menu', 'Смотреть все', 'right');
            
                mobile = true;
            }
        }
    }
    mobileElements();

    window.addEventListener('resize', e => {
        mobileElements();
    })

    let burgerMenu = document.querySelector('.burgerMenu');
    let mobileMenu = document.querySelector('.mobileMenu');
    let mobileMenuClose = document.querySelector('.mobileMenuClose');

    burgerMenu.addEventListener('click', e => mobileMenu.classList.add('active'));
    mobileMenuClose.addEventListener('click', e => mobileMenu.classList.remove('active'));
}

document.addEventListener('DOMContentLoaded', ready);