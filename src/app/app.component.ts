import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';
//表示する式の値を保持する変数
Display_formula:string=''; 
//計算する式を保持する変数
Background_formula:string='';
//計算結果を出力するための変数
Display_answer:string='';
//計算結果の誤差補正用の変数
result:string='';
//計算結果の桁数調整用の変数
result2:string=''
//押下された数字/四則演算子をディスプレイへと入力する関数
Formula(value:string){this.Display_formula += value;}//押下されたボタンに対応する値を変数の一番最後に追加
//実際に計算を行う式を保持するための関数
appendToExpression2(value:string){this.Background_formula += value;}//押下されたボタンに対応する値を変数の一番最後に追加
//入力された式の計算をする関数
calculate()//Cボタンが押された際に直前までに入力された式を計算し、答えをディスプレイに出力する関数
  {try//入力された式への処理を実行する
    {
    let result=eval(this.Background_formula);//入力された式を計算し、計算が可能な場合、答えをresultに代入
    Number(result);//resultを数字へ変換
    if(result>10000000000){this.Display_formula='error!:桁数が上限を超えています'}//答えが10億の桁を超えている場合、エラーメッセージをディスプレイに出力
    else{result;toString();//答えが10億の桁を超えていない場合、resultを文字列へ変換
    let result2=result.toLocaleString(undefined,{ maximumFractionDigits:8,useGrouping: false});//result2へ小数点以下の桁調整を行った数値を代入
    this.Display_answer=result2;//式計算の結果をディスプレに出力

  }
}
  catch(error){this.Display_answer='error!:ただしい式を入力してください'}//計算が成り立たない場合はエラーメッセージを出力
  }

  clear(){this.Display_formula =""; this.Background_formula ="";this.Display_answer ="";this.result ="";};//電卓を初期状態に戻すための関数

  
}