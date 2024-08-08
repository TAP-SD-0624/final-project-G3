import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Product extends Model {
  public stock!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    brief: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 5.0,
    },
    isLimitedEdition: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.stock < 10;
      },
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    updatedAt: false,
  }
);

export default Product;
