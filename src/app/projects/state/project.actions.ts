import { Action } from '@ngrx/store';
import { Project } from '../project';

export enum ProjectActionTypes {
  ToggleProjectCode = '[Project] Toggle Project Code',
  SetCurrentProject = '[Project] Set Current Project',
  ClearCurrentProject = '[Project] Clear Current Project',
  InitializeCurrentProject = '[Project] Initialize Current Project',
  Load = '[Project] Load',
  LoadSuccess = '[Project] Load Success',
  LoadFail = '[Project] Load Fail',
  UpdateProject = '[Project] Update Project',
  UpdateProjectSuccess = '[Project] Update Project Success',
  UpdateProjectFail = '[Project] Update Project Fail',
  CreateProject = '[Project] Create Project',
  CreateProjectSuccess = '[Project] Create Project Success',
  CreateProjectFail = '[Project] Create Project Fail',
  DeleteProject = '[Project] Delete Project',
  DeleteProjectSuccess = '[Project] Delete Project Success',
  DeleteProjectFail = '[Project] Delete Project Fail'
}

export class ToggleProjectCode implements Action {
  readonly type = ProjectActionTypes.ToggleProjectCode;

  constructor(public payload: boolean){}
}

export class SetCurrentProject implements Action {
  readonly type = ProjectActionTypes.SetCurrentProject;

  constructor(public payload: Project){}
}

export class ClearCurrentProject implements Action {
  readonly type = ProjectActionTypes.ClearCurrentProject;
}

export class InitializeCurrentProject implements Action {
  readonly type = ProjectActionTypes.InitializeCurrentProject;
}

export class Load implements Action {
  readonly type = ProjectActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProjectActionTypes.LoadSuccess;

  constructor(public payload: Project[]){}
}

export class LoadFail implements Action {
  readonly type = ProjectActionTypes.LoadFail;

  constructor(public payload: string){}
}

export class UpdateProject implements Action{
  readonly type = ProjectActionTypes.UpdateProject;
  constructor(public payload: Project){}
}

export class UpdateProjectSuccess implements Action{
  readonly type = ProjectActionTypes.UpdateProjectSuccess;
  constructor(public payload: Project){}
}

export class UpdateProjectFail implements Action{
  readonly type = ProjectActionTypes.UpdateProjectFail;
  constructor(public payload: string){}
}

export class CreateProject implements Action{
  readonly type = ProjectActionTypes.CreateProject;
  constructor(public payload: Project){}
}

export class CreateProjectSuccess implements Action{
  readonly type = ProjectActionTypes.CreateProjectSuccess;
  constructor(public payload: Project){}
}

export class CreateProjectFail implements Action{
  readonly type = ProjectActionTypes.CreateProjectFail;
  constructor(public payload: string){}
}

export class DeleteProject implements Action{
  readonly type = ProjectActionTypes.DeleteProject;
  constructor(public payload: number){}
}

export class DeleteProjectSuccess implements Action{
  readonly type = ProjectActionTypes.DeleteProjectSuccess;
  constructor(public payload: number){}
}

export class DeleteProjectFail implements Action{
  readonly type = ProjectActionTypes.DeleteProjectFail;
  constructor(public payload: string){}
}

export type ProjectActions = ToggleProjectCode 
  | SetCurrentProject 
  | ClearCurrentProject 
  | InitializeCurrentProject
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateProject
  | UpdateProjectSuccess
  | UpdateProjectFail
  | CreateProject
  | CreateProjectSuccess
  | CreateProjectFail
  | DeleteProject
  | DeleteProjectSuccess
  | DeleteProjectFail;