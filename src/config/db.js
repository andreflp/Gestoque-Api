import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    operatorsAliases: false,
    dialectOptions: {
      decimalNumbers: true,
      supportBigNumbers: true
    }
  }
)

sequelize.sync()

export default sequelize
