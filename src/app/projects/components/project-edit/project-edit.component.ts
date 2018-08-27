import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Project } from '../../project';
import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number.validator';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy, OnChanges {

  pageTitle = 'Project Edit';
  @Input() errorMessage: string;
  @Input() selectedProject: Project;
  @Output() create = new EventEmitter<Project>();
  @Output() update = new EventEmitter<Project>();
  @Output() delete = new EventEmitter<Project>();
  @Output() clearCurrent = new EventEmitter<void>();
  
  componentActive = true;
  projectForm: FormGroup;

  project: Project | null;

  // Use with the generic validation message class
  displayMessage: { [key:string]: string } = {};
  private validationMessages: { [key:string]: { [key:string]: string }};
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      projectName: {
        required: 'Project name is required',
        minlength: 'Project name must be at least three characters.',
        maxlength: 'Project name cannot exceed 50 characters.'
      },
      projectCode:{
        required: 'Project code is required.'
      },
      starRating: {
        range: 'Rate the project between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      projectCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for value changes
    this.projectForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.projectForm)
    );
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes.selectedProject){
      const project: any = changes.selectedProject.currentValue as Project;
      this.displayProject(project);
    }
  }

  ngOnDestroy(): void{
    this.componentActive = false;
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void{
    this.displayMessage = this.genericValidator.processMessages(this.projectForm);
  }

  displayProject(project: Project | null): void{
    // Set the local project property
    this.project = project;
    if(this.project && this.projectForm){
      // Reset the form back to pristine
      this.projectForm.reset();
    
      // Display the appropriate page title
      if(this.project.id === 0){
        this.pageTitle = 'Add Project';
      }else{
        this.pageTitle = `Edit Project: ${this.project.projectName}`;
      }

      // Update the data on the form
      this.projectForm.patchValue({
        projectName: this.project.projectName,
        projectCode: this.project.projectCode,
        starRating: this.project.starRating,
        description: this.project.description
      });
    }
  }

  cancelEdit():void{
    // Redisplay the currently selected project
    // replacing any edits made
    this.displayProject(this.project);
  }

  deleteProject(): void{
    if(this.project && this.project.id){
      if(confirm(`Really delete the project: ${this.project.projectName}?`)){
        this.delete.emit(this.project);
      }
    }else{
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveProject(): void{
    if(this.projectForm.valid){
      if(this.projectForm.dirty){
        // Copy over all of the original project properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.project, ...this.projectForm.value };
        if(p.id === 0){
          this.create.emit(p);
        }else{
          this.update.emit(p);
        }
      }
    }else{
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
