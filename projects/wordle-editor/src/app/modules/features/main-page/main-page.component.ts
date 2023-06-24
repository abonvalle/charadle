import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import * as animeCharactersInfosJSON from '@assets-anime/jsons/characters.json';
import animeWordlesJSON from '@assets-anime/jsons/wordles.json';
import * as serieCharactersInfosJSON from '@assets-series/jsons/characters.json';
import serieWordlesJSON from '@assets-series/jsons/wordles.json';
import { CSVService } from '@editor-core/services/csv.service';
import { Wordle } from '@models/wordle.model';
import * as FileSaver from 'file-saver';
import * as JSZip from 'jszip';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
@Component({
  selector: 'main-page',
  styles: [':host{overflow:hidden;height:100%;}'],
  templateUrl: 'main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {
  @ViewChild('matCalendar') matCalendar: MatCalendar<Date> | null = null;
  selectedDate: Date | null = null;
  version: string | null = 'serie';
  charactersJSON: {
    [key: string]: { from: string; imgPath?: string; fullname?: string; difficulty?: number };
  } = structuredClone(serieCharactersInfosJSON);
  wordlesJSON: string[] = structuredClone(serieWordlesJSON);
  minDate: Date = new Date('12/02/2022');
  maxDate: Date = new Date('12/02/2024');
  form: FormGroup = new FormGroup({});
  daybydayForm: FormGroup = new FormGroup({});
  bulkForm: FormGroup = new FormGroup({});
  validNames: string = '';
  everyWordles: { wordle: string; date: Date; index: number }[] = [];
  private _destroy$: Subject<void> = new Subject();
  get daybydayFormDisable(): boolean {
    return this.daybydayForm.disabled || this.daybydayForm.invalid || this.daybydayForm.pristine;
  }

  constructor(private _formBuilder: FormBuilder, private _csvServ: CSVService) {}
  ngOnInit(): void {
    this.resetForms();
    this.formSubscribes();
    delete this.charactersJSON['default'];
  }

  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }

  formSubscribes(): void {
    this.form
      .get('search')
      ?.valueChanges.pipe(takeUntil(this._destroy$), distinctUntilChanged(), debounceTime(250))
      .subscribe((s) => {
        console.warn('search trigger');
        const res = this.everyWordles.find((w) => w.wordle.includes(s));
        if (!res) {
          this.selectedDate = null;
          this.daybydayForm.get('wordle')?.setValue('');
          this.daybydayForm.get('from')?.setValue('');
          this.daybydayForm.get('fullname')?.setValue('');
          this.daybydayForm.get('imgPath')?.setValue('');
          this.daybydayForm.get('difficulty')?.setValue('');
          return;
        }
        this.selectedDate = res.date;
        this.daybydayForm.get('wordle')?.setValue('');
        this.daybydayForm.get('from')?.setValue('');
        this.daybydayForm.get('fullname')?.setValue('');
        this.daybydayForm.get('imgPath')?.setValue('');
        this.daybydayForm.get('difficulty')?.setValue('');
        this.onDateChange(res.date);
        this.matCalendar?._goToDateInView(res.date, 'month');
      });
  }
  onUpdateWordle(): void {
    if (!this.selectedDate) {
      return;
    }
    const ind = this.getDateIndex(this.selectedDate);
    const originalWordle = this.wordlesJSON[ind] ?? '';
    const char = this.charactersJSON[originalWordle] ?? { from: '', imgPath: '' };
    char.from = this.daybydayForm.get('from')?.value;
    char.fullname = this.daybydayForm.get('fullname')?.value;
    char.imgPath = this.daybydayForm.get('imgPath')?.value;
    char.difficulty = this.daybydayForm.get('difficulty')?.value;

    const wordleCtrl = this.daybydayForm.get('wordle');
    if (!wordleCtrl?.pristine && wordleCtrl?.value !== originalWordle) {
      //Create new charactersJSON with new value
      // Object.defineProperty(this.charactersJSON, wordleCtrl?.value, {
      //   value: char
      // });
      this.charactersJSON[wordleCtrl?.value] = char;

      //delete old charactersJSON
      delete this.charactersJSON[originalWordle];

      this.wordlesJSON[ind] = wordleCtrl?.value;
    }
    this.daybydayForm.markAsPristine();
    console.warn(this.wordlesJSON[ind]);
    console.warn(this.charactersJSON);
  }
  onDateChange(event: Date | null): void {
    if (!event) {
      this.daybydayForm.disable();
      return;
    }
    const wordle = this.getWordle(event);
    // this.daybydayForm.enable();
    this.daybydayForm.markAsPristine();
    this.daybydayForm?.enable();
    this.daybydayForm.get('wordle')?.setValue(wordle.text ?? '');
    this.daybydayForm.get('from')?.setValue(wordle.serie ?? '');
    this.daybydayForm.get('fullname')?.setValue(wordle.fullname ?? '');
    this.daybydayForm.get('imgPath')?.setValue(wordle.imgPath ?? '');
    this.daybydayForm.get('difficulty')?.setValue(wordle.difficulty ?? '');
  }
  getDateIndex(date: Date): number {
    let numerodujour = date.getDate();
    let numerodumois = date.getMonth() + 1;
    let numeroannee = date.getFullYear() - 2022;
    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    return ind - 1;
  }
  getWordle(dateArg?: Date): Wordle {
    let date = dateArg ? dateArg : new Date();
    const ind = this.getDateIndex(date);
    const text = this.wordlesJSON[ind] ?? '';
    const serie = this.charactersJSON[text]?.from ?? '';
    const difficulty = this.charactersJSON[text]?.difficulty;
    const imgPath = this.charactersJSON[text]?.imgPath ?? '';
    const fullname = this.charactersJSON[text]?.fullname ?? text;
    return new Wordle({ date: date.toLocaleDateString('fr-FR'), text, serie, difficulty, imgPath, fullname });
  }
  onEditionChange(): void {
    this.charactersJSON =
      this.version === 'serie' ? structuredClone(serieCharactersInfosJSON) : structuredClone(animeCharactersInfosJSON);
    this.wordlesJSON = this.version === 'serie' ? structuredClone(serieWordlesJSON) : structuredClone(animeWordlesJSON);
    this.resetForms();
  }
  resetForms(): void {
    this.selectedDate = null;
    this.setBulksInfos();
    this.form = this._formBuilder.group({
      search: new FormControl(''),
      daybyday: new FormGroup({
        wordle: new FormControl({ value: '', disabled: true }),
        fullname: new FormControl({ value: '', disabled: true }),
        from: new FormControl({ value: '', disabled: true }),
        imgPath: new FormControl({ value: '', disabled: true }),
        difficulty: new FormControl({ value: '', disabled: true })
      }),
      bulk: new FormGroup({
        validNames: new FormControl(this.validNames),
        wordles: new FormControl(
          this.everyWordles
            .sort((wA, wB) => wA.index - wB.index)
            .map((w) => w.wordle)
            .join(', ')
        )
      })
    });
    this.daybydayForm = this.form.get('daybyday') as FormGroup;
    this.bulkForm = this.form.get('bulk') as FormGroup;
    console.warn(this.daybydayForm);
  }
  setBulksInfos(): void {
    const wIndexes: number[] = [];
    this.everyWordles = [];
    for (let d = structuredClone(this.minDate); d <= structuredClone(this.maxDate); d.setDate(d.getDate() + 1)) {
      const ind = this.getDateIndex(d);
      wIndexes.push(ind);
      this.everyWordles.push({
        index: ind,
        wordle:
          this.wordlesJSON[ind] ?? `${d.getFullYear()}${d.toLocaleString('default', { month: 'short' })}${d.getDate()}`,
        date: d
      });
    }
    this.validNames = this.wordlesJSON.filter((_, wI) => !wIndexes.includes(wI)).join(', ');
    console.warn(this.everyWordles);
  }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (cellDate < this.minDate || cellDate > this.maxDate) {
      return '';
    }
    if (view === 'month') {
      const w = this.getWordle(cellDate);
      if (w.text === '' || w.text === 'XXX') {
        return '!bg-red-500';
      }

      if (w.imgPath === '' || w.serie === '') {
        return '!bg-orange-500';
      } else {
        return '!bg-green-500';
      }
    }
    return '';
  };
  generateJSON(): void {
    const jszip = new JSZip();
    jszip.file('wordles.json', JSON.stringify(this.wordlesJSON));
    jszip.file('characters.json', JSON.stringify(this.charactersJSON));

    jszip.generateAsync({ type: 'blob' }).then((content) => {
      try {
        FileSaver.saveAs(content, 'wordles-jsons.zip');
      } catch (e) {
        console.log(e);
      }
    });
  }
  onBulkUpdate(): void {
    const validNamesCtrl = this.bulkForm.get('validNames');
    const wordlesCtrl = this.bulkForm.get('wordles');
    console.warn(validNamesCtrl, wordlesCtrl);
    const validNamesValues = validNamesCtrl?.value.split(', ') as string[];
    const wordlesValues = wordlesCtrl?.value.split(', ') as string[];
    console.warn(validNamesValues, wordlesValues);
    const loops = validNamesValues.length + wordlesValues.length;
    for (let i = 0; i <= loops; i++) {
      if (this.everyWordles.find((w) => w.index === i)) {
        //worlde
        const oldWordle = this.everyWordles.find((w) => w.index === i)?.wordle;
        const newWordle = wordlesValues.shift()?.toLowerCase();
        if (!oldWordle || !newWordle) {
          console.error(`Wordle error - newWordle : ${newWordle}, index : ${i}`);
          return;
        }

        const char = this.charactersJSON[oldWordle ?? ''] ?? { from: '', imgPath: '' };
        //Create new charactersJSON with new value
        this.charactersJSON[newWordle ?? ''] = char;

        //delete old charactersJSON
        delete this.charactersJSON[oldWordle ?? ''];

        this.wordlesJSON[i] = newWordle ?? '';
      } else {
        //not wordle
        this.wordlesJSON[i] = validNamesValues.shift()?.toLowerCase() ?? 'XXX';
      }
    }
  }
  exportCSV(): void {
    this._csvServ.exportCsv(this.charactersJSON, this.wordlesJSON, this.minDate, this.maxDate);
  }
  importCSV(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    if (!file) {
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = (_) => {
      console.log(fileReader.result);
      if (typeof fileReader.result !== 'string') {
        return;
      }
      const { characters = null, wordles = null } = this._csvServ.importCSV(fileReader.result);
      if (characters !== null) {
        this.charactersJSON = characters as {
          [key: string]: {
            from: string;
            imgPath?: string | undefined;
            fullname?: string | undefined;
            difficulty?: number | undefined;
          };
        };
      }
      if (wordles !== null) {
        this.wordlesJSON = wordles as string[];
      }
    };
    fileReader.readAsText(file);
  }
  checkImgPath() {
    for (let [_, character] of Object.entries(this.charactersJSON)) {
      character.imgPath = character.imgPath?.split('/revision')[0];
      // if (this.charactersJSON[charName]) {
      //   this.charactersJSON[charName].imgPath = character.imgPath;
      // }
      if (!character.imgPath) {
        continue;
      }
      // Make the AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('GET', character.imgPath, true);

      xhr.onload = () => {
        if (xhr.status == 200) {
          // Get the response from the server
          // Update the result div
        }
      };
      xhr.send();
    }
  }
}
