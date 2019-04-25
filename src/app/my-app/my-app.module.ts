import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { MyAppComponent } from './my-app.component';
import { TableModule} from 'primeng/table';


const childRoutes:Routes=[

  {path:'home',component:MyAppComponent}
  
]

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild(childRoutes)
  ],
  declarations: [MyAppComponent ]
})
export class MyAppModule { }
