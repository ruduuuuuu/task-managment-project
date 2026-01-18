import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Task, Priority, TaskStatus } from '../entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = this.tasksRepository.create({
      id: uuidv4(),
      title: createTaskDto.title,
      description: createTaskDto.description || null,
      priority: createTaskDto.priority || Priority.MEDIUM,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      status: createTaskDto.status || TaskStatus.PENDING,
      userId,
    });

    return this.tasksRepository.save(task);
  }

  async findAll(
    userId: string,
    status?: string,
    priority?: string,
    sortBy?: string,
  ): Promise<Task[]> {
    const queryBuilder = this.tasksRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId });

    if (status && (status === TaskStatus.PENDING || status === TaskStatus.COMPLETED)) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (priority && (priority === Priority.LOW || priority === Priority.MEDIUM || priority === Priority.HIGH)) {
      queryBuilder.andWhere('task.priority = :priority', { priority });
    }

    if (sortBy === 'dueDate') {
      queryBuilder.orderBy('task.dueDate', 'ASC');
    } else if (sortBy === 'createdAt') {
      queryBuilder.orderBy('task.createdAt', 'DESC');
    } else {
      queryBuilder.orderBy('task.createdAt', 'DESC');
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    const task = await this.findOne(id, userId);

    if (updateTaskDto.title !== undefined) task.title = updateTaskDto.title;
    if (updateTaskDto.description !== undefined) task.description = updateTaskDto.description || null;
    if (updateTaskDto.priority !== undefined) task.priority = updateTaskDto.priority;
    if (updateTaskDto.dueDate !== undefined) task.dueDate = updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : null;
    if (updateTaskDto.status !== undefined) task.status = updateTaskDto.status;

    return this.tasksRepository.save(task);
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.findOne(id, userId);
    await this.tasksRepository.remove(task);
  }
}
