import { Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home.component";
import { DetailsComponent } from "./app/details/details.component";

const routeConfig: Routes = [
    { 
        path: '', 
        component: HomeComponent ,
        title: 'Homes App - Home Page'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Homes App - Details Page'
    }
];

export default routeConfig;