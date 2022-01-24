const dummy = (blogs) => {
  return(
    1
  )
}

const favoriteBlogs = (blogs) => {
    if (!blogs || blogs.length === 0 ) {
        return (0)
    }

    if (blogs.length === 1) {
        return(blogs[0])
    }
    const likes = blogs.map(blog => blog.likes)
    const max = Math.max(...likes);
    return(blogs[likes.indexOf(max)])
}

const totalLikes = (posts) => {
    if (!posts || posts.length === 0 ) {
        return (0)
    }

    if (posts.length === 1) {
        return(posts[0].likes)
    }

    const likes = posts.map(post => post.likes)
    const sum =  likes.reduce((result,number)=> result+number);
    return(
        sum
        )
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs
}