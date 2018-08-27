import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { Project } from '../../project';

// NgRx
import { Store, select } from '@ngrx/store';
import * as fromProject from '../../state';
import * as projectActions from '../../state/project.actions';

@Component({
  selector: 'app-project-shell',
  templateUrl: './project-shell.component.html',
  styleUrls: ['./project-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectShellComponent implements OnInit {

  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  projects$: Observable<Project[]>;
  selectedProject$: Observable<Project>;

  constructor(private store: Store<fromProject.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new projectActions.Load());
    this.projects$ = this.store.pipe(select(fromProject.getProjects));
    this.errorMessage$ = this.store.pipe(select(fromProject.getError));
    this.selectedProject$ = this.store.pipe(select(fromProject.getCurrentProject));
    this.displayCode$ = this.store.pipe(select(fromProject.getShowProjectCode));
  }

  checkChanged(value: boolean): void{
    this.store.dispatch(new projectActions.ToggleProjectCode(value));
  }

  newProject(): void{
    this.store.dispatch(new projectActions.InitializeCurrentProject());
  }

  projectSelected(project: Project): void{
    this.store.dispatch(new projectActions.SetCurrentProject(project));
  }

  deleteProject(project: Project): void{
    this.store.dispatch(new projectActions.DeleteProject(project.id));
  }

  clearProject():void{
    this.store.dispatch(new projectActions.ClearCurrentProject());
  }

  saveProject(project: Project): void{
    this.store.dispatch(new projectActions.CreateProject(project));
  }

  updateProject(project: Project): void{
    this.store.dispatch(new projectActions.UpdateProject(project));
  }

}
