import { Table, Model, Column, Default, DataType } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

class Product extends Model {
    // Define the columns of the table with Decorators
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    // declare is a TypeScript keyword that allows you to define variables that may not have been initialized yet.
    declare name: string;

    @Column({
        type: DataType.FLOAT
    })
    declare price: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean;
}

export default Product;