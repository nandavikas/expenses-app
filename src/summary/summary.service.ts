import { Injectable } from "@nestjs/common";
import { ReportService } from "../report/report.service";
import { ReportType } from "../data";

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}
  calculateSummary() {
    const totalIncome = this.reportService
      .getAllReports(ReportType.Income)
      .reduce((acc, report) => acc + report.amount, 0);
    const totalExpenses = this.reportService
      .getAllReports(ReportType.Expense)
      .reduce((acc, report) => acc + report.amount, 0);
    return {
      totalIncome,
      totalExpenses,
      total: totalIncome - totalExpenses,
    };
  }
}
