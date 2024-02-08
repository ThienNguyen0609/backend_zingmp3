'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.SongCategories)
      this.belongsToMany(models.Playlists, {
        through: models.PlaylistSongs
      })
      this.hasOne(models.Users)
    }
  }
  Song.init({
    name: DataTypes.STRING,
    src: DataTypes.STRING,
    actor: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Songs',
  });
  return Song;
};