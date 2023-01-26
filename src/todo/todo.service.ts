import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/core/exceptions/entity-not-found.exception';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo) 
    private todoRepo: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    this.todoRepo.save(createTodoDto);
    return createTodoDto;
  }

  findAll() {
    return this.todoRepo.find();
  }

  async findOne(id: number) {
    let todo = await this.todoRepo.findOneBy({id});
    
    if(!todo) throw new EntityNotFoundException(); 

    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
