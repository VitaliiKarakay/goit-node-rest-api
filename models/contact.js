import { DataTypes, Model } from "sequelize";
import { initUserModel } from "./user.js";

export function initContactModel(sequelize) {
    class Contact extends Model {}

    Contact.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { isEmail: true },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            favorite: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            owner: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        },
        {
            sequelize,
            modelName: "Contact",
            tableName: "contacts",
            timestamps: true,
        }
    );

    const User = sequelize.models.User || initUserModel(sequelize);
    Contact.belongsTo(User, { foreignKey: "owner", as: "user" });
    User.hasMany(Contact, { foreignKey: "owner", as: "contacts" });

    return Contact;
}