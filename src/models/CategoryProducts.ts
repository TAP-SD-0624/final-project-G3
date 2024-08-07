// CategoryProduct.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class CategoryProduct extends Model {
  public id!: string;
  public productID!: string;
  public categoryID!: string;
}

CategoryProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    productID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    categoryID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "CategoryProduct",
    tableName: "category_products",
    timestamps: false,
    underscored: true,
  }
);

export default CategoryProduct;
