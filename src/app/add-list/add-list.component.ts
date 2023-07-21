import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css'],
})
export class AddListComponent implements OnInit {
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private router: ActivatedRoute
  ) {}
  objId: string;
  objName: string;
  superForms: FormGroup;
  isDisabled: boolean = true;

  ngOnInit(): void {
    this.objId = this.router.snapshot.params['id'];
    this.objName = this.router.snapshot.params['name'];

    console.log('objjjjiiiiidddd', this.objId);

    this.superForms = this.formBuilder.group({
      name: [this.objName, Validators.required],
      dId: [this.objId],
    });
  }

  onSubmit() {
    const formData = this.superForms.getRawValue();
    console.log('hhhhhhhhhhhhhhhh', formData);

    //for removing the DiD property while adding.
    const name = 'dId';
    const { [name]: removedProperty, ...RestForm } = formData;

    if (this.objId == null) {
      this.authService.addData(RestForm).subscribe((result) => {
        if (result != null) {
          const x = result['data']['name'];
          console.log('result obtained', x);
          this.route.navigate(['/Home']);
        }
      });
    }

    //For Updating Data

    if (formData.dId) {
      this.authService.updateData(formData).subscribe((data) => {
        this.route.navigate(['/Home']);
      });
    }
  }

  close() {
    this.route.navigate(['/Home']);
  }
}
