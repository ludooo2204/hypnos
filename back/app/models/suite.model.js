module.exports =(sequelize,Sequelize)=>{
    const suite = sequelize.define("suite",{
     
        nom:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        imageMiseEnAvant:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        description:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        prix:{
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        UrlBooking:{
            type: Sequelize.STRING,
            allowNull: false,

        }
    });
    return suite
}