import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteDto } from 'src/utils/delete.dto';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { UserUpdateDto } from '../dto/user/user.update.dto';
import { User } from '../entities/user.entity';

@Controller('user')
@ApiTags('Working with users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get User list',
  })
  @ApiResponse({
    description: 'User list',
    status: 200,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  public async index() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiResponse({
    type: User,
    description: 'Return user object',
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  public async getCard(@Param('id') id: number) {
    if (!isNaN(Number(id))) {
      return await this.userService.findOneById(Number(id));
    }
    throw new BadRequestException();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'User update',
  })
  @ApiResponse({
    type: UserUpdateDto,
    description: 'Updated user`s ID',
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  public async update(@Param('id') id: number, @Body() dto: UserUpdateDto) {
    await this.userService.update(id, dto);
  }

  @Delete()
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Users delete',
  })
  @ApiResponse({
    description: 'Users was deleted',
    status: 204,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  public async remove(@Body() dto: DeleteDto) {
    await this.userService.delete(dto);
  }
}
