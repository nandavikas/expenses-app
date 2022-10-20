import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 } from 'uuid';
import { ReportResponse } from 'src/dtos/report.dto';

@Injectable()
export class ReportService {
  getAllReports(requestType: ReportType): ReportResponse[] {
    const reportType =
      requestType === 'income' ? ReportType.Income : ReportType.Expense;
    return data.report
      .filter((report) => reportType === report.type)
      .map((report) => new ReportResponse(report));
  }

  getReportById(requestType: ReportType, id: string): ReportResponse {
    const reportType =
      requestType === 'income' ? ReportType.Income : ReportType.Expense;
    const report = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    if (!report) {
      throw new Error('Report not found');
    }

    return new ReportResponse(report);
  }

  createReport(
    requestType: ReportType,
    { source, amount }: { source: string; amount: number },
  ): ReportResponse {
    const reportType =
      requestType === 'income' ? ReportType.Income : ReportType.Expense;
    data.report.push({
      id: v4(),
      type: reportType,
      created_at: new Date(),
      updated_at: new Date(),
      source,
      amount,
    });

    return new ReportResponse(data.report[data.report.length - 1]);
  }

  updateReport(
    requestType: ReportType,
    id: string,
    { source, amount }: { source?: string; amount?: number },
  ): ReportResponse {
    const reportType =
      requestType === 'income' ? ReportType.Income : ReportType.Expense;
    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === reportType,
    );
    if (reportIndex >= 0) {
      data.report[reportIndex] = {
        ...data.report[reportIndex],
        amount: amount || data.report[reportIndex].amount,
        source: source || data.report[reportIndex].source,
        updated_at: new Date(),
      };
      return new ReportResponse(data.report[reportIndex]);
    }
    throw new Error('Report not found');
  }

  deleteReport(requestType: string, id: string) {
    const reportType =
      requestType === 'income' ? ReportType.Income : ReportType.Expense;
    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === reportType,
    );
    if (reportIndex >= 0) {
      data.report.splice(reportIndex, 1);
      return;
    }
    throw new Error('Report not found');
  }
}
