import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpeakerService } from 'src/app/shared/services/speaker.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-speaker-crud',
  templateUrl: './speaker-crud.component.html',
  styleUrls: ['./speaker-crud.component.css']
})
export class SpeakerCrudComponent implements OnInit {
  shouldOpen = false;
  options: SortablejsOptions;
  id;
  ifUpdate = false;
  image;
  selectedFile = '';
  speakerForm: FormGroup;

  ifFront = false;
  displayedColumns: string[] = [
    'name',
    'email',
    'company',
    'designation',
    'socialLinks',
    'edit'
  ];
  dataSource;

  constructor(
    private fb: FormBuilder,
    private speakerService: SpeakerService,
    private toastr: ToastrService,
    private upload: ImageUploadService
  ) {
    this.speakerForm = this.fb.group({
      name: [''],
      company: [''],
      designation: [''],
      description: [''],
      email: ['', Validators.email],
      linkFacebook: [''],
      linkTwitter: [''],
      linkLinkedin: [''],
      linkWebsite: [''],

      showFront: []
    });
  }
  cancelUpdate() {
    this.ifUpdate = false;
    this.speakerForm.reset();
    this.selectedFile = '';
    this.shouldOpen = false;
  }
  ngOnInit() {
    this.fetchSpeakers();
    this.options = {
      onUpdate: e => {
        // console.log()
        console.log(this.dataSource);
        this.dataSource = this.dataSource.map((x, index) => {
          return { ...x, sortOrder: index };
        });
        this.update();
      }
    };
  }
  update() {
    this.dataSource.forEach(element => {
      this.speakerService.patchSpeaker(element.id, element).subscribe();
    });
  }
  getSpeakersById(id) {
    this.shouldOpen = true;
    this.ifUpdate = true;
    this.id = id;
    this.speakerService.getSpeakerById(id).subscribe(
      val => {
        this.speakerForm.patchValue({
          name: val.name,
          company: val.company,
          designation: val.designation,
          description: val.description,
          email: val.email,
          showFront: val.showOnFront,
          linkFacebook: val.socialLinks[0].link,
          linkTwitter: val.socialLinks[1].link,
          linkLinkedin: val.socialLinks[2].link,
          linkWebsite: val.socialLinks[3].link
        });
      },
      err => console.log(err)
    );
  }
  fetchSpeakers() {
    this.speakerService.getSpeaker().subscribe(
      val => {
        // this.dataSource = new MatTableDataSource<any>(val);
        this.dataSource = val;
      },
      err => console.log(err)
    );
  }
  processFile(e: any) {
    if (e.target.files.length > 0) {
      this.selectedFile = e.target.files[0].name;
      this.upload.uploadImage(e.target.files[0]).subscribe(
        val => {
          this.image = val.result.files.image[0].name;
        },
        err => console.log(err)
      );
    } else {
      this.selectedFile = '';
    }
  }
  IfShow(item) {
    this.ifFront = item.checked;
  }
  onSubmit() {
    const obj = {
      isActive: true,
      name: this.speakerForm.get('name').value,
      company: this.speakerForm.get('company').value,
      designation: this.speakerForm.get('designation').value,
      description: this.speakerForm.get('description').value,
      image: `${environment.url}/Attachments/momentum-attachments/download/${
        this.image
      }`,
      email: this.speakerForm.get('email').value,
      showOnFront: this.speakerForm.get('showFront').value,
      socialLinks: [
        {
          key: 'Facebook',
          link: this.speakerForm.get('linkFacebook').value
        },
        {
          key: 'Twitter',
          link: this.speakerForm.get('linkTwitter').value
        },
        {
          key: 'Linkedin',
          link: this.speakerForm.get('linkLinkedin').value
        },
        {
          key: 'Website',
          link: this.speakerForm.get('linkWebsite').value
        }
      ]
    };
    // console.log(obj);
    this.speakerService.postSpeaker(obj).subscribe(
      val => {
        this.speakerForm.reset();
        this.fetchSpeakers();
        this.toastr.success('Speaker added.');
        this.selectedFile = '';
      },
      err => this.toastr.error('Something went wrong, please try again.')
    );
  }
  updateSpeakers() {
    const obj = {
      name: this.speakerForm.get('name').value,
      company: this.speakerForm.get('company').value,
      designation: this.speakerForm.get('designation').value,
      description: this.speakerForm.get('description').value,
      image: `${environment.url}/Attachments/momentum-attachments/download/${
        this.image
      }`,
      email: this.speakerForm.get('email').value,
      showOnFront: this.speakerForm.get('showFront').value,
      socialLinks: [
        {
          key: 'Facebook',
          link: this.speakerForm.get('linkFacebook').value
        },
        {
          key: 'Twitter',
          link: this.speakerForm.get('linkTwitter').value
        },
        {
          key: 'Linkedin',
          link: this.speakerForm.get('linkLinkedin').value
        },
        {
          key: 'Website',
          link: this.speakerForm.get('linkWebsite').value
        }
      ]
    };
    // 	console.log(obj);
    this.speakerService.patchSpeaker(this.id, obj).subscribe(
      val => {
        this.shouldOpen = false;
        this.speakerForm.reset();
        this.fetchSpeakers();
        this.toastr.success('Speaker updated.');
        this.selectedFile = '';
        this.ifUpdate = false;
      },
      err => console.log(err)
    );
  }
  IfActive(id, $event) {
    const data = {
      isActive: $event.checked
    };
    this.speakerService.patchSpeaker(id, data).subscribe(
      val => {
        console.log(val);
        this.fetchSpeakers();
      },
      err => console.log(err)
    );
  }
}
