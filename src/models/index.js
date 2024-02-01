import dbConfig from "../config/db.config";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
        timestamps: false
    }
})

const Songs = sequelize.define("Songs", {
    name: {
        type: DataTypes.STRING
    },
    src: {
        type: DataTypes.STRING
    },
    actor: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    SongCategoryId: {
        type: DataTypes.NUMBER
    },
    video: {
        type: DataTypes.STRING
    }
})

const Users = sequelize.define("User", {
    name: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    Country: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    categoryId: {
        type: DataTypes.NUMBER
    },
    Gender: {
        type: DataTypes.STRING
    },
    DateOfBirth: {
        type: DataTypes.DATE
    }
})

const myPlaylist = sequelize.define("myPlaylist", {
    userId: {
        type: DataTypes.NUMBER
    },
    songId: {
        type: DataTypes.NUMBER
    }
})

const Artists = sequelize.define("Artists", {
    name: {
        type: DataTypes.STRING
    },
    fakeName: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
})

const Categories = sequelize.define("Categories", {
    category: {
        type: DataTypes.STRING
    }
})

const SongCategories = sequelize.define("SongCategories", {
    category: {
        type: DataTypes.STRING
    }
})

Users.hasOne(myPlaylist, {
    foreignKey: myPlaylist.userId
})

Songs.hasOne(myPlaylist, {
    foreignKey: myPlaylist.songId
})

Users.belongsTo(Categories, {
    foreignKey: Users.categoryId
})

Songs.belongsTo(SongCategories, {
    foreignKey: Songs.SongCategoryId
})

export { Songs, Users, myPlaylist, Artists, Categories, SongCategories }