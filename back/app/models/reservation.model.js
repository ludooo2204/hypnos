module.exports =(sequelize,Sequelize)=>{
    const reservation = sequelize.define("reservation",{
     
        dateDebut:{
            type: Sequelize.DATE,
            allowNull: false,

        },
        dateFin:{
            type: Sequelize.DATE,
            allowNull: false,

        },
 
    });
    return reservation
}