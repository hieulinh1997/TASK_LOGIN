import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-serach-delete',
  templateUrl: './serach-delete.component.html',
  styleUrls: ['./serach-delete.component.css']
})
export class SerachDeleteComponent implements OnInit {

  users: any;
  email: string;
  username: string;

  user: User[];

  constructor(private service: UserService) { }


  public delteUser(id: number) {
    let resp = this.service.deleteUser(id);
    resp.subscribe((data) => this.users = data);
  }

  public findUserByEmailId() {
    let resp = this.service.getUserByEmail(this.email);
    resp.subscribe((data) => this.users = data);
  }
  //  public findUserByEmailId(){
  //   let resp= this.service.getUserByEmail(this.email);
  //   resp.subscribe((data)=>{
  //     for (const d of (data as any)) {
  //       this.username=d.domain;
  //     }
  //     console.log(this.username);
  //   });
  //  }

  ngOnInit() {
    let resp=this.service.getUsers();
    resp.subscribe((data)=>this.users=data);
  }
  // ngOnInit() {
  //   let resp = this.service.getUsers();
  //   resp.subscribe((data) => this.handleSuccessfulResponse(data));
  // }
  // handleSuccessfulResponse(data) {
  //   this.user = data;
  // }

}