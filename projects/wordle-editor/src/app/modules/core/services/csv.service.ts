import { Injectable } from '@angular/core';
import FileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class CSVService {
  exportCsv(
    characters: {
      [key: string]: { from: string; imgPath?: string; fullname?: string; difficulty?: number };
    },
    wordles: string[],
    minDate: Date,
    maxDate: Date
  ) {
    const data = this._convertToCSV(
      structuredClone(characters),
      structuredClone(wordles),
      structuredClone(minDate),
      structuredClone(maxDate)
    );
    console.warn(data);
    const blob = new Blob([data], { type: 'text/csv' });
    FileSaver.saveAs(blob, 'wordles.csv');
  }
  importCSV(file: string): {
    characters?: {
      [key: string]: { from: string; imgPath?: string; fullname?: string; difficulty?: number };
    };
    wordles?: string[];
  } {
    console.warn(file);
    let lines = file.split('\r\n');
    //remove header
    lines.shift();
    const wordles: string[] = [];
    const characters: {
      [key: string]: { from: string; imgPath?: string; fullname?: string; difficulty?: number };
    } = {};

    for (let i = 0; i <= lines.length; i++) {
      const line = lines[i]?.split(',');
      if (!line) {
        continue;
      }
      const [_, wordle = '', fullname = undefined, from = '', imgPath = undefined, difficulty = undefined] = line;
      if (wordle.trim() === '') {
        continue;
      }
      wordles.push(wordle.trim().toLowerCase());
      if (from?.trim() === '') {
        continue;
      }
      const fixImgPath = imgPath?.split('/revision/latest')[0];
      characters[wordle.trim().toLowerCase()] = {
        from: from?.trim(),
        imgPath: fixImgPath?.trim() === '' ? undefined : fixImgPath?.trim(),
        fullname: fullname?.trim() === '' ? undefined : fullname?.trim(),
        difficulty: !difficulty || difficulty.trim() === '' ? undefined : parseInt(difficulty)
      };
    }
    return { characters, wordles };
  }

  private _convertToCSV(
    characters: {
      [key: string]: { from: string; imgPath?: string; fullname?: string; difficulty?: number };
    },
    wordles: string[],
    minDate: Date,
    maxDate: Date
  ): string {
    let str = '';
    let row = 'S.No,';
    let headers = ['text', 'fullname', 'from', 'imgPath', 'difficulty', 'date'];
    for (let header of headers) {
      row += header + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    const everyWordlesIndex = [];
    for (let d = structuredClone(minDate); d <= structuredClone(maxDate); d.setDate(d.getDate() + 1)) {
      everyWordlesIndex.push({ index: this.getDateIndex(d), date: structuredClone(d) });
    }

    for (let i = 0; i < wordles.length; i++) {
      let line = i + 1 + '';
      if (everyWordlesIndex.find(({ index }) => index === i)) {
        //wordle
        for (let header of headers) {
          if (header === 'text') {
            line += ',' + wordles[i];
          } else if (header === 'date') {
            let date = everyWordlesIndex.find(({ index }) => index === i)?.date;
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
            const dateStr = date?.toLocaleDateString('fr-FR', options).split('/').reverse().join('-'); //format DD/MM/YYYY split into ['DD','MM','YYYY'], reversed and then join into YYYY-MM-DD
            line += ',' + dateStr;
          } else {
            const char = characters[wordles[i] ?? ''];
            if (!char || !header) {
              line += ',';
              continue;
            }
            line += ',' + this._strRep(char[header as keyof typeof char]) ?? '';
          }
        }
        str += line + '\r\n';
      } else {
        //not worlde
        line += ',' + (wordles[i] ?? '') + ',,,,,';
        str += line + '\r\n';
      }
    }

    return str;
  }
  private _strRep(data: unknown) {
    if (typeof data == 'string') {
      let newData = data.replace(/,/g, ' ');
      return newData;
    } else if (typeof data == 'undefined') {
      return '';
    } else if (typeof data == 'number') {
      return data.toString();
    } else {
      return data;
    }
  }
  getDateIndex(date: Date): number {
    let numerodujour = date.getDate();
    let numerodumois = date.getMonth() + 1;
    let numeroannee = date.getFullYear() - 2023;
    const ind =
      12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    return ind - 1;
  }
}
