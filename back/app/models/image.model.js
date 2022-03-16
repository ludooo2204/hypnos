module.exports =(sequelize,Sequelize)=>{
    const image = sequelize.define("image",{
     
        nom:{
            type: Sequelize.STRING,
            allowNull: false,

        },

    });
    return image
}