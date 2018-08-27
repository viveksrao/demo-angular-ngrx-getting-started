import { Project } from '../project';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectActions, ProjectActionTypes } from './project.actions';
import { ProjectState } from './project.reducer';

export interface State extends fromRoot.State{
  projects: ProjectState;
}

const getProjectFeatureState = createFeatureSelector<ProjectState>('projects');

export const getShowProjectCode = createSelector(
  getProjectFeatureState,
  state => state.showProjectCode
);

export const getCurrentProjectId = createSelector(
  getProjectFeatureState,
  state => state.currentProjectId
);

export const getCurrentProject = createSelector(
  getProjectFeatureState,
  getCurrentProjectId,
  (state, currentProjectId) => {
    if(currentProjectId === 0){
      return{
        id: 0,
        projectName: '',
        projectCode: 'New',
        description: '',
        starRating: 0
      };
    }else{
      return currentProjectId ? state.projects.find(p => p.id === currentProjectId): null;
    }
  }
);

export const getProjects = createSelector(
  getProjectFeatureState,
  state => state.projects
);

export const getError = createSelector(
  getProjectFeatureState,
  state => state.error
);