let ready = () => {
    
    // Общие функции
    const closeElement = (parent, button) => {
        document.addEventListener('click', e => {
            if(!e.target.closest(parent) && !e.target.closest(button)) {
                closeProduct();
            }
        });
    }
    // Общие функции

    // Выпадающее меню начало
    let dropdownMenuCatalogItem = document.querySelectorAll('.dropdownMenuCatalog li');
    let submenuActive = document.querySelector('.submenuActive');
    let menuImageActive = document.querySelector('.menuImageActive');
    let btnCatalog = document.querySelector('.btnCatalog');
    let dropdownMenu = document.querySelector('.dropdownMenu');

    const deleteDinamicMenu = () => {
        submenuActive.innerHTML = '';
        menuImageActive.innerHTML = '';
    }

    btnCatalog.addEventListener('click', e => {
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

}

document.addEventListener('DOMContentLoaded', ready);