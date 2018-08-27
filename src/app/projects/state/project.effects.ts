import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProjectService } from '../project.service';
import * as projectActions from './project.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Project } from '../project';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProjectEffects {
  
  constructor(private actions$: Actions, private projectService: ProjectService){}

  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType(projectActions.ProjectActionTypes.Load),
    mergeMap(action => this.projectService.getProjects().pipe(
      map((projects) => (new projectActions.LoadSuccess(projects))),
      catchError(err => of(new projectActions.LoadFail(err)))
    ))
  );

  @Effect()
  updateProject$: Observable<Action> = this.actions$.pipe(
    ofType(projectActions.ProjectActionTypes.UpdateProject),
    map((action: projectActions.UpdateProject) => action.payload),
    mergeMap((project:Project) => 
      this.projectService.updateProject(project).pipe(
        map(updatedProject => (new projectActions.UpdateProjectSuccess(updatedProject))),
        catchError(err => of(new projectActions.UpdateProjectFail(err)))
      )
    )
  );

  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType(projectActions.ProjectActionTypes.CreateProject),
    map((action: projectActions.CreateProject) => action.payload),
    mergeMap((project: Project) => 
      this.projectService.createProject(project).pipe(
        map(newProject => (new projectActions.CreateProjectSuccess(newProject))),
        catchError(err => of(new projectActions.CreateProjectFail(err)))
      )
    )
  );

  @Effect()
  deleteProject$: Observable<Action> = this.actions$.pipe(
    ofType(projectActions.ProjectActionTypes.DeleteProject),
    map((action: projectActions.DeleteProject) => action.payload),
    mergeMap((projectId: number) => 
      this.projectService.deleteProject(projectId).pipe(
        map(() => (new projectActions.DeleteProjectSuccess(projectId))),
        catchError(err => of(new projectActions.DeleteProjectFail(err)))
      )
    )
  );


}