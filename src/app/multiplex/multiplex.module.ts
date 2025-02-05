import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiplexRoutingModule } from './multiplex-routing.module';
import { MultiplexcheckoutComponent } from './multiplexcheckout/multiplexcheckout.component';
import { MultiplexhomeComponent } from './multiplexhome/multiplexhome.component';
import { MultiplextendingComponent } from './multiplextending/multiplextending.component';
import { MultiplexwishlistComponent } from './multiplexwishlist/multiplexwishlist.component';
import { HomeModule } from '../home/home.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecommendedwishlistComponent } from './recommendedviewall/recommendedwishlist.component';
import { UpcomingviewallComponent } from './upcomingviewall/upcomingviewall.component';
import { MultiplexpaymentComponent } from './multiplexpayment/multiplexpayment.component';
import { MultiplexvideoviewComponent } from './multiplexvideoview/multiplexvideoview.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { MultiplexnewlistComponent } from './multiplexnewlist/multiplexnewlist.component';
import { MultiplexpaymentsuccessComponent } from './multiplexpaymentsuccess/multiplexpaymentsuccess.component';
import { MultiplexpaymentcancelComponent } from './multiplexpaymentcancel/multiplexpaymentcancel.component';



@NgModule({
  declarations: [
    MultiplexcheckoutComponent,
    MultiplexhomeComponent,
    MultiplextendingComponent,
    MultiplexwishlistComponent,
    RecommendedwishlistComponent,
    UpcomingviewallComponent,
    MultiplexpaymentComponent,
    MultiplexvideoviewComponent,
    PurchaseListComponent,
    MultiplexnewlistComponent,
    MultiplexpaymentsuccessComponent,
    MultiplexpaymentcancelComponent,
  ],
  imports: [
    CommonModule,
    MultiplexRoutingModule,
    HomeModule,
    CarouselModule,
    BrowserAnimationsModule
    ]
})
export class MultiplexModule { }
