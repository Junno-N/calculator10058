import { Component } from '@angular/core';
import { endWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent 
{
title = '電卓';
// counter:string='0';

// count(){
//   var num=Number(this.counter);
//   num += 1;
//   this.counter = String(num);
// }
// reset(){
//   this.counter = '0';


//表示する式の値を保持する変数
Display_formula:string='';
//計算する式を保持する変数
Background_formula:string='';
//計算結果を出力するための変数
Display_answer:string='';
//計算結果の誤差補正用の変数
result:string='';
//計算結果の桁数調整用の変数\
result2:string='';

//小数点カウンター用関数
syousuu:string='';
syousuu2:string='';
zero1:string='';
zero2:string='';
//数字桁数counter
ketasuu:string='';

saidaiketasuu: number =10;
//押下された数字/計算記号をディスプレイへと入力する関数
Formula(value:string){
  //let syousuusyori = ( this.Display_formula.match( /\./g ) || [] ).length
  if(this.Display_formula.length >= 30){return;}


  if(this.Display_formula.endsWith('\.0000000') && value == ('0') )
    {return;}

  if(this.Display_formula.length==1&&this.Display_formula.endsWith('0')){return;}

  if((this.Display_formula.endsWith('\×0'))||
  (this.Display_formula.endsWith('\÷0'))||
  (this.Display_formula.endsWith('\+0'))||
  (this.Display_formula.endsWith('\-0')))
  {
  return
  ;
  }

  if(!isNaN(Number(this.Display_formula.slice(-1)))){
let kakuninnyou1 = this.Display_formula.lastIndexOf('+')
kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('-'));
kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('÷'));
kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('×'));
let kakuninnyou2 =this.Display_formula.replace("\.","").length - (kakuninnyou1+1);

// if(kakuninnyou2.toString().includes('\.')){kakuninnyou2 = kakuninnyou2 }
if (kakuninnyou2   >= this.saidaiketasuu)
  {return;}




}

  this.Display_formula += value;
}





Formula00(value:string){

  if(!this.Display_formula){return;}
  
  if(this.Display_formula.endsWith('\.000000'))
    {return;}

  
  //let syousuusyori = ( this.Display_formula.match( /\./g ) || [] ).length  
  if(this.Display_formula.length >= 29){return;}

  



  if(this.Display_formula.length==1&&this.Display_formula.endsWith('0')){return;}

  
  if(this.Display_formula.endsWith('\×')||
  this.Display_formula.endsWith('\÷')||
  this.Display_formula.endsWith('\+')||
  this.Display_formula.endsWith('\-'))
  {
  return
  ;
  }

  if(this.Display_formula.endsWith('\×0')||
  this.Display_formula.endsWith('\÷0')||
  this.Display_formula.endsWith('\+0')||
  this.Display_formula.endsWith('\-0'))
  {
  return
  ;
  }






  if(!isNaN(Number(this.Display_formula.slice(-1)))){
let kakuninnyou1 = this.Display_formula.lastIndexOf('+')
kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('-'));
kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('÷'));
kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('×'));
let kakuninnyou2 =this.Display_formula.replace("\.","").length - (kakuninnyou1 + 1);
// if(kakuninnyou2.toString().includes('\.')){kakuninnyou2 = kakuninnyou2 -1}  
if (kakuninnyou2 >= this.saidaiketasuu -1)
  {return;}




}

  this.Display_formula += value;
};

Formula000(value:string){
  
  if(!this.Display_formula){return;}
  //let syousuusyori = ( this.Display_formula.match( /\./g ) || [] ).length
  if(this.Display_formula.length >= 28){return;}

  if(this.Display_formula.endsWith('\.00000'))
    {return;}




  if(this.Display_formula.length==1&&this.Display_formula.endsWith('0')){return;}


  if(this.Display_formula.endsWith('\×')||
  this.Display_formula.endsWith('\÷')||
  this.Display_formula.endsWith('\+')||
  this.Display_formula.endsWith('\-'))
  {
  return
  ;
  }


  
  if(this.Display_formula.endsWith('\×0')||
  this.Display_formula.endsWith('\÷0')||
  this.Display_formula.endsWith('\+0')||
  this.Display_formula.endsWith('\-0'))
  {
  return
  ;
  }

  
  
  
  
  
  
  
  
  
  
  if(!isNaN(Number(this.Display_formula.slice(-1)))){
let kakuninnyou1 = this.Display_formula.lastIndexOf('\+')
kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('\-'));
kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('\÷'));
kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('\×'));
let kakuninnyou2 =this.Display_formula.replace("\.","").length - (kakuninnyou1 + 1);

if(kakuninnyou2.toString().includes('\.')){kakuninnyou2 = kakuninnyou2 -1}

if (kakuninnyou2 >= this.saidaiketasuu -2)
  {return;}



}

  this.Display_formula += value;
}







//実際に計算を行う式を保持するための関数
Formula_Background(value:string){
  if(this.Background_formula.length==1&&this.Background_formula.endsWith('0')){return;}
  //let syousuusyori = ( this.Background_formula.match( /\./g ) || [] ).length
   if(this.Background_formula.length  >= 30){return;}

   if(this.Background_formula.endsWith('\.0000000')&&value == ('0'))
    {return;}

  if((this.Background_formula.endsWith('\*0'))||
  (this.Background_formula.endsWith('\/0'))||
  (this.Background_formula.endsWith('\+0'))||
  (this.Background_formula.endsWith('\-0')))
  {
  return
  ;
  }

  if(!isNaN(Number(this.Background_formula.slice(-1)))){
    let kakuninnyou1 = this.Background_formula.lastIndexOf('\+')
    kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\-'));
    kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\/'));
    kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\*'));
    let kakuninnyou2 =this.Background_formula.replace("\.","").length - (kakuninnyou1 + 1);
      
    if (kakuninnyou2 >= this.saidaiketasuu)
      {return;}

    
    
    }
    
  
  
  this.Background_formula += value;}

  Formula_Background00(value:string){
    //let syousuusyori = ( this.Background_formula.match( /\./g ) || [] ).length
    if(this.Background_formula.length >= 29){return;}
    if(this.Background_formula.endsWith('\.000000'))
      {return;}

    if(!this.Background_formula){return;}


    if(this.Background_formula.length==1&&this.Background_formula.endsWith('0')){return;}
  
    
    if(this.Background_formula.endsWith('\*')||
    this.Background_formula.endsWith('\/')||
    this.Background_formula.endsWith('\+')||
    this.Background_formula.endsWith('\-'))
    {
    return
    ;
    }
  
    if(this.Background_formula.endsWith('\*0')||
    this.Background_formula.endsWith('\/0')||
    this.Background_formula.endsWith('\+0')||
    this.Background_formula.endsWith('\-0'))
    {
    return
    ;
    }
  
  
  
  
  





    if(!isNaN(Number(this.Background_formula.slice(-1)))){
      let kakuninnyou1 = this.Background_formula.lastIndexOf('+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\/'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\*'));
      let kakuninnyou2 =this.Background_formula.replace("\.","").length - (kakuninnyou1 + 1);
        
      if (kakuninnyou2 >= this.saidaiketasuu -1)
        {return;}
      
      
      }
      
    
    
    this.Background_formula += value;}
  

;

Formula_Background000(value:string){

if(this.Background_formula.endsWith('\.00000'))
{return;}
    

  if(!this.Background_formula){return;}
  //let syousuusyori = ( this.Background_formula.match( /\./g ) || [] ).length
  if(this.Background_formula.length >= 28){return;}

  if(this.Background_formula.length==1&&this.Background_formula.endsWith('0')){return;}

  
  if(this.Background_formula.endsWith('\*')||
  this.Background_formula.endsWith('\/')||
  this.Background_formula.endsWith('\+')||
  this.Background_formula.endsWith('\-'))
  {
  return
  ;
  }

  if(this.Background_formula.endsWith('\/0')||
  this.Background_formula.endsWith('\*0')||
  this.Background_formula.endsWith('\+0')||
  this.Background_formula.endsWith('\-0'))
  {
  return
  ;
  }

  if(!isNaN(Number(this.Background_formula.slice(-1)))){
    let kakuninnyou1 = this.Background_formula.lastIndexOf('\+')
    kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\-'));
    kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\/'));
    kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\*'));
    let kakuninnyou2 =this.Background_formula.replace("\.","").length - (kakuninnyou1 + 1);
      
    if (kakuninnyou2 >= this.saidaiketasuu -2)
      {return;}
    if(this.Background_formula.replace("\.","").length>28){return;}
    
    
    }
    
  
  
  this.Background_formula += value;}


;





//押下された数字/計算記号をディスプレイへと入力する関数
Formula2(value:string){ 
  //いきなりマイナス以外を押下すると何もしない
  if(!this.Display_formula&&value !='\-'){return;}
  if(this.Display_formula.length == 1&&this.Display_formula.endsWith('\-')){return;}
  if(this.Display_formula.length>28){return;}
//マイナスの計算を可能にする
  if(this.Display_formula.endsWith('\+')&&value =='\-'||
  this.Display_formula.endsWith('\^')&&value =='\-'||
  this.Display_formula.endsWith('\÷')&&value =='\-'||
  this.Display_formula.endsWith('\×')&&value =='\-'
){this.Display_formula += value
  this.syousuu='';
  this.syousuu2=''
  ;return
}


if(this.Display_formula.endsWith('\+\-')||
this.Display_formula.endsWith('\^\-')||
this.Display_formula.endsWith('\÷\-')||
this.Display_formula.endsWith('\×\-')||
this.Display_formula.endsWith('\-\-'))
{this.Display_formula=this.Display_formula.slice(0,-2);this.Display_formula += value;
  this.syousuu='';
  this.syousuu2=''
}

//前が数字ではない
if(this.Display_formula.endsWith('\.')){return;}  


if(this.Display_formula.endsWith('\+')||
  this.Display_formula.endsWith('\÷')||
  this.Display_formula.endsWith('\×')||
  this.Display_formula.endsWith('\-'))
{this.Display_formula=this.Display_formula.slice(0,-1);this.Display_formula += value;
  this.syousuu='';
  this.syousuu2=''
}

else
{this.Display_formula += value
this.syousuu='';
this.syousuu2=''  
;return}

} 
;

//実際に計算を行う式を保持するための関数
Formula_Background2(value:string){ 
  if(this.Background_formula.endsWith('\.')){return;}
  if(!this.Background_formula&&value !='\-'){return;}
  if(this.Background_formula.length == 1 &&this.Background_formula.endsWith('\+')){return;}
  if(this.Background_formula.length>28){return;}

  if(this.Background_formula.endsWith('\*')&&value =='\-'||
  this.Background_formula.endsWith('\/')&&value =='\-'||
  this.Background_formula.endsWith('\+')&&value =='\-' )
  {this.Background_formula += value;
    this.syousuu='';
    this.syousuu2=''
    ;return

  }

  if(this.Background_formula.endsWith('\*\-')||
  this.Background_formula.endsWith('\/\-')||
  this.Background_formula.endsWith('\-\-')||
  this.Background_formula.endsWith('\+\-'))
  {
    this.Background_formula
    =this.Background_formula.slice(0,-2);
    this.Background_formula += value
;   this.syousuu='';
    this.syousuu2=''
  }
  
  if(this.Background_formula.endsWith('\*')||
  this.Background_formula.endsWith('\/')||
  this.Background_formula.endsWith('\+')||
  this.Background_formula.endsWith('\-'))
  {
    this.Background_formula
    =this.Background_formula.slice(0,-1);
    this.Background_formula += value;
    this.syousuu='';
    this.syousuu2=''
  }
    else
    {this.Background_formula += value;}
    this.syousuu='';
    this.syousuu2=''
  }
  
;Formula3(value:string)
  { 
    //空白の時小数点は記入しない
    if(!this.Display_formula){return;}
    if(this.Display_formula.length>=29){return;}
    
    if(!isNaN(Number(this.Display_formula.slice(-1)))){
      let kakuninnyou1 = this.Display_formula.lastIndexOf('+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('÷'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('×'));
      let kakuninnyou2 =this.Display_formula.length - (kakuninnyou1 + 1);
        
      if (kakuninnyou2   >= this.saidaiketasuu)
        {return;}
         
    }   
   
    if(this.Display_formula.endsWith('\×')||
  this.Display_formula.endsWith('\÷')||
  this.Display_formula.endsWith('\-')||
  this.Display_formula.endsWith('\+'))
    {return;}

    if(this.syousuu == 'checked!'){return;}


    else{this.Display_formula += value;
      this.syousuu = 'checked!' ;

    }
}
  ;
  ;Formula_Background3(value:string)
  { 
    //空白の時小数点は記入しない
    if(!this.Background_formula){return;}
    if(this.Background_formula.length>=29){return;}
    
    if(!isNaN(Number(this.Background_formula.slice(-1)))){
      let kakuninnyou1 = this.Background_formula.lastIndexOf('\+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\/'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\*'));
      let kakuninnyou2 =this.Background_formula.length - (kakuninnyou1 + 1);
        
      if (kakuninnyou2  >= this.saidaiketasuu)
        {return;}
         
    }   
   
    if(this.Background_formula.endsWith('\*')||
  this.Background_formula.endsWith('\/')||
  this.Background_formula.endsWith('\-')||
  this.Background_formula.endsWith('\+'))
    {return;}

    if(this.syousuu2 == 'checked!'){return;}


    else{this.Background_formula += value;
      this.syousuu2 = 'checked!' ;

    }
}
  ;



//     Formula_Background3(value:string)
//     {
//       //空白の時小数点は記入しない
//       if(!this.Background_formula){return;}
//       if(this.Background_formula.length>=29){return;}    

//       if(!isNaN(Number(this.Background_formula.slice(-1)))){
//         let kakuninnyou1 = this.Background_formula.lastIndexOf('+') 
//         kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('-'));
//         kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('÷'));
//         kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('×'));
//         let kakuninnyou2 =this.Background_formula.length - (kakuninnyou1 + 1);
          
//         if (kakuninnyou2   >= this.saidaiketasuu)
//           {return;}}




//   if(this.Background_formula.endsWith('\*')||
//   this.Background_formula.endsWith('\/')||
//   this.Background_formula.endsWith('\-')||
//   this.Background_formula.endsWith('\+'))
// {return;}
//       else



//       if(this.syousuu2 == 'checked!'){return;}

//       {this.Background_formula += value;
//         this.syousuu2 = 'checked!';
//       }



//   }
  
//     ;
  
  

//入力文字数制限超えている場合にはエラーを返す関数
wordcount(){if(this.Display_formula.length>30){return;}}
;

//=ボタンが押された際に直前までに入力された式を計算し、答えをディスプレイに出力する関数
calculate()
 {
  //式が入力されていないときにボタンが押下された際は何もしない
  if(!this.Display_formula){return;}
;

  
  //計算前に式の不具合のチェックを行い、エラーを返して関数を終了する
  //掛け算と割り算が連続する場合
  let tester1=(/\×\×|\÷\÷/)
    if(this.Display_formula.match(tester1)){this.Display_answer="Error!不正な式です!";return}
  //式が0で割られている場合
  let tester2=(/\/0\.0*[\+|\-|\*|\/]|\/0$|\/0.0*$|\/0.0*$|\/0[\+|\-|\*|\/]/)
  if(this.Background_formula.match(tester2)){this.Display_answer="Error!0で割ることはできません";return}
 //式が計算記号で終了する場合
   let tester3=(/[\+|\-|\*|\/|\.]$/)
  if(this.Background_formula.match(tester3)){return;}
//小数点が二つ連続する場合
  let tester4=(/\.\./)
  if(this.Background_formula.match(tester4)){this.Display_answer="Error!不正な式です!";return}
  //小数点が二つ連続する場合
  let tester5=(/\.\./)
  if(this.Background_formula.match(tester5)){this.Display_answer="Error!不正な式です!";return}
   //小数点が二つある場合
   //小数点の前後に数字が来ないパターン/式が小数点で開始もしくは終了するパターン/一つの数字に小数点が二つ以上含まれるパターン
  let tester6=(/[\+|\-|\*|\/]\.|\.[\+|\-|\*|\/]|\.$|[0-9]*\.[0-9]*\.[0-9]*|^\./)
  if(this.Background_formula.match(tester6)){this.Display_answer="Error!";return}
  

  try{  
  //入力された式への処理を実行する
  let result=eval(this.Background_formula) 
  Number(result);
  if(result>=10000000000){this.Display_answer="Error!桁数制限";return;}
  if(result<=-10000000000){this.Display_answer="Error!桁数制限";return;}
    if(result<0.0000000005 && result > 0){this.Display_answer="Error!四捨五入すると0になります";return;}
    if(result>-0.0000000005 && result < 0){this.Display_answer="Error!四捨五入すると0になります";return;}
 
 
    else{
    //result2へ小数点以下の桁調整を行った数値を代入
       this.result2=result.toLocaleString(undefined,{ maximumFractionDigits:9,useGrouping: false});
  //式計算の結果をディスプレーに出力
      if(this.result2.replace("\.","").replace("\-","").length >= 10)

        {if(this.result2.match(/\./)&&this.result2.slice(0, 11).endsWith("\.")&&!this.result2.match(/\-/))
          {this.Display_answer=this.result2.slice(0, 10);return}

      if(this.result2.match(/\./)&&this.result2.slice(0, 12).endsWith("\.")&&this.result2.match(/\-/))
          {this.Display_answer=this.result2.slice(0, 11);return;}

        if(this.result2.match(/\./)&&this.result2.slice(0, 11).endsWith("\.")&&this.result2.match(/\-/))
          {this.Display_answer=this.result2.slice(0, 12);return;}

        if(this.result2.match(/\./)&&this.result2.slice(0, 10).endsWith("\.")&&!this.result2.match(/\-/))
          {this.Display_answer=this.result2.slice(0, 11);return}  
      
        if(this.result2.match(/\./)&&this.result2.match(/\-/))
          {this.Display_answer=this.result2.slice(0,12);return}  
  

        if(!this.result2.match(/\./)&&this.result2.match(/\-/))
          {this.Display_answer=this.result2.slice(0, 11);return;}
      
      


        if(this.result2.match(/\./))
        {this.Display_answer=this.result2.slice(0,11);return}  

        
        
        
        else{this.Display_answer=this.result2.slice(0, 10);return;}
          



        }
      else 
      {this.Display_answer=this.result2;}
     }}
  //計算が成り立たない場合はエラーメッセージを出力
     catch(error){this.Display_answer='Error!'}
   };
    ;

;clear()
{

  
  //もし表示式の末尾が"."の場合
  if(this.Display_formula.endsWith('.'))

    {  this.Display_formula = this.Display_formula.slice(0, -1);
    this.Background_formula = this.Background_formula.slice(0, -1);
    this.syousuu='';
    this.syousuu2='';
    return;}
 
else {this.Display_formula = this.Display_formula.slice(0, -1);
    this.Background_formula = this.Background_formula.slice(0, -1)
  
  };
  
}

//電卓を初期状態に戻すための関数
;allclear()
{  
  this.result2="";
  this.Display_formula ="";
  this.Background_formula ="";
  this.Display_answer ="";
  this.result ="";
  this.syousuu=''
  this.syousuu2=''

}

}

