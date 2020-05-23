document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll(".lazy > source"));
  
    if ("IntersectionObserver" in window) {
      console.log("IntersectionObserver is supported. Rock on!");
      let lazyImageObserver = new IntersectionObserver(
        function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              if (entry instanceof HTMLImageElement) {
                lazyImage.nextElementSibling.src =
                  lazyImage.nextElementSibling.dataset.src;
              }
              lazyImage.nextElementSibling.srcset =
                lazyImage.nextElementSibling.dataset.srcset;
              lazyImage.nextElementSibling.classList.add("fade-in");
              lazyImage.parentElement.classList.remove("lazy");
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        },
        {
          rootMargin: "0px 0px 568px 0px"
        }
      );
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Possibly fall back to a more compatible method here
      console.log("IntersectionObserver is not supported in this browser.");
      let active = false;
  
      const lazyLoad = function() {
        if (active === false) {
          active = true;
  
          setTimeout(function() {
            lazyImages.forEach(function(lazyImage) {
              if (
                lazyImage.getBoundingClientRect().top <= window.innerHeight &&
                lazyImage.getBoundingClientRect().bottom >= 0 &&
                getComputedStyle(lazyImage).display !== "none"
              ) {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.srcset = lazyImage.dataset.srcset;
                lazyImage.classList.remove("lazy");
  
                lazyImages = lazyImages.filter(function(image) {
                  return image !== lazyImage;
                });
  
                if (lazyImages.length === 0) {
                  document.removeEventListener("scroll", lazyLoad);
                  window.removeEventListener("resize", lazyLoad);
                  window.removeEventListener("orientationchange", lazyLoad);
                }
              }
            });
  
            active = false;
          }, 200);
        }
      };
  
      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
    }
  });