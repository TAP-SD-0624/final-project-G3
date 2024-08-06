import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class OrderItem extends Model {}

OrderItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "OrderItem",
    timestamps: true,
    updatedAt: false,
  }
);

export default OrderItem;
