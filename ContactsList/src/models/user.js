import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';


async function hashPassword(user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
}

export default function (sequelize) {
  return sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
      istanceMethods : {
        isValidPassword(password){
          return bcrypt.compareSync(password,this.password);
        }
      }
    }
  );
}