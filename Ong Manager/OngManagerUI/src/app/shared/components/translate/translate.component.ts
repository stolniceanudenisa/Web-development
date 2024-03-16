import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    const languageValue = localStorage.getItem('language');
    if (languageValue) this.translateService.use(languageValue);
    else {
      localStorage.setItem('language', 'en');
      this.translateService.use('en');
    }
  }

  public handleLanguage(event: any): void {
    const value = event.detail.value;
    this.translateService.use(value);
    localStorage.removeItem('language');
    localStorage.setItem('language', value);
  }
}
