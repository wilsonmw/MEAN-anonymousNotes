import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  note = {content: ""}
  notes = [];
  

  constructor(private _noteService: NoteService) { 
    this._noteService.noteObserver.subscribe(
      (notes)=>{
        this.notes = notes;
      })
      this._noteService.retrieveNotes();
  }

  onSubmit(){
    this._noteService.createNote(this.note);
    this.note = {content:""};
    this._noteService.retrieveNotes();
  }
  ngOnInit() {
  }

}
