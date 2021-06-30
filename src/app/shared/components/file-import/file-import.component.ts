import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.scss']
})
export class FileImportComponent {

  file: File;

  @Output() fileChange = new EventEmitter();

  onSelect(event) {
    const files: Array<File> = event.addedFiles;

    if (files.length > 1) {
      console.log('Must not add more than one file');
    } else {
      this.file = files[0];
      this.fileChange.emit(this.file);
    }
  }

  onRemove() {
    this.file = null;
    this.fileChange.emit(null);
  }

}
