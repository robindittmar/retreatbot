import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: "categories",
})
export class CategoryModel {
    @PrimaryColumn()
    id!: number;

    @Column()
    guildId!: number;

    @Column()
    insert_timestamp!: Date;
}
