<!--
    TODO: 
    - fix icon to link to homepage
    - add in content for the slideshow
-->

<!DOCTYPE html>
<!-- svelte-ignore a11y-missing-attribute -->
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>How to Survive CS@WPI</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <!--Needed to run the opening page-->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.3/dist/css/bulma-carousel.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.3/dist/js/bulma-carousel.min.js"></script>
    </head>
    <body>
        <container class="is-fixed-top">
            <br>
            <h1 class="title has-text-centered">HOW TO SURVIVE CS@WPI</h1>
            <nav class="navbar" role="navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://www.pictureofhotdog.com/">
                        <img src="https://cdn-icons-png.flaticon.com/512/5766/5766858.png">
                    </a>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                            Full Stack/Design
                        </a>      
                        <a class="navbar-item">
                            Theory
                        </a>
                        <a class="navbar-item">
                            Cybersecurity
                        </a>
                    </div>
                </div>
            </nav>
        </container>
        <br>
        <container>
            <!-- Start Carousel -->
            <div id="opening-slideshow" class="carousel">
                <div class="item-1">
                    <img src="./resources/bird_placeholder1.jpg">
                </div>
                <div class="item-2">
                    <img src="./resources/bird_placeholder2.jpg">
                </div>
                <div class="item-3">
                    <img src="./resources/bird_placeholder3.jpg">
                </div>
                <div class="item-4">
                    <img src="./resources/bird_placeholder4.jpg">
                </div>
                <div class="item-5">
                    <img src="./resources/bird_placeholder5.jpg">
                </div>
            </div>
            <!-- End Carousel -->
        </container>
		<script>
            bulmaCarousel.attach('#opening-slideshow', {
                slidesToScroll: 1,
                slidesToShow: 1,
                autoplay: true
            });
		</script>
        <br>
        <footer class="footer">
            <div class="content has-text-centered">
              <p>
                <strong>How to Survive CS@WPI</strong> by Hailey Anderson & Chayanne Sandoval-Williams.
              </p>
              <p>
                For CS 4241: Webware Computational Technology For Network Information Systems
              </p>
            </div>
          </footer>

    </body>

</html>