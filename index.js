const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');



app.use(express.json());
app.use(cors());
let port = env.process.env.PORT || 3001;
db.sequelize.sync().then(()=>{
    app.listen(port,()=>{
        console.log("SERVER IS RUNNING ON 3001 PORT");
    });

    const usersRouter = require('./Routes/User');
    app.use("/user",usersRouter);

    const postRouter = require('./Routes/Post');
    app.use("/post",postRouter);

    const likesRouter = require('./Routes/Likes');
    app.use("/likes",likesRouter);

    const commentRouter = require('./Routes/Comments');
    app.use("/comments",commentRouter);


    
    
})
