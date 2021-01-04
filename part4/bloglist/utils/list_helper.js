const e = require("cors");
const _ = require("lodash")

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs)=>{
    // console.log(blogs);
    if (blogs.length === 0){
        // console.log("exit empty list");
        return ({})
    }

    const reducer = (max, blog)=>{
        return Math.max(max, blog.likes)
    }
    const likesHighest = blogs.reduce(reducer, 0);
    const theBlog = blogs.find(blog=>blog.likes === likesHighest)

    return ({
        author: theBlog.author,
        title: theBlog.title,
        likes: theBlog.likes
    })
    
}

const mostLikes = (blogs)=>{
    const result = 
    _.reduce(blogs, (result, blog, key) => {
            // console.log(blog, result);
            const person = _.find(result, { author: blog.author });
         //    console.log("author found", person);
            if (person) {
                const num = person.likes;
                _.set(person, 'likes', num + blog.likes);
            }
            else {
                result.push({ likes: blog.likes, author: blog.author });
            }
            return result;
        },[])
console.log(_.maxBy(result, e=>( e.likes)));

    return _.maxBy(result, e=>( e.likes))
 }
 
const mostBlogs = (blogs)=>{
   const result = 
   _.reduce(blogs, (result, blog, key) => {
        //    console.log(blog, result);
           const person = _.find(result, { author: blog.author });
        //    console.log("author found", person);
           if (person) {
               const num = person.blogs;
               _.set(person, 'blogs', num + 1);
           }
           else {
               result.push({ blogs: 1, author: blog.author });
           }
           return result;
       },[])
   return _.maxBy(result, e=>( e.blogs))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
