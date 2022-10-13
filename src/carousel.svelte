<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.3/dist/css/bulma-carousel.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.3/dist/js/bulma-carousel.min.js"></script>
</svelte:head>

<div class="container" id="carousel">
    <!-- Start Carousel 
        fix with cdn links after hosting-->
    <div id="opening_slideshow" class="carousel">
        <div class="item-1">
            <img src="/resources/bird_placeholder1.jpg">
        </div>
        <div class="item-2">
            <img src="/resources/bird_placeholder2.jpg">
        </div>
        <div class="item-3">
            <img src="/resources/bird_placeholder3.jpg">
        </div>
        <div class="item-4">
            <img src="/resources/bird_placeholder4.jpg">
        </div>
        <div class="item-5">
            <img src="/resources/bird_placeholder5.jpg">
        </div>
    </div>
    <!-- End Carousel -->
</div>

<script>
    bulmaCarousel.attach('#opening-slideshow', {
        slidesToScroll: 1,
        slidesToShow: 1,
        autoplay: true
    });
</script>