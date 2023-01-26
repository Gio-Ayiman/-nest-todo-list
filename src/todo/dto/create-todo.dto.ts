import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty()
    task: string;

    @ApiProperty()
    isDone: boolean;
}
