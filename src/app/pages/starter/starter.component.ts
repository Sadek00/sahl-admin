import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppBlogCardsComponent } from 'src/app/shared/components/blog-card/blog-card.component';
import { AppSalesOverviewComponent } from 'src/app/shared/components/sales-overview/sales-overview.component';
import { AppYearlyBreakupComponent } from 'src/app/shared/components/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from 'src/app/shared/components/monthly-earnings/monthly-earnings.component';
import { AppRecentTransactionsComponent } from 'src/app/shared/components/recent-transactions/recent-transactions.component';
import { AppProductPerformanceComponent } from 'src/app/shared/components/product-performance/product-performance.component';



@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppSalesOverviewComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppRecentTransactionsComponent,
    AppProductPerformanceComponent,
    AppBlogCardsComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }