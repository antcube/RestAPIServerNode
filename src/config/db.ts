import { Sequelize } from "sequelize";

const db = new Sequelize('postgresql://rest_api_node_typescript_ekis_user:utzm1oUz5YXDevui7lAjBf3OLiUfJRZP@dpg-ctfcqptds78s73dosh50-a.oregon-postgres.render.com/rest_api_node_typescript_ekis?ssl=true');

export default db;