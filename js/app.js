$(function(){

	var $window = $(window);

	var raf           = requestAnimationFrame;
  var lastScrollTop = $window.scrollTop();

  $window.on('load', function(){
    if( lastScrollTop > 90 ){
      $('header').addClass('active');
      $('.nav-btn').addClass('active-header');
    }
    checkScrollPos();
  });

    if (raf) {
        loop();
    }

    function loop() {

        var scrollTop = $window.scrollTop();
        var y         = (scrollTop > lastScrollTop) ? 'down' : ((scrollTop === lastScrollTop) ? 'none' : 'up');

        if (lastScrollTop === scrollTop) {

            raf(loop);
            return;

        } else {

            lastScrollTop = scrollTop;
            raf(loop);

        }

        if( scrollTop > 90 ){
          $('header').addClass('active');
          $('.nav-btn').addClass('active-header');
        } else{
          $('header').removeClass('active');
          $('.nav-btn').removeClass('active-header');
        }

        lastScrollTop = scrollTop;
        checkHiddenStuff();

        $(".parallax").css("transform","translateY(" +  (scrollTop*0.25)  + "px)");
        $(".mouse-scroll").css("transform","translateX(" +  ( -( (scrollTop - $window.height()/2 - 90) - $(".mouse-scroll").width()/2) *0.2 )  + "px)"  );


    }


    function checkHiddenStuff(){
        $('.scroll-in').each(function(){
            if ( inView($(this).parent()) ) {
                $(this).addClass('show');
            } 
        });
    }
    checkHiddenStuff();

    function checkScrollPos(){
      setTimeout(function(){
        checkHiddenStuff();
      },500); 
    };


    function inView(elem){
      
        if (elem.length){
          var centerY = Math.max(0,(($window.height() - elem.outerHeight()/2) ) + $window.scrollTop());
          var elementTop = elem.offset().top;
          return elementTop <= centerY;
        }
        
    }


    $('.nav-btn').on("click", function(){

      $(this).toggleClass("active");
      $('#site-nav').fadeToggle('fast');

      if( lastScrollTop > 90 ){
        $(this).toggleClass('active-header');
      } else{
        $(this).removeClass('active-header');
      }
      
    });


});




/*
function daVideoPlayer(player){


  var play_btn        = player.querySelector('.video-play-btn');
  var thumbnail       = player.querySelector('.thumbnail');
  var video_container = player.querySelector('.video-container');
  var video           = player.querySelector('.player');
  var video_controls  = player.querySelector('.video-controls');
  var toggle          = player.querySelector('.toggle-btn');
  var progressBar     = player.querySelector('.progress-bar');
  var progress        = player.querySelector('.progress-fill');
  var tooltip         = player.querySelector('.progress-tooltip');
  var duration        = player.querySelector('.duration');
  var volumeBar       = player.querySelector('.volume-track');
  var volumeIndicator = player.querySelector('.volume-indicator');
  var volumeIcon      = player.querySelector('.volume-icon');
  var fs_toggle       = player.querySelector('.fs_toggle');
  var mousemove       = false;
  var timeout         = null;
 
  // Play video 
  function startVideo(){

      thumbnail.classList.add('hide');
      thumbnail.style.zIndex = '6';
      video_controls.style.zIndex = '2147483647 !important';
      video.classList.add('show');

      video.play();
      controlsShow();

  };

  // Listen for video to end
  function videoEnded(){

      thumbnail.classList.remove('hide');
      thumbnail.style.zIndex = '10';
      video_controls.style.zIndex = '6 !important';
      video.classList.remove('show');
      video.currentTime = 0;

      controlsHide();

  }

  // Pause/Play video 
  function toggleVideo(){

    if( video.paused ){
      video.play();
      toggle.innerHTML = '<i class="icon-pause"></i>';
    } else{
      video.pause();
      toggle.innerHTML = '<i class="icon-play"></i>';
    }

  };

  // Video progress/duration
  function handleProgress(){

    var percent = (video.currentTime / video.duration) * 100;

    progress.style.width = percent + '%';

  };
  function handleDuration(){

      countdown = video.duration - video.currentTime

      duration.innerHTML =  '-' + formatTime(countdown);
  };

  // Scrub video
  function scrub(e){

      var scrub_time = ( (e.offsetX + 6) / progressBar.offsetWidth ) * video.duration;

      if( mousemove == true ){

          video.currentTime = scrub_time;
          tooltip.innerHTML = formatTime(video.currentTime);
          tooltip.style.left = (e.offsetX - 35) + 'px';

      }

  };
  function scrubPause(){

      mousemove = true;
      video.pause();
      toggle.innerHTML = '<i class="icon-play"></i>';
      tooltip.classList.add('show');

  }
  function scrubPlay(){

      if( mousemove == true ){

          mousemove = false;
          video.play();
          toggle.innerHTML = '<i class="icon-pause"></i>';
          tooltip.classList.remove('show');

      }

  }

  // Contol video volume
  function volumeControl(){

      var volumePos = volumeBar.value/2;

      video.volume = volumeBar.value / 100;

      volumeIndicator.style.height = (volumePos) + 'px';

      if( video.volume >= 0.75 ){

        volumeIcon.innerHTML = '<i class="icon-volume-high"></i>';

      } else if( video.volume >= 0.5 ){

        volumeIcon.innerHTML = '<i class="icon-volume-medium"></i>';

      } else if( video.volume == 0 ){

        volumeIcon.innerHTML = '<i class="icon-volume-mute"></i>';

      } else{

        volumeIcon.innerHTML = '<i class="icon-volume-low"></i>';

      }

  };
    
  // Toggle video fullscreen
  function toggleFullScreen(){

        if (video_container.requestFullscreen) {

            if (document.fullScreenElement) {
                document.cancelFullScreen();
                fs_toggle.innerHTML = '<i class="icon-enlarge"></i>';
            } else {
                video_container.requestFullscreen();
                fs_toggle.innerHTML = '<i class="icon-shrink"></i>';
            }

        }
        else if (video_container.msRequestFullscreen) {

            if (document.msFullscreenElement) {
                document.msExitFullscreen();
                fs_toggle.innerHTML = '<i class="icon-enlarge"></i>';
            } else {
                video_container.msRequestFullscreen();
                fs_toggle.innerHTML = '<i class="icon-shrink"></i>';
            }

        }
        else if (video_container.mozRequestFullScreen) {

            if (document.mozFullScreenElement) {
                document.mozCancelFullScreen();
                fs_toggle.innerHTML = '<i class="icon-enlarge"></i>';
            } else {
                video_container.mozRequestFullScreen();
                fs_toggle.innerHTML = '<i class="icon-shrink"></i>';
            }

        }
        else if (video_container.webkitRequestFullscreen) {

            if (document.webkitFullscreenElement) {
                document.webkitCancelFullScreen();
                fs_toggle.innerHTML = '<i class="icon-enlarge"></i>';
            } else {
                video_container.webkitRequestFullscreen();
                fs_toggle.innerHTML = '<i class="icon-shrink"></i>';
            }

        }
      
  };
  
  // Show/Hide video controls
  function controlsSleep(){

      clearTimeout(timeout);
      video_controls.classList.add('show');

      timeout = setTimeout(function() {

        video_controls.classList.remove('show');

      }, 3000);

  };
  function controlsHide(){

      if( mousemove != true ){

          video_controls.classList.remove('show');

      }

  };
  function controlsShow(){

      video_controls.classList.add('show');

  };


  play_btn.addEventListener('click', startVideo);
  video.addEventListener('ended', videoEnded);
  toggle.addEventListener('click', toggleVideo);
  video.addEventListener('timeupdate', handleProgress);
  video.addEventListener('timeupdate', handleDuration);
  progressBar.addEventListener('click', scrub);
  progressBar.addEventListener('mousemove', scrub);
  progressBar.addEventListener('mousedown', scrubPause);
  document.addEventListener('mouseup', scrubPlay);
  volumeBar.addEventListener("change", volumeControl);
  volumeBar.addEventListener('mousemove', volumeControl);
  fs_toggle.addEventListener('click',toggleFullScreen);
  player.addEventListener('mousemove', controlsSleep);
  player.addEventListener('mouseout', controlsHide);

    
}

function formatTime(secs, format) {

  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) - (min * 60));

  if (min < 10){ 
    min = "0" + min; 
  }
  if (sec < 10){ 
    sec  = "0" + sec;
  }

  return min + ':' + sec;

}



var player = document.querySelectorAll('.video-player');

daVideoPlayer(player[0]);


*/




