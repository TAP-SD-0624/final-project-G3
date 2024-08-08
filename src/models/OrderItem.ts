import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class OrderItem extends Model {
  id!: string;
  quantity!: number;
  price!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
    tableName: "orderItems",
    updatedAt: false,
    timestamps: true,
  }
);

export default OrderItem;
