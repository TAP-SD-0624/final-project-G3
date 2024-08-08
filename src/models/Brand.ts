import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Brand extends Model {}

Brand.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Brand",
    tableName: "brands",
    timestamps: true,
    updatedAt: false,
  }
);

export default Brand;
