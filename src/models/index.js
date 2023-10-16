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
    classify: {
        type: DataTypes.STRING
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
    city: {
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
    member: {
        type: DataTypes.STRING
    }
})

const MyPlaylist = sequelize.define("myPlaylist", {
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
    spotifyId: {
        type: DataTypes.STRING
    },
    genres: {
        type: DataTypes.STRING
    }
})

export { Songs, Users, MyPlaylist, Artists }