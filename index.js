const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// comments  array

let comments = [
    {
        id:uuid(),
        username: 'todd',
        comment: 'lololololool soo funny'
    },
    {
        id:uuid(),
        username: 'mvnu',
        comment: 'make it or fake it'
    },
    {
        id:uuid(),
        username: 'mwendwa',
        comment: 'gerrrararhere here'
    },
    {
        id:uuid(),
        username: 'wambua',
        comment: 'soooooounny'
    }
      
];

// get comments

app.get('/comments', (req, res) => {
    
    res.render('comments/index', {comments})
})

// create new comments
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// post new comment or post route
app.post('/comments', (req, res) => {
   
    const { username, comment } = req.body;
    comments.push({ username, comment, id:uuid() });
    res.redirect('/comments')
})

// route for comment id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment});
})


// eddit comments
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment})
})



// upddate for comments
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

// delete comment

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})





app.get('/tacos', (req, res) => {
    res.send("GET /tacos responce")
})

app.post('/tacos', (req, res) => {
    const { meat,qty}= req.body;
    res.send(`OK, here are your  ${qty}  ${meat} tacos` )
})


app.listen(3000, () => {
    console.log('listening at port 3000')
})



