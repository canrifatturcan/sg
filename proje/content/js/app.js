$(document).ready(function () {
    // tab content
    $(".tab_content").hide();
    $(".tab_content:first").show();

    setTabActive();
});

function sliderInit() {
    new Swiper(".swiper-container", {
        loop: false,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        slidesPerView: 4.3,
        slidesPerGroup: 4,
        paginationClickable: false,
        spaceBetween: 15,
        cssMode: true,
        breakpoints: {
            1920: {
                slidesPerView: 4.3,
                spaceBetween: 15,
            },
            1028: {
                slidesPerView: 3.3,
                spaceBetween: 15,
            },
            480: {
                slidesPerView: 2.3,
                spaceBetween: 15,
            },
        },
    });
}


let jsonString;
let products;
$(document).ready(function () {
    let url = "../product-list.json";
    $.ajax({
        url: url,
        dataType: "json",
        error: function () {
            console.log("JSON FAILED for data");
        },
        success: function (results) {
            jsonString = results;

            let menuItem = document.getElementById("categoryName");
            let userCategories = jsonString.responses[0][0].params.userCategories;

            userCategories.forEach(
                (element, index) => {
                    menuItem.insertAdjacentHTML(
                        "beforeend",
                        "<li><a onclick='showTabProduct(this)' data-id='" + index +"' href=#" + index +" >"+ element +" </a></li>"
                    );
                   
                }
            );

            let productElement = document.getElementById("productList");

            products = jsonString.responses[0][0].params.recommendedProducts;
            let firstTabProduct = products[Object.keys(products)[0]];

            let tabHtml =
                "<div id='0' class='tab_content'>\
                    <div class='swiper-container'>\
                    <div class='swiper-wrapper'></div>\
                    <div class='swiper-button-prev'><svg width='16' height='16' viewBox='0 0 24 24' fill='#333'><path d='M18.683.32a1.079 1.079 0 00-1.398-.116L17.15.32 6.317 11.229c-.38.383-.419.98-.114 1.407l.114.135 10.834 10.91a1.078 1.078 0 001.532 0c.38-.384.419-.982.114-1.408l-.114-.135L8.613 12l10.07-10.138c.38-.383.419-.981.114-1.407L18.683.32z'></path></svg></div>\
                    <div class='swiper-button-next'><svg width='16' height='16' viewBox='0 0 24 24' fill='#333'><path d='M6.317.32A1.079 1.079 0 017.715.204L7.85.32l10.834 10.909c.38.383.419.98.114 1.407l-.114.135L7.85 23.681a1.078 1.078 0 01-1.532 0 1.098 1.098 0 01-.114-1.408l.114-.135L16.387 12 6.316 1.862A1.097 1.097 0 016.202.455L6.317.32z'></path></svg></div>\
                    </div></div>";

            $("#productList").append(tabHtml);
            appendProduct(firstTabProduct, 0);

            $(".tab_content").hide();
            $(".tab_content:first").show();

            sliderInit();
            setTabActive();

            jQuery("#categoryName").find("a:first").addClass("active");
        },
    });
});

function showTabProduct(btn) {
    let tabProduct = products[Object.keys(products)[$(btn).data("id")]];
    if ($("#" + $(btn).data("id")).length == 0) {
        let tabHtml =
            "<div id='" +
            $(btn).data("id") +
            "' class='tab_content'>\
                    <div class='swiper-container'>\
                    <div class='swiper-wrapper'></div>\
                    <div class='swiper-button-prev'><svg width='16' height='16' viewBox='0 0 24 24' fill='#333'><path d='M18.683.32a1.079 1.079 0 00-1.398-.116L17.15.32 6.317 11.229c-.38.383-.419.98-.114 1.407l.114.135 10.834 10.91a1.078 1.078 0 001.532 0c.38-.384.419-.982.114-1.408l-.114-.135L8.613 12l10.07-10.138c.38-.383.419-.981.114-1.407L18.683.32z'></path></svg></div>\
                    <div class='swiper-button-next'><svg width='16' height='16' viewBox='0 0 24 24' fill='#333'><path d='M6.317.32A1.079 1.079 0 017.715.204L7.85.32l10.834 10.909c.38.383.419.98.114 1.407l-.114.135L7.85 23.681a1.078 1.078 0 01-1.532 0 1.098 1.098 0 01-.114-1.408l.114-.135L16.387 12 6.316 1.862A1.097 1.097 0 016.202.455L6.317.32z'></path></svg></div>\
                    </div></div>";
        $("#productList").append(tabHtml);

        appendProduct(tabProduct, $(btn).data("id"));
    }
    sliderInit();
}

function setTabActive() {
    $("ul.tabs li a").click(function () {
        $(".tab_content").hide();
        var activeTab = $(this).attr("href");
        $(activeTab).fadeIn();

        $("ul.tabs li a").removeClass("active");
        $(this).addClass("active");
    });
}

function appendProduct(productList, id) {
    productList.forEach((element, index) => {
        let productHtml =
            "<div class='swiper-slide'>\
                <a href='" + element.url +"'>\
                    <img src='" + element.image +"' loading='lazy'>\
                    <h2>" + element.name +"</h2>\
                    <span class='price'>" + element.priceText +"</span>\
                    <figure class='freeCargo'>\
                        <span style='display:none' class='" + element.params.shippingFee +"'>\
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='#36b458'><path d='M23.808 9.733L21.552 6.6A1.421 1.421 0 0020.4 6h-4.08V4.5c0-.828-.645-1.5-1.44-1.5H1.44C.645 3 0 3.672 0 4.5v12c0 .828.645 1.5 1.44 1.5h1.44c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h5.76c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h1.92c1.06 0 1.92-.895 1.92-2v-5.667c0-.216-.067-.427-.192-.6zM5.76 20c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm11.52 0c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm5.76-9h-6.72V7h4.08c.15 0 .293.075.384.2l2.256 3.133V11z'></path></svg>\
                        Ücrestisz Kargo\
                        </span>\
                    </figure>\
                </a>\
                <button type='button' onclick='myFunction()'>\
                    Sepete Ekle\
                </button>\
            </div>";
        $("#" + id + " .swiper-wrapper").append(productHtml);
        $(".FREE").show();
    });
}

function myFunction() {
    console.log("deneme");
    $(".addBasket").removeClass("hide");
    setTimeout(function(){
        $(".addBasket").addClass("hide");
    }, 5000);
}

$(".close-alert").click(function () {
    $(".addBasket").addClass("hide");
});


