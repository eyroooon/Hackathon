const dummy = (blogs) => {
  if (blogs) return 1;
  else return 0;
};

const totalLikes = (blogs) => {
  if (blogs.length > 0) {
    return blogs.map((blog) => blog.likes).reduce((sum, likes) => sum + likes);
  } else {
    return 0;
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    const obj = blogs.filter(
      (blog) => blog.likes === Math.max(...blogs.map((b) => b.likes))
    );
    return obj[0];
  } else {
    return 0;
  }
};

module.exports = {
  favoriteBlog,
  dummy,
  totalLikes,
};
