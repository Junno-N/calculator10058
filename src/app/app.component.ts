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
  result: number | null = 0;
  operation: string = 'add'; // 四則演算を選択するためのプロパティ
  intermediateResult: number | null = null; // 中間結果を保持
  additionalCalculation: boolean = false; // 追加計算のボタン表示制御
  // 新しいプロパティを追加
  num3: number = 0;
  operation2: string = 'add'; // 追加計算での演算子
  calculationBase: number | null = null; // 計算元
  isCalculated: boolean = false;
  isDivisionByZero: boolean = false; // 0で割る操作を行ったかどうかのフラグ


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
      this.isDivisionByZero = false; // 0で割る操作ではないため、フラグをfalseに
    } else {
      alert("0で割ることはできません。");
      this.result = 0;
      this.calculationBase = null; // 計算元も非表示にする
      this.isDivisionByZero = true; // 0で割る操作を行ったため、フラグをtrueに
    }
    console.log("divide end");
  }
  
  

  // 四則演算を行うメソッド（拡張）
  calculate() {
    console.log(this.operation); // 現在選択されている演算の確認
    // 0で割る操作が以前に行われたかどうかに関わらず、ここでフラグをリセット
    this.isDivisionByZero = false;
    if (!this.isDivisionByZero) { // 0で割る操作が行われていない場合のみ実行
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
      // 中間結果の表示を無効化（コメントアウトまたは削除）
      // this.intermediateResult = this.result;

      // 計算後の処理
      this.calculationBase = null; // 通常計算の場合、計算元をクリアする
      this.additionalCalculation = true;  // 計算後、追加計算ボタンを表示
      this.isCalculated = true; // 計算が実行されたのでtrueに設定
    }
  }

  // 追加計算を行う
  performAdditionalCalculation() {
    if (!this.isDivisionByZero) { // 0で割る操作が行われていない場合のみ実行
      // 計算元を保存
      this.calculationBase = this.result;
      this.additionalCalculation = true; // 追加計算後もボタンを表示
      this.isDivisionByZero = false;


      if (this.calculationBase !== null) {
      // num3 と calculationBase を使った計算処理を追加
        switch (this.operation2) {
          case 'add':
            this.result = parseFloat (( this.calculationBase + this.num3).toFixed(8));
            break;
          case 'subtract':
            this.result = parseFloat (( this.calculationBase - this.num3).toFixed(8));
            break;
            break;
          case 'multiply':
            this.result = parseFloat (( this.calculationBase * this.num3).toFixed(8));
            break;
            break;
          case 'divide':
            if (this.num3 !== 0) {
              this.result = parseFloat (( this.calculationBase / this.num3).toFixed(8));
              break;
            } else {
              alert("0で割ることはできません。計算がリセットされます。");
              this.result = null; // 除算エラーの場合は結果をnullに設定する
              this.calculationBase = null; // 計算元も非表示にする
              this.additionalCalculation = false; // 追加計算ボタンも非表示にする
              this.isDivisionByZero = true;
            }
            break;
          default:
            this.result = 0;
        }
      } else {
        // calculationBaseがnullの場合の処理、例えばエラーメッセージの表示
        alert("計算基準値が設定されていません。");
      }
        // 中間結果を更新をコメントアウト
        // this.intermediateResult = this.result;
        // 計算後、First Number と Second Number をリセット（Third Number はリセットしない）
      this.num1 = 0;
      this.num2 = 0;

      // 追加計算の後に、追加の入力を促すため、additionalCalculation を true に保つか、
      // 追加計算が完了したことを示すために false に設定するかを検討します。
      this.additionalCalculation = true;
    }
  }

  clearResult() {
    this.num1 = 0;
    this.num2 = 0;
    this.result = 0;
    this.operation = 'add'; // デフォルトの演算にリセット
    this.intermediateResult = null; // 中間結果もクリア
    this.additionalCalculation = false; // 追加計算ボタンを非表示
    // クリア処理を修正
    this.num3 = 0; // 追加で Third Number もクリアする場合
    this.calculationBase = null; // 計算元をクリア
    this.isCalculated = false; // 「Result」という単語の表示を非表示にする
    this.isDivisionByZero = false; // クリア時にフラグもリセット
  }  
}
