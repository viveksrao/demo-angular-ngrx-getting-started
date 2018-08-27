import { Injectable } from '@angular/core';
import { Project } from './project';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = 'api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.projectsUrl)
    .pipe(tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError));
  }

  createProject(project: Project): Observable<Project>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    project.id = null;
    return this.http.post<Project>(this.projectsUrl, project, { headers: headers })
    .pipe(
      tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteProject(id: number): Observable<{}>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete<Project>(url, { headers: headers })
    .pipe(
      tap(data => console.log('deleteProject: ' + id)),
      catchError(this.handleError)
    );
  }

  updateProject(project: Project): Observable<Project>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.put<Project>(url, project, { headers: headers })
    .pipe(
      map(() => project),
      catchError(this.handleError)
    );
  }

  private handleError(err){
    let errorMessage: string;
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error has occurred: ${err.error.message}`;
    }else{
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
