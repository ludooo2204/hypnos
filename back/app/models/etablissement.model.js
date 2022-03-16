module.exports =(sequelize,Sequelize)=>{
    const etablissement = sequelize.define("etablissement",{
        // id:{
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     primaryKey : true,
        //     autoIncrement: true

        // },
        nom:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        description:{
            type: Sequelize.STRING,
            allowNull: false,

        },
        adresse:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        ville:{
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return etablissement
}