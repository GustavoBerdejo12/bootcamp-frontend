import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  documentTypes: any[] = [];
  formPerson: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.formPerson = formBuilder.group({
      id: [{value: null, disabled: false}],
      name: [{value: null, disabled: false}, [Validators.required]],
      lastname: [{value: null, disabled: false}, [Validators.required]],
      documentNumber: [{value: null, disabled: false}, [Validators.required]],
      documentTypeId: [{value: null, disabled: false}, [Validators.required]],
      birthday: [{value: null, disabled: false}, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.personService.getTypeDocument().subscribe(documentTypes => {
      this.documentTypes = documentTypes;
    })
    this.getPersonById();
  }
  back(): void {
    this.router.navigate(['/person'], {
      relativeTo: this.activatedRouter
    })
  }
  cancel(): void {
    this.back();
  }
  actualize(): void {
    const person = this.formPerson.getRawValue();
    person.id=this.activatedRouter.snapshot.params['id']
    this.personService.update(person).subscribe(x => {
      alert('Se actualizó exitosamente');
      this.back();
    })
  }
  getPersonById(): void {
    this.personService.getPersonById(this.activatedRouter.snapshot.params['id']).subscribe(listPerson => {
      const date = new Date(listPerson.birthday).toISOString().slice(0,10)
      this.formPerson = this.formBuilder.group({
        name: [{value: listPerson.name, disabled: false}, [Validators.required]],
        lastname: [{value: listPerson.lastname, disabled: false}, [Validators.required]],
        documentNumber: [{value: listPerson.documentNumber, disabled: false}, [Validators.required]],
        documentTypeId: [{value: listPerson.documentTypeId, disabled: false}, [Validators.required]],
        birthday: [{value: date, disabled: false}, [Validators.required]]
      })
    })
  }
}
