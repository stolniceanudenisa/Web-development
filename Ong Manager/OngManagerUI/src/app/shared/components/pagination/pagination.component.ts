import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  selectedTableSize: number | undefined;
  private _currentPage: number = 1;
  selectedTableSizeControl: FormControl = new FormControl(10);
  @Input() itemsPerPage: number | undefined;
  @Input() itemsNumber: number | undefined;
  @Input() allPagesNumber: number | undefined;
  @Input() tableSizes: number[] = [5, 10, 15, 20];
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeSize: EventEmitter<number> = new EventEmitter<number>();

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.selectedTableSize = this.itemsPerPage;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  onSetPage(event: any): void {
    this.currentPage = event.target.value;
  }

  onFirstPage(): void {
    this.currentPage = 1;
    this.changePage.emit(this.currentPage);
  }

  onNextPage(): void {
    if (this.allPagesNumber && this.currentPage < this.allPagesNumber) {
      this.currentPage += 1;
      this.changePage.emit(this.currentPage);
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.changePage.emit(this.currentPage);
    }
  }

  onLastPage(): void {
    if (this.allPagesNumber != null) {
      this.currentPage = this.allPagesNumber;
      this.changePage.emit(this.currentPage);
    }
  }

  onTableSizeChange(event: any): void {
    this.selectedTableSize = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.changeSize.emit(this.selectedTableSize);
  }

  getPageRange(): string {
    if (this.selectedTableSize && this.itemsNumber) {
      const start = (this.currentPage - 1) * this.selectedTableSize + 1;
      const end = Math.min(start + this.selectedTableSize - 1, this.itemsNumber);
      return this.translateService.instant('pagination.numberOfItems', { start, end, itemsNumber: this.itemsNumber });
    }
    return '';
  }
}
