import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class WishlistItem extends Model {
  id!: number;
}

WishlistItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "WishlistItem",
    tableName: "wishlistItems",
    updatedAt: false,
    timestamps: true,
  }
);

export default WishlistItem;
