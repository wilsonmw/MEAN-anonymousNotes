import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class NoteService {

  constructor(private _http: Http) { }
  notes = [];
  note = {content: ""};
  noteObserver = new BehaviorSubject(this.notes);

  createNote(note){
    console.log("This is the createNote function");
    this._http.post('/notes', note).subscribe(
      (response) => {response.json();
      },
      (err) => {}
    ); 
  }

  retrieveNotes(){
    console.log("this is the retrieveNote function");
    this._http.get('/notes').subscribe(
      (response)=>{
        this.notes = response.json();
        this.noteObserver.next(this.notes);
      },
      (err) => {}
    )
  }

}
