import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
    updatedAt: false,
  }
);

export default Category;
