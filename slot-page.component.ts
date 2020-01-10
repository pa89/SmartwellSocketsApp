import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
    selector: 'slot-info',
    templateUrl: './slot-page.component.html',
    styleUrls: ['./slot-page.component.scss']
})
export class SlotPageComponent implements OnInit{
    showLoader = false;
    selectedSlot = {
        slotNumber: '',
        flavor: '',
        flavorImage: '',
        slotValue:1
    };
    changeRequestFlavor = {
        flavor: {name:'', imageSrc: ''},
        slot: 1
    };

    firstRowSlots = [
        {slot: 'SLOT 1', imageSrc: 'assets/images/flavour_lemon.png', fill: 'assets/images/default_green_fill.png', flavor: 'Lemon', value:1},
        {slot: 'SLOT 2', imageSrc: 'assets/images/flavour_lemon.png', fill: 'assets/images/default_green_fill.png', flavor: 'Lemon', value:2},
        {slot: 'SLOT 3', imageSrc: 'assets/images/flavour_lemon.png', fill: 'assets/images/default_green_fill.png', flavor: 'Lemon', value:3},
        {slot: 'SLOT 4', imageSrc: 'assets/images/flavour_lemon.png', fill: 'assets/images/default_green_fill.png', flavor: 'Lemon', value:4}
    ]
    secondRowSlots = [
        {slot: 'SLOT 5', imageSrc: 'assets/images/flavour_lemon.png', fill: 'assets/images/default_green_fill.png', flavor: 'Lemon', value:5},
        {slot: 'SLOT 6', imageSrc: 'assets/images/flavour_lemon.png', fill: 'assets/images/default_green_fill.png', flavor: 'Lemon', value:6},
        {slot: 'SLOT 7', imageSrc: 'assets/images/flavour_lemon.png', fill: 'assets/images/default_green_fill.png', flavor: 'Lemon', value:7},
        {slot: 'SLOT 8', imageSrc: 'assets/images/flavour_lemon.png', fill: 'assets/images/default_green_fill.png', flavor: 'Lemon', value:8}
    ]

    totalAvailableFlavorList = [
        {name: 'Cucumber', imageSrc: 'assets/images/flavour_cucumber.png'},
        {name: 'Coconut', imageSrc: 'assets/images/flavour_coconut.png'},
        {name: 'Orange', imageSrc: 'assets/images/flavor_orange.png'},
        {name: 'Cranberry', imageSrc: 'assets/images/flavour_cranberry.png'},
        {name: 'Lemon', imageSrc: 'assets/images/flavour_lemon.png'},
        {name: 'Lime', imageSrc: 'assets/images/flavour_lime.png'},
        {name: 'Peach', imageSrc: 'assets/images/flavour_peach.png'},
        {name: 'Pomegranate', imageSrc: 'assets/images/flavour_pomegranate.png'},
        {name: 'Rasberry', imageSrc: 'assets/images/flavour_raspberry.png'},
    ]

    constructor(private socket: Socket) {}

    ngOnInit() {
        if(sessionStorage.getItem("flavor")) {
            const flavors = JSON.parse(sessionStorage.getItem("flavor"));
           this.firstRowSlots = flavors;
        }
    }

    getSlotInfo(slot, index) {
        console.log(slot.value)
        if(slot.value > 4) {
            this.selectedSlot.flavor = slot.flavor;
           this.selectedSlot.slotNumber = slot.slot;
           this.selectedSlot.flavorImage= slot.imageSrc;
           this.selectedSlot.slotValue = slot.value;
        } else {
           this.selectedSlot.flavor = slot.flavor;
           this.selectedSlot.slotNumber = slot.slot;
           this.selectedSlot.flavorImage= slot.imageSrc;
           this.selectedSlot.slotValue = slot.value;
        }
    }
    emptySlot(selectedSlot) {
        setTimeout(() => {
        console.log(selectedSlot)
        if (selectedSlot.slotValue > 4) {
           this.secondRowSlots[(selectedSlot.slotValue-1)-4].imageSrc = 'assets/images/empty_slot.png'; 
           this.secondRowSlots[(selectedSlot.slotValue-1)-4].fill = '';
           this.secondRowSlots[(selectedSlot.slotValue-1)-4].flavor = '';
        } else {
            this.firstRowSlots[selectedSlot.slotValue-1].imageSrc = 'assets/images/empty_slot.png';
            this.firstRowSlots[selectedSlot.slotValue-1].fill = '';
            this.firstRowSlots[selectedSlot.slotValue-1].flavor = '';
        }
    }, 2000)
    }
    collectChangeFlavorData(flavor, slot) {
         this.changeRequestFlavor.flavor = flavor;
         this.changeRequestFlavor.slot = slot;
    }
    onFlavorChange() {
        this.showLoader = true;
        setTimeout(() => {
            if(this.changeRequestFlavor.slot > 4) {
                this.secondRowSlots[(this.changeRequestFlavor.slot-1)-4].imageSrc = this.changeRequestFlavor.flavor.imageSrc;
                this.secondRowSlots[(this.changeRequestFlavor.slot-1)-4].flavor = this.changeRequestFlavor.flavor.name;
            } else {
                this.firstRowSlots[this.changeRequestFlavor.slot-1].imageSrc = this.changeRequestFlavor.flavor.imageSrc
                this.firstRowSlots[this.changeRequestFlavor.slot-1].flavor = this.changeRequestFlavor.flavor.name;
                this.firstRowSlots[this.changeRequestFlavor.slot-1].fill = 'assets/images/default_green_fill.png'
            }
            this.showLoader = false;
        }, 2000)
    }
    onReplacePouch() {
        this.showLoader = true;
        setTimeout(() => {
           this.showLoader = false;
        }, 3000);
    }

}