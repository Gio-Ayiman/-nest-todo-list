import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Put, Type, UseFilters } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { HttpExceptionFilter } from 'src/core/exceptions/filter.exception';
import { AuthGuard, ResourceGuard, Roles } from 'nest-keycloak-connect';

@Controller('todo')
@ApiTags('todos')
@ApiSecurity("OAuth")
@UseGuards(AuthGuard, ResourceGuard)
@UseFilters(new HttpExceptionFilter())
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Roles({roles: ["admin"]})
  @Post()
  @ApiCreatedResponse({description: 'The todo has been successfully created.', type: CreateTodoDto})
  @ApiBadRequestResponse({description: 'Bad request. Please try again'})
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }


  @UseGuards()
  @ApiOkResponse({description: "Found with success", type: Todo, isArray: true})
  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: "Found with success", type: Todo})
  @ApiBadRequestResponse({description: 'Bad request. Please try again'})
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }  
}
