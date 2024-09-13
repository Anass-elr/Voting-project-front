import {Component, Input, Output} from '@angular/core';
import EventEmitter from "events";

@Component({
  selector: 'app-votebutton',
  standalone: true,
  imports: [],
  templateUrl: './votebutton.component.html',
  styleUrl: './votebutton.component.scss'
})
export class VotebuttonComponent {

  @Input() articleId!: String;
  @Output() voteClicked = new EventEmitter<any>();

  onVote() {
    this.voteClicked.emit(this.articleId);
  }
}
