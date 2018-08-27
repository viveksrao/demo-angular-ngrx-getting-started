import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProjectShellComponent } from './containers/project-shell/project-shell.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';

// NgRx
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/project.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/project.effects';

const projectRoutes: Routes = [
  { path: '', component: ProjectShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(projectRoutes),
    StoreModule.forFeature('projects', reducer),
    EffectsModule.forFeature([ProjectEffects])
  ],
  declarations: [
    ProjectShellComponent,
    ProjectListComponent,
    ProjectEditComponent
  ]
})
export class ProjectModule { }
