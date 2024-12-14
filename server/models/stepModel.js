import { Model, DataTypes } from 'sequelize';
import connection_db from "../database/connection_db.js";

class Step extends Model {
    static associate(models) {
        Step.belongsTo(models.Recipe, {
            foreignKey: 'recipeId',
            as: 'recipe'
        });
    }
}

Step.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Recipes',
            key: 'id'
        }
    }
}, {
    sequelize: connection_db,
    modelName: 'Step'
});

export default Step;