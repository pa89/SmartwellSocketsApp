import { SocketService } from './../../../services/socket.service';
import { Component, OnInit, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formGroup: FormGroup;
  selectedFlavores = [];
  count;
  wifistate=true;
  
  flavours = [
    {imagesrc: 'assets/images/flavour_lemon.png', slot: 'slot_1', isChecked: false, name: 'Lemon'},
    {imagesrc: 'assets/images/flavour_lime.png', slot: 'slot_2', isChecked: false, name: 'Lime'},
    {imagesrc: 'assets/images/flavour_peach.png', slot: 'slot_3', isChecked: false, name: 'Peach'},
    {imagesrc: 'assets/images/flavour_raspberry.png', slot: 'slot_4', isChecked: false, name: 'Raspberry'},
];
enhancements = [
  // tslint:disable-next-line: max-line-length
  {imageSrc: 'assets/images/stevia_low.png', slot: 'enhancement_slot_1', isChecked: false, type: 'enhancement', name: 'A little', caption: 'Sweetner', value: 'little'},
  {imageSrc: 'assets/images/stevia_alot.png', slot: 'enhancement_slot_2', isChecked: false, type: 'enhancement', name: 'A lot of', caption: 'Sweetner', value: 'high'},
];
waterTypes =[
  {imageSrc: 'assets/images/still_water.png', slot: 'ater_slot_1', type: 'water', value: 'still', caption: 'Still', isChecked: true},
  {imageSrc: 'assets/images/sparkling_water.png', slot: 'water_slot_2', type: 'water', value: 'sparkling', caption: 'Sparkling', isChecked: false},
];
pressButton = 'assets/images/press-button.png';

  constructor(private socket: Socket, private socketService: SocketService) { }

  ngOnInit() {
    if(!navigator.onLine)
    {
      this.wifistate=false;
    }
    this.count=sessionStorage.getItem("count"); 
    this.socket.emit('registerDevice', 'Provision a Device')
    this.socket.on('Error',(data)=>{
      console.log(data)
    });
    this.socket.on("Provisioning", (deviceId) => {
      console.log('Device ID:'+deviceId);
    });
    this.socket.emit('status', 'Received deviceId')
    //this.socket.emit('message', this.waterTypes);
    
    //this.socket.emit('OfflineSync','Upload File to Blob')
    //Error in sending message from D2C
    this.socket.on('TelemetryError',(data)=>{
      console.log(data);  
    });

    this.socket.on('UpdatedBottleSavedCounts',(data)=>{
      console.log(data);
      sessionStorage.setItem("count",data.toString())
      this.count=parseInt(sessionStorage.getItem("count"));
      //this.count=data;
    });

    this.socket.emit('internetconnectionstate',false);
    if(this.wifistate==null || this.wifistate==undefined)
    {
    //Error in Uploading file to blob
    this.socket.on('FileUploadError',(data)=>{
      console.log(data);
    });
    }
    
    if(sessionStorage.getItem("flavor")) {
      const temp = JSON.parse(sessionStorage.getItem("flavor"));
      console.log(temp);
     for(let i=0; i< this.flavours.length; i++) {
       this.flavours[i].imagesrc = temp[i].imageSrc;
       this.flavours[i].name = temp[i].flavor;
     }
    }
    this.formGroup = new FormGroup({
      water: new FormControl(''),
      enhancement: new FormControl('')
    });
  }
onChecked(flavor, index) {
  console.log(index, flavor);
  if (flavor.isChecked) {
    this.selectedFlavores.push(index);
    if (this.selectedFlavores.length > 2) {
      this.flavours[this.selectedFlavores.slice(0, 1)[0]].isChecked = false;
      this.selectedFlavores.shift();
    }
  } else {
    _.remove(this.selectedFlavores, (element) => {
      return element === index;
    });
  }
  console.log(this.selectedFlavores);
  // let count = 0;
  // let temp;
  //   for (let i = 0; i < this.flavours.length; i++) {
  //    if(this.flavours[i].isChecked) {
  //      count++;
  //    }
  //    if(this.flavours[i].isChecked && i == index) {
  //      this.selectedFlavores.push(index)
  //      if(count>2){
  //       this.flavours[this.selectedFlavores.splice(0,1)[0]].isChecked = false;
  //       }
  //    }
  //   }
  //   console.log(this.selectedFlavores)
  // setTimeout(() => {
  //   this.resetAfterPeriod();
  // }, 15000);
}
mouseDown() {
  let data = {
    flavors: this.flavours,
    enhancements: this.enhancements,
    waterType: this.waterTypes,
    bottleSavedCount:this.count
  }
  this.socket.emit('dispenseevent', data);
  //this.socket.emit('BottleSavedCount',0);
  this.pressButton = 'assets/images/hold-button.png';
  this.resetAfterPeriod();
  console.log(this.formGroup);

}
mouseUp() {
  console.log('triggered');
  this.pressButton = 'assets/images/press-button.png';
}
resetAfterPeriod() {
  for ( let i = 0; i < this.flavours.length; i++) {
    this.flavours[i].isChecked = false;
  }
}
}
