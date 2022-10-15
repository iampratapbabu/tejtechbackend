const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:{
        type:String,
        unique:true,
        required:[true,'A Title is Required for the blog'],
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 10 characters']
    },
   
    body:{
        type:String,
        required:[true,"Please Provide the Blog body"]
    }
   
});

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;
