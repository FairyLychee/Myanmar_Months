$(document).ready(() => {


    // buttons functions
    let icon = $(".navbar-brand");
    let home = $(".home");
    let about = $(".about");
    let showMonths = $(".show-months");
    let mainContent = $(".main-content");
    let aboutPage = $(".about-page");
    let months = $(".months");

    // home page click
    icon.on("click", showHome);
    home.on("click", showHome);

    // about button click
    about.on("click", (event) => {
        event.preventDefault(); // cuz anchor tag is refreshing
        // remove main content page 
        mainContent.removeClass("d-block");
        mainContent.addClass("d-none");
        // remove months page 
        months.removeClass("d-block");
        months.addClass("d-none");
        // add about page
        aboutPage.removeClass("d-none");
        aboutPage.addClass("d-block");
    });

    // show festivals button click
    showMonths.on("click", () => {
        // remove main content page 
        mainContent.removeClass("d-block");
        mainContent.addClass("d-none");
        // remove about page 
        aboutPage.removeClass("d-block");
        aboutPage.addClass("d-none");
        // add months page
        months.removeClass("d-none");
        months.addClass("d-block");
        // since I want to show months when I click
        // I call the funciton inside the showFestival button
        setTimeout(() => {
            monthList();
        }, 200); // call function after document is ready by using setTimeout

        // start back button action
        $(".btn-back").on("click", showHome);
        // since i want to go home page when I click back btn
        // I call showHome function
    });

    // function for showHome
    function showHome(event) {

        // to prevent refreshing when it's clicked
        event.preventDefault();
        // remove month page
        months.removeClass("d-block");
        months.addClass("d-none");
        // remove about page
        aboutPage.removeClass("d-block");
        aboutPage.addClass("d-none");
        // add home page
        mainContent.removeClass("d-none");
        mainContent.addClass("d-block");
    }
    // end of button function
})

async function monthList() {
    let response = await fetch("MyanmarMonths.json");
    let data = await response.json();

    let months = data["Tbl_Months"];
    let itemPerRow = 4;

    // start looping the array 
    //** i can't use for each cuz I have to put in the carousel
    for (let i = 0; i < months.length; i += itemPerRow) {
        // since I want to appear in carousel-item
        let carouselItem = $(`<div class="carousel-item"></div>`);
        let row = $(`<div class="row"></div>`);

        // i will increase with itemPerRow so i make j = i ;
        for (let j = i; j < i + itemPerRow; j++) {
            let column = $(`<div class="col-md-3 col-12 mb-4"></div>`);
            // images 
            let imgHolder = $(`<div class="card border-dark position-relative"></div>`);
            let img = $(`<img class="flower-images">`);
            // month title
            let nameHolder = $(`<div class="layer"></div>`);
            let monthName = $(`<h1 class=" month-name">${months[j].MonthMm}</h1>`)


            nameHolder.attr("value", months[j].Id);
            imgHolder.css("height", "350px");
            imgHolder.css("width", "100%");
            imgHolder.css("cursor", "pointer");
            img.attr("src", `img/${months[j].Id}.jpg`);
            img.css("height", "100%");

            nameHolder.append(monthName);
            imgHolder.append(img);
            imgHolder.append(nameHolder);
            column.append(imgHolder);
            row.append(column);
        }
        carouselItem.append(row);
        $(".carousel-inner").append(carouselItem);
    }
    $(".carousel-inner").children(':first').addClass("active");

    // month detail start here
    $(".layer").on("click", (event) => {
        // console.log(event.target)
        $(".detail-page").empty();

        // remove main content page 
        $(".background").removeClass("d-block");
        $(".background").addClass("d-none");
        // appear detail page
        $(".detail-page").removeClass("d-none");
        $(".detail-page").addClass("d-block");


        let selectedMonth = Number($(event.currentTarget).attr("value"));
        let monthFestival = months.findIndex(month => selectedMonth == month.Id);

        console.log(monthFestival)
        if (monthFestival.length !== -1) {
            // console.log("Hello World")
            let row = $(`<div class="row g-5 mt-5"></div>`);
            let column1 = $(`<div class="col-md-6"></div>`);
            let column2 = $(`<div class="col-md-6"></div>`);
            let button = $(`<button class="btn btn-outline-dark festival-back"></button>`);
            let image = $(`<img class="mb-4"/>`);
            let headerMm = $(`<h1 class="text-center myanmar-text"></h1>`);
            let headerEn = $(`<h2 class="text-center"></h2>`);
            let description = $(`<p class="myanmar-text"></p>`);
            let detail = $(`<p class="myanmar-text"></p>`);

            // adding img
            image.attr("src", months[monthFestival].ImagePath);
            image.css("width", "100%");
            // console.log(image)
            // adding headers
            headerMm.text(`${months[monthFestival].MonthMm}\n(${months[monthFestival].FestivalMm})`);
            headerEn.text(`${months[monthFestival].MonthEn}\n(${months[monthFestival].FestivalEn})`);
            // adding texts
            description.text(months[monthFestival].Description);
            detail.text(months[monthFestival].Detail);
            // adding btn
            button.text("နောက်သို့");

            column1.append(image, description);
            column2.append(detail);

            row.append(column1, column2);

            $(".detail-page").append(headerMm, headerEn, button, row);
        }
        // နောက်သို့ btn action
        $(".festival-back").on("click", () => {
            // appear detail page
            $(".detail-page").removeClass("d-block");
            $(".detail-page").addClass("d-none");
            // remove main content page 
            $(".background").removeClass("d-none");
            $(".background").addClass("d-block");

        })
    })
}
// The end...