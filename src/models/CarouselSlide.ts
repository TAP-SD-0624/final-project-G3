import { DataTypes, Model } from "sequelize";
import sequelize from "../database"; // Adjust the import according to your setup

class CarouselSlide extends Model {
  public id!: string;
  public categoryID!: string;
  public slideOrder!: number;
  public imageUrl!: string;
  public title!: string;
  public description!: string;
}

CarouselSlide.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    categoryID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories', // Assumes you have a 'categories' table
        key: 'id',
      },
    },
    slideOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Assuming description is optional
    },
  },
  {
    sequelize,
    modelName: "CarouselSlide",
    tableName: "carousel_slides",
    timestamps: false,
    underscored: true,
  }
);

export default CarouselSlide;
