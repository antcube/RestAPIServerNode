import { Table, Model, Column, Default, DataType } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

class Product extends Model {
    // Define the columns of the table with Decorators
    @Default('Product Name')
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.FLOAT
    })
    price!: number;

    @Column({
        type: DataType.BOOLEAN
    })
    availability!: boolean;
}

export default Product;