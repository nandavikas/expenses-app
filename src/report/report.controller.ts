import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportType } from 'src/data';
import {
  CreateReportDto,
  UpdateReportDto,
  ReportResponse,
} from 'src/dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) requestType: ReportType,
  ): ReportResponse[] {
    return this.reportService.getAllReports(requestType);
  }

  @Get(':id')
  getAllReportById(
    @Param('type', new ParseEnumPipe(ReportType)) requestType: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      return this.reportService.getReportById(requestType, id);
    } catch (error) {
      return {
        message: `Requested object doesn't exist in type ${requestType}`,
        payload: null,
      };
    }
  }

  @HttpCode(201)
  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) requestType: ReportType,
    @Body()
    { amount, source }: CreateReportDto,
  ) {
    console.log({ amount, source });
    return this.reportService.createReport(requestType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) requestType: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { source, amount }: UpdateReportDto,
  ) {
    try {
      return this.reportService.updateReport(requestType, id, { source, amount });
    } catch (error) {
      return {
        message: `Requested object doesn't exist in type ${requestType}`,
        payload: null,
      };
    }
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('type', new ParseEnumPipe(ReportType)) requestType: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    console.log(`Type of ${id} is ${typeof id}`);
    try {
      this.reportService.deleteReport(requestType, id);
    } catch (error) {
      return {
        message: `Requested object doesn't exist in type ${requestType}`,
        payload: null,
      };
    }
  }
}
