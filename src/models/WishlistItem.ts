import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class WishlistItem extends Model {}

WishlistItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },
    {
        sequelize,
        modelName: "WishlistItem",
        tableName: "wishlistItems",
        timestamps: true,
        updatedAt: false
      }
);

export default WishlistItem;