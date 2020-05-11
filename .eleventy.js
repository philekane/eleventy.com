const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");
//const  hostUrl = window.location.hostname;
module.exports = function(eleventyConfig){

    eleventyConfig.addPassthroughCopy("css");
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


  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toUTC().toFormat("LLL dd yyyy");
  });

  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  //remove spaces replace with dashess
  eleventyConfig.addFilter("spaceless", str => {
    return str.replace(/\s+/g, '-').toLowerCase();
  });

  //get url
  eleventyConfig.addShortcode("getHomeUrl", () => { hostUrl
    } );
  
  

  function extractExcerpt(article) {
    if (!article.hasOwnProperty('templateContent')) {
      console.warn('Failed to extract excerpt: Document has no property "templateContent".');
      return null;
    }
   
    let excerpt = null;
    const content = article.templateContent;
   
    // The start and end separators to try and match to extract the excerpt
    const separatorsList = [
      { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
      { start: '<p>', end: '</p>' }
    ];
   
    separatorsList.some(separators => {
      const startPosition = content.indexOf(separators.start);
      const endPosition = content.indexOf(separators.end);
   
      if (startPosition !== -1 && endPosition !== -1) {
        excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
        return true; // Exit out of array loop on first match
      }
    });
   
    return excerpt;
  }
  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

    return{
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md", "yml", "css", "txt" ],
        dir:{
            input: "src",
            output: "_site",
            include: "includes",
            data: "_data"

        }
    }
}