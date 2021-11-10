module.exports=(sequelize,DataTypes)=>{

    const Post = sequelize.define("Post",{
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        desc:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        profile:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        
    });
    Post.associate = (models) =>{
        Post.hasMany(models.Comments,{
            onDelete : "cascade",
        });
       

        Post.hasMany(models.Likes,{
            onDelete : "cascade",
        });
    }

   
    return Post;
};