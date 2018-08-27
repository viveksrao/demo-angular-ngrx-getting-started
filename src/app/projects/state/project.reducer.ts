import { Project } from "../project";
import { ProjectActions, ProjectActionTypes } from "./project.actions";


export interface ProjectState{
  showProjectCode: boolean;
  currentProjectId: number | null;
  projects: Project[];
  error: string;
}

const initialState: ProjectState = {
  showProjectCode: true,
  currentProjectId: null,
  projects: [],
  error: ''
};

export function reducer(state = initialState, action: ProjectActions): ProjectState{
  switch(action.type){
    case ProjectActionTypes.ToggleProjectCode:
      console.log('Existing State: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);
      return {
        ...state, 
        showProjectCode: action.payload
      };
    case ProjectActionTypes.SetCurrentProject:
      console.log('Existing State: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);
      return {
        ...state,
        currentProjectId: action.payload.id
      };
    case ProjectActionTypes.ClearCurrentProject:
      return {
        ...state,
        currentProjectId: null
      };
    case ProjectActionTypes.InitializeCurrentProject:
      return {
        ...state,
        currentProjectId: 0
      };
    case ProjectActionTypes.LoadSuccess:
      return {
        ...state,
        projects: action.payload,
        error: ''
      }
    case ProjectActionTypes.LoadFail:
      return {
        ...state,
        projects: [],
        error: action.payload
      }
    case ProjectActionTypes.UpdateProjectSuccess:
      const updatedProjects = state.projects.map(
        item => action.payload.id === item.id ? action.payload : item);
        return{
          ...state,
          projects: updatedProjects,
          currentProjectId: action.payload.id,
          error: ''
        };
    case ProjectActionTypes.UpdateProjectFail:
      return{
        ...state,
        error: action.payload
      };
    case ProjectActionTypes.CreateProjectSuccess:
      return{
        ...state,
        projects: [...state.projects, action.payload],
        currentProjectId: action.payload.id,
        error: ''
      };
    case ProjectActionTypes.CreateProjectFail:
      return{
        ...state,
        error: action.payload
      };
    case ProjectActionTypes.DeleteProjectSuccess:
      return{
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        currentProjectId: null,
        error:''
      };
    case ProjectActionTypes.DeleteProjectFail:
      return{
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}