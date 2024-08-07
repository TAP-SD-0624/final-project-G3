import { DataTypes, Model } from "sequelize";
import sequelize from "../database";  

class CarouselSlide extends Model {
  public id!: string; 
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
    },
    categoryID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
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
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    sequelize,
    modelName: "CarouselSlide",
    tableName: "carouselSlides",
    timestamps: true,
    updatedAt: false,
  }
);

export default CarouselSlide;
