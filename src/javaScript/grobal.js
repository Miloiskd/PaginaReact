$(document).scroll(function () {
      var y = window.scrollY;
      const offset = $('.offset');
      if (y > 10) {
        $('.navbar').addClass('small');
        offset.css('padding-top', '70px');
      } else {
        $('.navbar').removeClass('small');
        offset.css('padding-top', '250px');
      }
    });

    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let index = 0;
    const itemWidth = document.querySelector('.carousel-item').offsetWidth + 20;

    nextBtn.addEventListener('click', () => {
      if (index < track.children.length - 3) {
        index++;
        track.style.transform = `translateX(-${itemWidth * index}px)`;
      }
    });

    prevBtn.addEventListener('click', () => {
      if (index > 0) {
        index--;
        track.style.transform = `translateX(-${itemWidth * index}px)`;
      }
    });

    $(window).on('scroll', function () {
      let scrollBottom = $(window).scrollTop() + $(window).height();
      let documentHeight = $(document).height();
      if (scrollBottom >= documentHeight - 5) {
        $('body').addClass('tight');
        $('.arrow').fadeOut();
      } else {
        $('body').removeClass('tight');
        $('.arrow').fadeIn();
      }
    });

    $('.arrow').click(function () {
      $("html").animate({ scrollTop: $('html').prop("scrollHeight") }, 1200);
    });