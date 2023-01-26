import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn({name: "todo_id"})
    @ApiProperty()
    private id: string;

    @Column({name: "todo_uuid"})
    @Generated("uuid")
    @ApiProperty()
    private uuid: string;

    @Column({name: "todo_task"})
    @ApiProperty()
    private task: string;

    @Column({default: false, name: "todo_is_done"})
    @ApiProperty()
    private isDone: boolean;

    @CreateDateColumn()
    private createdAt: string;

    @UpdateDateColumn()
    private updatedAt: string;
}
