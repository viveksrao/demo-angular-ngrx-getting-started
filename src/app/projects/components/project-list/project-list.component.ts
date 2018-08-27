import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../project';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  pageTitle = 'Projects';
  @Input() errorMessage: string;
  @Input() displayCode: string;
  @Input() projects: Project[];
  @Input() selectedProject: Project;

  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewProject = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Project>();

  checkChanged(value: boolean): void{
    this.checked.emit(value);
  }

  newProject():void{
    this.initializeNewProject.emit();
  }

  projectSelected(project: Project): void{
    this.selected.emit(project);
  }

}
