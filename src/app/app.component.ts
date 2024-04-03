import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';

  num1: number = 0;
  num2: number = 0;
  result: number = 0;
  operation: string = 'add'; // 四則演算を選択するためのプロパティ

  // 加算メソッド
  add() {
    console.log("add start");
    this.result = parseFloat((this.num1 + this.num2).toFixed(8));
    console.log("add end");
  }

  subtract() {
    console.log("subtract start");
    this.result = parseFloat((this.num1 - this.num2).toFixed(8));
    console.log("subtract end");
  }

  multiply() {
    console.log("multiply start");
    this.result = parseFloat(( this.num1 * this.num2).toFixed(8));
    console.log("multiply end");
  }

  divide() {
    console.log("divide start");
    if (this.num2 !== 0) {
      this.result = parseFloat(( this.num1 / this.num2).toFixed(8));
    } else {
      alert("0で割ることはできません。");
      this.result = 0;
    }
    console.log("divide end");
  }
  
  

  // 四則演算を行うメソッド（拡張）
  calculate() {
    console.log(this.operation); // 現在選択されている演算の確認
    switch (this.operation) {
      case "add":
        this.add(); // 加算
        break;
      case "subtract":
        this.subtract(); // 減算メソッドを呼び出し
        break;
      case "multiply":
        this.multiply(); // 乗算メソッドを呼び出し
        break;
      case "divide":
        this.divide(); // 除算メソッドを呼び出し
        break;
      default:
        this.result = 0;
    }
  }
  clearResult() {
    this.num1 = 0;
    this.num2 = 0;
    this.result = 0;
    this.operation = 'add'; // デフォルトの演算にリセット
  }  
}
