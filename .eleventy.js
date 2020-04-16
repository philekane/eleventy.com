const CleanCSS = require("clean-css");
module.exports = function(eleventyConfig){

   // eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
      });

    eleventyConfig.addShortcode("copyrightYear", () => `&copy; ${new Date().getFullYear()}`);
    eleventyConfig.addShortcode("currentDate", () => `${new Date().toLocaleDateString()}`);
   

    

    // Responsive image shortcode
  eleventyConfig.addShortcode("insertImage", function(filename, alttext) {
    return `
<picture>
  <source sizes="auto" media="(max-width:641px)" srcset="/assets/img/${filename}.webp" type="image/webp">
  <source sizes="auto" media="(max-width:641px)" data-srcset="/assets/img/${filename}-641.webp 641w" type="image/webp">
  <source sizes="auto" media="(max-width:641px)" data-srcset="/assets/img/${filename}-641.jpeg 641w" type="image/jpeg">
  <source sizes="auto" media="(max-width:873px)" data-srcset="/assets/img/${filename}-873.webp 873w" type="image/webp">
  <source sizes="auto" media="(max-width:873px)" data-srcset="/assets/img/${filename}-873.jpeg 873w" type="image/jpeg">
  <!-- And more image sizes and formats-->
  <img sizes="auto" src="/assets/img/${filename}" srcset="/assets/img/${filename}" alt="${alttext}">
</picture>
    `;
  });


    return{
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md", "yml", "css" ],
        dir:{
            input: "src",
            output: "_site",
            include: "includes",
            data: "_data"

        }
    }
}