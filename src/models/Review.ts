import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    rating: {
        type: DataTypes.FLOAT(2, 1),
        validate: {
            min: 1.0,
            max: 5.0
        }
    },
    comment: {
        type: DataTypes.STRING(500)
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "reviews",
    timestamps: true,
    updatedAt: false
  }
);

export default Review;
