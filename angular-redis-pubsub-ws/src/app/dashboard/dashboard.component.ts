import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ids: any[] = [];
  selected: number;
  message: string;
  constructor(private connectionService: ConnectionService) {}

  ngOnInit() {
    Array.from(Array(10).keys()).forEach(i => {
      console.log('array count: ', i + 1);
      const select = { id: i + 1, name: 'id' };
      this.ids.push(select);
    });
  }

  onClick() {
    console.log('hello!');
  }

  onSelect($event) {
    this.selected = $event.target.value ? $event.target.value : 0;
  }

  async connect() {
    this.connectionService.connect(this.selected).then(() => {
      this.connectionService.listenChannel().subscribe(s => (this.message = s));
    });
  }

  disconnect() {
    this.connectionService.disconnect();
  }

  getIds() {
    return this.ids;
  }
}
