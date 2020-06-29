//all routes are here
import {Routes} from '@angular/router'

//all the components to navigate to which we need to navigate.
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MenuComponent } from '../menu/menu.component'
import { DishdetailComponent } from '../dishdetail/dishdetail.component';

//defining routes

export const routes:Routes=[ 

    {path:'home',component:HomeComponent},
    {path:'menu',component:MenuComponent},
    {path:'aboutus',component:AboutComponent},
    { path: 'dishdetail/:id',     component: DishdetailComponent },
    {path:'contactus',component:ContactComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'}


];