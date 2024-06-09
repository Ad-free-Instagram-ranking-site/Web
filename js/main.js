    (function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    var locationsLoaded = {};
    var day = 'Weekly';

    function changeDay(newDay) {
        day = newDay;
        console.log(day);
    }

   
    async function loadAndDisplayData(location) {



        console.log(`Loading data for ${location}`); // Debugging
    
        var existingShop = document.getElementById(`shop-${location}-0`);
        shopsContainer.innerHTML = "";
        async function fetchData() {
            let url = 'http://ec2-13-125-15-214.ap-northeast-2.compute.amazonaws.com:3000/api/s3data/';
            url += location + "/";
            url += day;
            try {
                let response = await fetch(url);
                let data = await response.json();
                return data;
            } catch (error) {
                console.error('Error:', error);
            }
        }
    
        fetchData().then(jsonData => {
            jsonData.sort((a, b) => b.score - a.score);
            for (var i = 0; i < 10; i++) {
                var shop = jsonData[i];
                console.log(shop);
                var shopHtml = document.createElement('div');

                shopHtml.id = `shop-${location}-${i}`;
                shop.score = parseInt(shop.score)
                shopHtml.innerHTML = `
                <div>
                    <h1 style="text-align: center; padding: 10px; padding-left: 200px; ">${i + 1} ${shop.shop_name}</h1>
                    <p style="text-align: center; padding: 10px;  padding-left: 200px; ">Factors Score: ${shop.score}</p>
                    <p style="text-align: center; padding: 10px;  padding-left: 200px; ">Total Likes: ${shop.total_likes}</p>
                    <p style="text-align: center; padding: 10px;  padding-left: 200px; ">Total Posts: ${shop.total_posts}</p>
                </div>
                `;
                shopsContainer.appendChild(shopHtml);
            }
            console.log(jsonData);
            locationsLoaded[location] = true;
        });
    }

    window.loadAndDisplayData = loadAndDisplayData;

    document.addEventListener('DOMContentLoaded', function(){
        const locationNames = ['Yonnam', 'Yeouido', 'Yongsan', 'Gangnam', 'Jamsil', 'Kondae', 'Euljiro', 'Nowon'];
        let navItems = document.querySelectorAll('.nav-item.nav-link');

        for (let i = 0; i < navItems.length; i++) {
          let link = navItems[i];
      
          let newLink = link.cloneNode(true);
          link.parentNode.replaceChild(newLink, link);
      
          newLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            event.stopImmediatePropagation();
            loadAndDisplayData(locationNames[i]);
          });
        }
        document.getElementById("Monday").addEventListener("click", function() {
            changeDay("Monday");
        });

        document.getElementById("Tuesday").addEventListener("click", function() {
            changeDay("Tuesday");
        });

        document.getElementById("Wednesday").addEventListener("click", function() {
            changeDay("Wednesday");
        });

        document.getElementById("Thurthday").addEventListener("click", function() {
            changeDay("Thurthday");
        });
        document.getElementById("Friday").addEventListener("click", function() {
            changeDay("Friday");
        });

        document.getElementById("Saturday").addEventListener("click", function() {
            changeDay("Saturday");
        });
        
        document.getElementById("Sunday").addEventListener("click", function() {
            changeDay("Sunday");
        });

        document.getElementById("Weekly").addEventListener("click", function() {
            changeDay("Weekly");
        });

      });
      
    
})(jQuery);


