import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import * as animeCharactersInfosJSON from '@editor-assets-anime/jsons/characters.json';
import animeWordlesJSON from '@editor-assets-anime/jsons/w1-3.json';
import * as serieCharactersInfosJSON from '@editor-assets-series/jsons/characters.json';
import serieWordlesJSON from '@editor-assets-series/jsons/w1-3.json';
import { GameService } from '@editor-core/services/game.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Wordle } from '../../../models/wordle.model';

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
  } = serieCharactersInfosJSON;
  wordlesJSON: string[] = serieWordlesJSON;
  minDate: Date = new Date('12/02/2022');
  maxDate: Date = new Date('12/02/2032');
  daybydayForm: FormGroup = new FormGroup({});
  validNames: string = '';
  everyWordles: { wordle: string; date: Date }[] = [];
  private _destroy$: Subject<void> = new Subject();
  constructor(public gameService: GameService, private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.resetForms();
    this.daybydayForm
      .get('search')
      ?.valueChanges.pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((s) => {
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
        this.onDateChange(res.date);
        this.matCalendar?._goToDateInView(res.date, 'month');
      });
  }

  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }

  onDateChange(event: Date | null): void {
    if (!event) {
      this.daybydayForm.disable();
      return;
    }
    const wordle = this.getWordle(event);
    this.daybydayForm.enable();
    this.daybydayForm.get('wordle')?.setValue(wordle.text ?? '');
    this.daybydayForm.get('from')?.setValue(wordle.serie ?? '');
    this.daybydayForm.get('fullname')?.setValue(wordle.fullname ?? '');
    this.daybydayForm.get('imgPath')?.setValue(wordle.imgPath ?? '');
    this.daybydayForm.get('difficulty')?.setValue(wordle.difficulty ?? '');
  }
  getWordle(dateArg?: Date): Wordle {
    let date = dateArg ? dateArg : new Date();
    let numerodujour = date.getDate();
    let numerodumois = date.getMonth() + 1;
    let numeroannee = date.getFullYear() - 2022;
    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    const text = this.wordlesJSON[ind - 1] ?? '';
    const serie = this.charactersJSON[text]?.from ?? '';
    const difficulty = this.charactersJSON[text]?.difficulty;
    const imgPath = this.charactersJSON[text]?.imgPath ?? '';
    const fullname = this.charactersJSON[text]?.fullname ?? text;
    return new Wordle({ date: date.toLocaleDateString('fr-FR'), text, serie, difficulty, imgPath, fullname });
  }
  onEditionChange(): void {
    this.charactersJSON = this.version === 'serie' ? serieCharactersInfosJSON : animeCharactersInfosJSON;
    this.wordlesJSON = this.version === 'serie' ? serieWordlesJSON : animeWordlesJSON;
    this.resetForms();
  }
  resetForms(): void {
    this.selectedDate = null;
    this.setValidNames();
    this.daybydayForm = this._formBuilder.group({
      search: new FormControl(''),
      wordle: new FormControl({ value: '', disabled: true }),
      fullname: new FormControl({ value: '', disabled: true }),
      from: new FormControl({ value: '', disabled: true }),
      imgPath: new FormControl({ value: '', disabled: true }),
      difficulty: new FormControl({ value: '', disabled: true }),
      validNames: new FormControl(this.validNames),
      wordles: new FormControl(this.everyWordles.map((w) => w.wordle).join(', '))
    });
  }
  setValidNames(): void {
    const wIndexes: number[] = [];
    this.everyWordles = [];
    for (let d = new Date('12/02/2022'); d <= new Date('12/02/2032'); d.setDate(d.getDate() + 1)) {
      let numerodujour = d.getDate();
      let numerodumois = d.getMonth() + 1;
      let numeroannee = d.getFullYear() - 2022;
      const ind =
        12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
      wIndexes.push(ind - 1);
      this.wordlesJSON[ind - 1] &&
        this.everyWordles.push({ wordle: this.wordlesJSON[ind - 1] ?? '', date: new Date(d) });
    }
    this.validNames = this.wordlesJSON.filter((_, wI) => !wIndexes.includes(wI)).join(', ');
  }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const w = this.getWordle(cellDate);
      if (w.text === '' || w.text === 'XXX') {
        return '!bg-red-500';
      }

      if (w.fullname === '' || w.fullname === w.text || w.imgPath === '' || w.serie === '') {
        return '!bg-orange-500';
      } else {
        return '!bg-green-500';
      }
    }
    return '';
  };
}
