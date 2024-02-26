import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';

import { Board } from './entities/board.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TeamService } from '../team/team.service';
import { convertStringToObj } from 'common/utils/converStringToObj';
import { Types } from 'mongoose';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel,
    private readonly teamService: TeamService,
  ) {}
  private async checkTeam(team_id: string) {
    console.log(team_id);

    const team = await this.teamService.findOne(convertStringToObj(team_id));
    if (!team) throw new BadRequestException(`Team ${team_id} doesn't exist`);
  }

  private async checkBoard(board_id: string) {
    const board = await this.boardModel.findOne(convertStringToObj(board_id));
    if (!board)
      throw new BadRequestException(`Board ${board_id} doesn't exist`);
  }
  async create(createBoardDto: CreateBoardDto) {
    try {
      const { team_id } = createBoardDto;
      await this.checkTeam(team_id);
      const newBoard = await this.boardModel.create(createBoardDto);
      return newBoard;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(team_id) {
    try {
      await this.checkTeam(team_id);

      const boards = await this.boardModel.find({ team_id }).populate({
        path: 'columns.cards',
        model: 'Card',
      });

      return { boards, quantity: boards.length };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async findOne(id) {
    const convertedId = new Types.ObjectId(id);
    console.log(convertedId);

    try {
      const board = await this.boardModel.findById(convertedId).populate({
        path: 'columns.cards',
        model: 'Card',
      });
      console.log(board);

      return board;
    } catch (error) {
      console.log(error);
    }
  }
  async update(board_id: string, updateBoardDto: UpdateBoardDto) {
    try {
      await this.checkBoard(board_id);
      const updatedBoard = await this.boardModel.findOneAndUpdate(
        { _id: board_id },
        updateBoardDto,
        { new: true },
      );
      return updatedBoard;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(board_id: string) {
    try {
      const convertedId = convertStringToObj(board_id);
      const board = await this.boardModel.findOne(convertedId);

      if (!board) {
        throw new BadRequestException(`Board ${board_id} doesn't exist`);
      }
      await this.boardModel.deleteOne({ _id: convertedId });
      return {
        deleted: `Board ${board.title} has been deleted `,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
