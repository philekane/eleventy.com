const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function(eleventyConfig){

    //eleventyConfig.addFilter("consoleDump",  console.log("dump")  );
//use {% prd variable %} for debugging
    eleventyConfig.addShortcode("prd", function(dump) { 
      const data = dump
      return `<p class="prdcode">${data}</p>` }
      );

    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.setWatchJavaScriptDependencies(false);

    eleventyConfig.addPlugin(lazyImagesPlugin);
   

    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
      });

    eleventyConfig.addShortcode("copyrightYear", () => `&copy; ${new Date().getFullYear()}`);
    eleventyConfig.addShortcode("currentDate", () => `${new Date().toLocaleDateString()}`);
    

    // Responsive image shortcode
    /*
    <source sizes="auto" media="(max-width:500px)" data-srcset="/assets/img/${filename}-500.webp 500w" type="image/webp">
  <source sizes="auto" media="(max-width:500px)" data-srcset="/assets/img/${filename}-500.jpeg 500w" type="image/jpeg">
 
  <source sizes="auto" media="(max-width:641px)" data-srcset="/assets/img/${filename}-641.webp 641w" type="image/webp">
  <source sizes="auto" media="(max-width:641px)" data-srcset="/assets/img/${filename}-641.jpeg 641w" type="image/jpeg">
  <source sizes="auto" media="(max-width:873px)" data-srcset="/assets/img/${filename}-873.webp 873w" type="image/webp">
  <source sizes="auto" media="(max-width:873px)" data-srcset="/assets/img/${filename}-873.jpeg 873w" type="image/jpeg">
  */
  eleventyConfig.addShortcode("insertImage", function(filename, alttext, classname) {
    const imageName = filename.substring(0, filename.length - 4);
    const extension = filename.substr(filename.lastIndexOf('.') + 1);
   

    /* the following is what you place in markup
    {% insertImage  portfolio.data.image ,  portfolio.data.altText, "" %}
  */

//<img sizes="auto" src="${imageName}.${extension}" srcset="${imageName}.${extension} alt="${alttext}">" ; 

  return `
    <picture>
      <source data-sizes="auto" media="(max-width:500px)"  type="image/webp" srcset="${imageName}.webp">
      <source data-sizes="auto" media="(max-width:500px)"  type="image/${extension}" srcset="${imageName}.${extension}" >
      <img data-sizes="auto"  ${ classname != "" ?  `class="${classname}"` : '' } src="${imageName}.${extension}" srcset="${imageName}.${extension}" alt="${alttext}">
    </picture>    
    `;
});

eleventyConfig.addShortcode("insertLazyImage", function(filename, alttext, classname) {
  const imageName = filename.substring(0, filename.length - 4);
  const extension = filename.substr(filename.lastIndexOf('.') + 1);
  
return `
  <noscript>
    <picture>
      <source data-sizes="auto" media="(max-width:500px)"  type="image/webp" srcset="${imageName}.webp">
      <source data-sizes="auto" media="(max-width:500px)"  type="image/${extension}" srcset="${imageName}.${extension}" >
      <img data-sizes="auto"  ${ classname != "" ?  `class="${classname}"` : '' }  src="${imageName}.${extension}"  srcset="${imageName}.${extension}" alt="${alttext}">
    </picture>
  </noscript>
<picture>
<source data-sizes="auto" media="(max-width:500px)"  type="image/webp" srcset="${imageName}.webp">
<img data-sizes="auto"  ${ classname != "" ?  `class="${classname} ll"` : 'class="ll"' } src="${imageName}.${extension}" srcset="${imageName}.${extension}" alt="${alttext}">
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
        templateFormats: ["html", "njk", "md", "yml", "css", "txt", "php" ],
        dir:{
            input: "src",
            output: "_site",
            include: "_includes",
            data: "_data",
            layouts: "_includes/layouts/"
           

        }
    }

   
}