import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';


declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

 

  constructor(private settingservice: SettingsService,
              private sidebarService: SidebarService) { }

 

  ngOnInit(): void {
    customInitFunctions();
     this.sidebarService.cargarMenu(); 
    
    }
    
  
  }
  
