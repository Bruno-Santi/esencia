import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateBoardDto,
  UpdateBoardDto,
  UpdateBoardDatesDto,
} from './dto/create-board.dto';

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
    try {
      const team = await this.teamService.findOne(convertStringToObj(team_id));
      if (!team) throw new BadRequestException(`Team ${team_id} doesn't exist`);

      return {
        ok: true,
      };
    } catch (error) {
      throw new BadRequestException(`Team ${team_id} doesn't exist`);
    }
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
      console.log(error);

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
  async findOneBySprint(team_id, sprint) {
    try {
      const resp = await this.checkTeam(team_id);
      console.log(resp);

      const board = await this.boardModel.find({ team_id, sprint }).populate({
        path: 'columns.cards',
        model: 'Card',
      });
      return board;
    } catch (error) {
      console.log(error);
    }
  }
  async findOne(id) {
    const convertedId = new Types.ObjectId(id);

    try {
      const board = await this.boardModel.findById(convertedId).populate({
        path: 'columns.cards',
        model: 'Card',
      });

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

  async findforRoadmap(team_id) {
    try {
      await this.checkTeam(team_id);

      const boards = await this.boardModel.find({ team_id }).populate({
        path: 'columns.cards',
        model: 'Card',
      });

      const result = boards.map((board) => {
        const totalCards = board.columns.reduce(
          (sum, column) => sum + column.cards.length,
          0,
        );
        const totalFinishedCards = board.columns.reduce((sum, column) => {
          return (
            sum +
            column.cards.filter((card) => card.status === 'Finished').length
          );
        }, 0);

        const allCards = board.columns.flatMap((column) =>
          column.cards.map((card) => ({
            title: card.title,
            column: column.name,
          })),
        );

        return {
          title: board.title,
          sprint: board.sprint,
          totalCards,
          totalFinishedCards,
          cards: allCards,
          startDate: board.start_date,
          endDate: board.end_date,
        };
      });

      console.log('Response Data', result);

      // Send the response
      return { result };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateBoardDates(
    board_id: string,
    updateBoardDatesDto: UpdateBoardDatesDto,
  ): Promise<Board> {
    try {
      await this.checkBoard(board_id);
      const updatedBoard = await this.boardModel.findOneAndUpdate(
        { _id: board_id },
        updateBoardDatesDto,
        { new: true },
      );
      return updatedBoard;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
