module.exports=(sequelize,DataTypes)=>{

    const Users = sequelize.define("Users",{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        mobile:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        profile:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        type:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    });

    Users.associate = (models) =>{
        Users.hasMany(models.Likes,{
            onDelete : "cascade",
        });
    }

    return Users;
};