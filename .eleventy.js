module.exports = function(eleventyConfig){

   
    eleventyConfig.addPassthroughCopy("assets");

    return{
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md", "yml" ],
        dir:{
            input: "src",
            output: "_site",
            include: "includes",
            data: "_data"

        }
    }
}