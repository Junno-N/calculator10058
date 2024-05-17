import { Component } from '@angular/core';
import { endWith } from 'rxjs';
import {jsPDF} from 'jspdf';
import autoTable, { Styles } from 'jspdf-autotable'




@Component({

  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent 
{
title = '電卓';
testtest:string="";
testtesttest=window.localStorage.getItem('logger');
testtesttest3=this.testtesttest;
testtesttest4=this.testtesttest3?.replaceAll("null","")

dt = new Date();
y = this.dt.getFullYear();
m = ("00" + (this.dt.getMonth()+1)).slice(-2);
d = ("00" + (this.dt.getDate())).slice(-2);
today = this.y  + this.m +  this.d + '_log.pdf';
   
logging1()
{
  if(this.switchs=="switching!")
    {alert('式記録モードです！');return;}
  //式が入力されていない場合終了
  if(!this.Display_formula){return;}
  //正しい式でない場合終了
  //kiroku変数はcalc関数実行時に式が正しくないと判断された場合フラグが立つ
  if(this.kiroku=="error"){return;}
  //下記の5行を追加 同じ式をに連続で記録しようとした際にアラート
  // let cutter = (this.Display_formula + "=" + this.Display_answer + "\n");
  // if(this.testtest == cutter)
  //   {alert('直前の入力と同じ式です');return;}
  // if(!(!this.testtesttest4)&&cutter == (this.testtesttest4.slice(-(cutter.length))))
  // {alert('直前の入力と同じ式です');return;}
     
  if(this.Display_answer.match(/Error/))
  {return;} 
  //既定の行数以上の履歴がある場合、アラートを出し、記録を行わない
  if(this.testtesttest !== null &&((this.testtesttest.match(/\n/g) || []).length + 1) > 50)
  {alert('記録可能上限です！');return;}
   
  else
    {
    this.testtest = (this.Display_formula + "=" + this.Display_answer + "\n");
    this.testtesttest3 = this.testtesttest += this.testtest;
    this.testtesttest4 = this.testtesttest3.replaceAll("null","")
  }
};

logging2()
{
  if(this.kiroku=="error"){return;}  
  if(!this.testtesttest3){return;}
  else{}
  localStorage.setItem('logger',(this.testtesttest3))
};
     
     
logging3()
{
  localStorage.removeItem('logger')
  ;this.testtesttest4 =""
  ;this.testtesttest =""
  ;this.testtest =""
};

public convetToPDF()
{
  if(!this.testtesttest4){return;}
  const pdf = new jsPDF("p", "pt", "a4");
  pdf.setFontSize(13);
  pdf.text( this.testtesttest4 , 20, 20);
  pdf.save( this.today );
};

//すべての変数の中身をローカルストレージに送る
keep2(){ localStorage.clear();};
keep()
{
  if(this.Display_formula.match(/null/))
  {
    this.Display_formula=this.Display_formula.slice(-1);
    this.Background_formula=this.Background_formula.slice(-1);
  }
  localStorage.setItem('DFkeeper1',this.Display_formula
  ?.replaceAll("null",""))

  ;localStorage.setItem('BFkeeper2',this.Background_formula
  ?.replaceAll("null",""))

  ;localStorage.setItem('DAkeeper3',
  this.Display_answer?.replaceAll("null",""))
  ;localStorage.setItem('SYkeeper5',this.syousuu?.replaceAll("null",""))
  ;localStorage.setItem('SY2keeper6',this.syousuu2?.replaceAll("null",""))
  ;localStorage.setItem('SYkeeper7',this.syousuu?.replaceAll("null",""))
  ;localStorage.setItem('REkeeper8',this.result?.replaceAll("null",""))
  ;localStorage.setItem('RE2keeper9',this.result2?.replaceAll("null",""))
};

switchs=localStorage.getItem('switchholder');
keepview=localStorage.getItem('fav'); 
keepview_background=localStorage.getItem('fav2');

switcher()  
{
  if(!this.Display_formula&&this.switchs=="switching!")
  {
    this.switchs="";
    this.Display_answer="";
    this.Background_formula="";
    localStorage.removeItem('switchholder');
    localStorage.setItem('DAkeeper3',this.Display_answer);
    localStorage.setItem('BFkeeper2',this.Background_formula);
    return;
  }

  if(!this.Display_formula&&!this.switchs)
    {
      this.switchs="switching!";
      this.Display_answer="式記録モードです";
      this.Background_formula="\ ";
      localStorage.setItem('switchholder',this.switchs);
      localStorage.setItem('DAkeeper3',this.Display_answer);
        localStorage.setItem('BFkeeper2',this.Background_formula);

        return;
    }  

};

;favkeep()
{
  if(!this.switchs){alert("式保存モードにしてください");return;}
  if(!this.Background_formula&&this.switchs=="switching!")
  {alert("値が入力されていません！！！  ");return;}    
  if(this.Background_formula.endsWith("\.")&&this.switchs=="switching!")
    {alert("小数点での終了！！！");return;}

  if(this.switchs=="switching!"&&!this.Background_formula)
{    this.Background_formula="\ ";}
  if(this.switchs=="switching!")
  {
    this.switchs="switching!";
    this.Display_answer="式記録モードです";

    this.switchs="switching!";
    localStorage.setItem('switchholder',this.switchs);
    localStorage.setItem('DAkeeper3',this.Display_answer);
    localStorage.setItem('BFkeeper2',this.Background_formula);

    // this.Display_answer="式記録モードです";
    // this.Background_formula="\ ";
    // localStorage.setItem('switchholder',this.switchs);
    // localStorage.setItem('DAkeeper3',this.Display_answer);
    // localStorage.setItem('BFkeeper2',this.Background_formula);
 
    localStorage.setItem('fav2',(this.Background_formula))
    ;localStorage.setItem('fav',(this.Display_formula));
    this.keepview_background=localStorage.getItem('fav2')
    this.keepview=localStorage.getItem('fav')
  }
}
  
;output()
{  
  if(!this.Display_formula){return;}
  if(this.switchs=="switching!"){return;}
  if(this.Display_formula.endsWith('\+\-')||
  this.Display_formula.endsWith('\^')||
  this.Display_formula.endsWith('\÷')||
  this.Display_formula.endsWith('\×')||
  this.Display_formula.endsWith('\-')){return;}
  if(this.Display_formula.endsWith('\.')){return;}
  if(!this.keepview){return;}
  if(this.Display_formula.length + this.keepview.length >= 30){return;}
  else
  {
    this.Background_formula += this.keepview_background?.slice(1);
    ;this.Display_formula += this.keepview
  }
}
  
;reset()
{
  localStorage.removeItem('fav');localStorage.removeItem('fav2')
  ;this.keepview=localStorage.getItem('fav')
  this.keepview_background=localStorage.getItem('fav2')
};

//表示する式の値を保持する変数
// Display_formula:string='';

Display_formula_pre=localStorage.getItem('DFkeeper1')!;
Display_formula=this.Display_formula_pre;

//計算する式を保持する変数
Background_formula_pre=localStorage.getItem('BFkeeper2')!;
Background_formula=this.Background_formula_pre;

//計算結果を出力するための変数
Display_answer_pre=localStorage.getItem('DAkeeper3')!;
Display_answer=this.Display_answer_pre

//計算結果の誤差補正用の変数
result_pre=localStorage.getItem('REkeeper8')!;
result=this.result_pre

//計算結果の桁数調整用の変数
result2_pre=localStorage.getItem('RE2keeper')!;
result2=this.result_pre

//小数点カウンター用関数
syousuu_pre=localStorage.getItem('SYkeeper5')!;
syousuu=this.syousuu_pre
  
// syousuu2:string='';
syousuu2_pre=localStorage.getItem('SY2keeper6')!;
syousuu2=this.syousuu2_pre

zero1:string='';
zero2:string='';
//数字桁数counter
ketasuu:string='';

saidaiketasuu: number =10;
resetter()
{
  if(!this.Display_formula&&!this.Display_answer)
  {
    this.result2="";
    this.Display_formula ="";
    this.Background_formula ="";
    this.Display_answer ="";
    this.result ="";
    this.syousuu='';
    this.syousuu2='';
  }
};

//押下された数字/計算記号をディスプレイへと入力する関数
Formula(value:string)
{
  //let syousuusyori = ( this.Display_formula.match( /\./g ) || [] ).length
  if(this.switchs == "switching!" && !this.Display_formula){return;}

  if(this.Display_formula.length >= 30){return;}

  if(this.Display_formula.endsWith('\.00000000') && value == ('0') )
    {return;}

  if(this.Display_formula.length==1&&this.Display_formula.endsWith('0')){return;}

  if((this.Display_formula.endsWith('\×0'))||
  (this.Display_formula.endsWith('\÷0'))||
  (this.Display_formula.endsWith('\+0'))||
  (this.Display_formula.endsWith('\-0')))
  {return;}

  if(!isNaN(Number(this.Display_formula.slice(-1))))
  {
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

Formula00(value:string)
{  
  if(this.Display_formula.endsWith('\.0000000')){return;}  
  //let syousuusyori = ( this.Display_formula.match( /\./g ) || [] ).length  
  if(this.Display_formula.length >= 29){return;}

  if(this.Display_formula.length==1&&this.Display_formula.endsWith('0')){return;}
  
  if(this.Display_formula.endsWith('\×')||
  this.Display_formula.endsWith('\÷')||
  this.Display_formula.endsWith('\+')||
  this.Display_formula.endsWith('\-'))
  {return;}

  if(this.Display_formula.endsWith('\×0')||
  this.Display_formula.endsWith('\÷0')||
  this.Display_formula.endsWith('\+0')||
  this.Display_formula.endsWith('\-0'))
  {return;}

  if(!isNaN(Number(this.Display_formula.slice(-1))))
  {
    let kakuninnyou1 = this.Display_formula.lastIndexOf('+')
    kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('-'));
    kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('÷'));
    kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('×'));
    let kakuninnyou2 =this.Display_formula.replace("\.","").length - (kakuninnyou1 + 1);
     // if(kakuninnyou2.toString().includes('\.')){kakuninnyou2 = kakuninnyou2 -1}  
      if (kakuninnyou2 >= this.saidaiketasuu -1){return;}
  }

  this.Display_formula += value;
};

Formula000(value:string)
{  
  if(!this.Display_formula){return;}
  //let syousuusyori = ( this.Display_formula.match( /\./g ) || [] ).length
  if(this.Display_formula.length >= 28){return;}
  if(this.Display_formula.endsWith('\.000000')){return;}
  if(this.Display_formula.length==1&&this.Display_formula.endsWith('0')){return;}
  if(this.Display_formula.endsWith('\×')||
  this.Display_formula.endsWith('\÷')||
  this.Display_formula.endsWith('\+')||
  this.Display_formula.endsWith('\-'))
  {return;}

  if(this.Display_formula.endsWith('\×0')||
  this.Display_formula.endsWith('\÷0')||
  this.Display_formula.endsWith('\+0')||
  this.Display_formula.endsWith('\-0'))
  {return;}

  if(!isNaN(Number(this.Display_formula.slice(-1))))
  {
    let kakuninnyou1 = this.Display_formula.lastIndexOf('\+')
    kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('\-'));
    kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('\÷'));
    kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('\×'));
    let kakuninnyou2 =this.Display_formula.replace("\.","").length - (kakuninnyou1 + 1);

    if(kakuninnyou2.toString().includes('\.'))
    {kakuninnyou2 = kakuninnyou2 -1}

    if (kakuninnyou2 >= this.saidaiketasuu -2){return;}



  }
  this.Display_formula += value;
}
//実際に計算を行う式を保持するための関数
Formula_Background(value:string)
{
  if(this.switchs == "switching!" && !this.Display_formula){return;}
  if(this.Background_formula.length==1&&this.Background_formula.endsWith('0')){return;}
  //let syousuusyori = ( this.Background_formula.match( /\./g ) || [] ).length
  if(this.Background_formula.length  >= 30){return;}
  if(this.Background_formula.endsWith('\.00000000')&&value == ('0'))
  {return;}

  if((this.Background_formula.endsWith('\*0'))||
    (this.Background_formula.endsWith('\/0'))||
    (this.Background_formula.endsWith('\+0'))||
    (this.Background_formula.endsWith('\-0')))
  {return;}

  if(!isNaN(Number(this.Background_formula.slice(-1))))
  {
    let kakuninnyou1 = this.Background_formula.lastIndexOf('\+');
    kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\-'));
    kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\/'));
    kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\*'));
    let kakuninnyou2 =this.Background_formula.replace("\.","").length - (kakuninnyou1 + 1);
      
    if (kakuninnyou2 >= this.saidaiketasuu){return;}
    
  }
  this.Background_formula += value;
}
 
Formula_Background00(value:string)
{
  //let syousuusyori = ( this.Background_formula.match( /\./g ) || [] ).length
  if(this.Background_formula.length >= 29){return;}
  if(this.Background_formula.endsWith('\.0000000')){return;}

  if(!this.Background_formula){return;}
  if(this.Background_formula.length==1&&this.Background_formula.endsWith('0')){return;}  
  if(this.Background_formula.endsWith('\*')||
    this.Background_formula.endsWith('\/')||
    this.Background_formula.endsWith('\+')||
    this.Background_formula.endsWith('\-'))
  {return;}
  
  if
    (this.Background_formula.endsWith('\*0')||
    this.Background_formula.endsWith('\/0')||
    this.Background_formula.endsWith('\+0')||
    this.Background_formula.endsWith('\-0'))
  {return;}

  if(!isNaN(Number(this.Background_formula.slice(-1))))
    {
      let kakuninnyou1 = this.Background_formula.lastIndexOf('+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\/'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\*'));
      
      let kakuninnyou2 =this.Background_formula.replace("\.","").length - (kakuninnyou1 + 1);  
      if (kakuninnyou2 >= this.saidaiketasuu -1)
      {return;}
    }
  this.Background_formula += value;
};

Formula_Background000(value:string)
{
  if(this.Background_formula.endsWith('\.000000')){return;}
  if(!this.Background_formula){return;}
  //let syousuusyori = ( this.Background_formula.match( /\./g ) || [] ).length
  if(this.Background_formula.length >= 28){return;}
  if(this.Background_formula.length==1&&this.Background_formula.endsWith('0')){return;}
  if(this.Background_formula.endsWith('\*')||
    this.Background_formula.endsWith('\/')||
    this.Background_formula.endsWith('\+')||
    this.Background_formula.endsWith('\-'))
  {return;}

  if(this.Background_formula.endsWith('\/0')||
    this.Background_formula.endsWith('\*0')||
    this.Background_formula.endsWith('\+0')||
    this.Background_formula.endsWith('\-0'))
  {return;}

  if(!isNaN(Number(this.Background_formula.slice(-1))))
  {
    let kakuninnyou1 = this.Background_formula.lastIndexOf('\+')
    kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\-'));
    kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\/'));
    kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Background_formula.lastIndexOf('\*'));
    let kakuninnyou2 =this.Background_formula.replace("\.","").length - (kakuninnyou1 + 1);
      
    if (kakuninnyou2 >= this.saidaiketasuu -2){return;}
    if(this.Background_formula.replace("\.","").length>28){return;}
    
    
  }
  this.Background_formula += value;
};

//押下された数字/計算記号をディスプレイへと入力する関数
Formula2(value:string)
{
  if(this.switchs=="switching!"&&!this.Display_formula)
  {this.Display_formula += value;return;}
  //いきなりマイナス以外を押下すると何もしない
  if(!this.Display_formula&&value !='\-'){return;}
  if(this.Display_formula.length == 1&&this.Display_formula.endsWith('\-')){return;}
  if(this.Display_formula.length>28){return;}
  //マイナスの計算を可能にする
  if(this.Display_formula.endsWith('\+')&&value =='\-'||
    this.Display_formula.endsWith('\^')&&value =='\-'||
    this.Display_formula.endsWith('\÷')&&value =='\-'||
    this.Display_formula.endsWith('\×')&&value =='\-')
  {this.Display_formula += value
    this.syousuu='';
    this.syousuu2='';return}

  if(this.Display_formula.endsWith('\+\-')||
    this.Display_formula.endsWith('\^\-')||
    this.Display_formula.endsWith('\÷\-')||
    this.Display_formula.endsWith('\×\-')||
    this.Display_formula.endsWith('\-\-'))
  {
    this.Display_formula=this.Display_formula.slice(0,-2)
    ;this.Display_formula += value;
    this.syousuu='';
    this.syousuu2=''
  }

  //前が数字ではない
  if(this.Display_formula.endsWith('\.')){return;}  

  if(this.Display_formula.endsWith('\+')||
    this.Display_formula.endsWith('\÷')||
    this.Display_formula.endsWith('\×')||
    this.Display_formula.endsWith('\-'))
  {
    this.Display_formula=this.Display_formula.slice(0,-1)
    ;this.Display_formula += value;
    this.syousuu='';
    this.syousuu2=''
  }
  else
  {this.Display_formula += value
  this.syousuu='';
  this.syousuu2=''  
  ;return}
};

//実際に計算を行う式を保持するための関数
Formula_Background2(value:string)
{ 


  if(this.switchs=="switching!"&&!this.Background_formula)
    {this.Background_formula += value;return;}

  //いきなりマイナス以外を押下すると何もしない
  if(!this.Background_formula&&value !='\-'){return;}
  if(this.Background_formula.length == 1&&this.Background_formula.endsWith('\-')){return;}
  if(this.Background_formula.length>28){return;}
//マイナスの計算を可能にする
  if(this.Background_formula.endsWith('\+')&&value =='\-'||
    this.Background_formula.endsWith('\^')&&value =='\-'||
    this.Background_formula.endsWith('\/')&&value =='\-'||
    this.Background_formula.endsWith('\*')&&value =='\-')
  {
    this.Background_formula += value
    this.syousuu='';
    this.syousuu2=''
    ;return
  }

  if(this.Background_formula.endsWith('\+\-')||
    this.Background_formula.endsWith('\^\-')||
    this.Background_formula.endsWith('\/\-')||
    this.Background_formula.endsWith('\*\-')||
    this.Background_formula.endsWith('\-\-'))
  {
    this.Background_formula=this.Background_formula.slice(0,-2)
    ;this.Background_formula += value
    ;this.syousuu=''
    ;this.syousuu2=''
  }
  //前が数字ではない
  if(this.Background_formula.endsWith('\.')){return;}
  if(this.Background_formula.endsWith('\+')||
    this.Background_formula.endsWith('\/')||
    this.Background_formula.endsWith('\*')||
    this.Background_formula.endsWith('\-'))
  {
    this.Background_formula=this.Background_formula.slice(0,-1)
    ;this.Background_formula += value;
    this.syousuu='';
    this.syousuu2=''
  }
  else
  {
    this.Background_formula += value
    ;this.syousuu=''
    ;this.syousuu2=''
    ;return
  }
};

;Formula3(value:string)
{ 
  //空白の時小数点は記入しない
  if(!this.Display_formula){return;}
  if(this.Display_formula.length>=29){return;}

  if(!isNaN(Number(this.Display_formula.slice(-1))))
    {
      let kakuninnyou1 = this.Display_formula.lastIndexOf('+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('÷'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.Display_formula.lastIndexOf('×'));
      let kakuninnyou2 =this.Display_formula.length - (kakuninnyou1 + 1);
        
      if (kakuninnyou2   >= this.saidaiketasuu){return;}       
    }   
      
  if(this.Display_formula.endsWith('\×')||
    this.Display_formula.endsWith('\÷')||
    this.Display_formula.endsWith('\-')||
    this.Display_formula.endsWith('\+'))
  {return;}

  let tester10=(/\.[0-9]*$/);
  if(this.Display_formula.match(tester10)){;return;}

  let tester9=(/[\+|\-|\×|\÷][0-9]*$/);
  if(this.Display_formula.match(tester9))
    {
      this.Display_formula += value
      ;this.syousuu = 'checked!';return;}
      if(this.syousuu == 'checked!'){return;}
      else{this.Display_formula += value
      ;this.syousuu = 'checked!' ;

    }
};
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

  let tester10=(/\.[0-9]*$/);
  if(this.Background_formula.match(tester10)){;return;}

  let tester9=(/[\+|\-|\/|\*][0-9]*$/);
  if(this.Background_formula.match(tester9))
  {
    this.Background_formula += value;
    this.syousuu2 = 'checked!';return;
  }

  if(this.syousuu2 == 'checked!'){return;}
  else
  {
    this.Background_formula += value;
    this.syousuu2 = 'checked!';
  }
};

//入力文字数制限超えている場合にはエラーを返す関数
wordcount()
{  if(this.Display_formula.length>30){return;}};

kiroku:string=""

//=ボタンが押された際に直前までに入力された式を計算し、答えをディスプレイに出力する関数
calculate()
{
  //式記録モード時には起動しない
  if(this.switchs == "switching!"){return;}
  //式が入力されていないときにボタンが押下された際は何もしない
  if(!this.Display_formula){return;};
  //掛け算と割り算が連続する場合
  let tester1=(/\×\×|\÷\÷/)
  if(this.Display_formula.match(tester1))
  {this.Display_answer="Error!不正な式です!";return}
  //式が0で割られている場合
  let tester2=
  (/\/0\.0*[\+|\-|\*|\/]|\/0$|\/0.0*$|\/0.0*$|\/0[\+|\-|\*|\/]|\/\-0[\+|\-|\*|\/]|\/\-0\.0*[\+|\-|\*|\/]|\/\-0[\+|\-|\*|\/]|\/\-0$|\/\-0\.0*$/)
  if(this.Background_formula.match(tester2))
  {this.Display_answer="Error!0で割ることはできません";return}
 //式が計算記号で終了する場合
  let tester3=(/[\+|\-|\*|\/|\.]$/)
  if(this.Background_formula.match(tester3))
  {this.kiroku="error";return;}
  //小数点が二つ連続する場合
  let tester4=(/\.\./)
  if(this.Background_formula.match(tester4))
  {this.Display_answer="Error!不正な式です!";return}
  //小数点が二つ連続する場合
  let tester5=(/\.\./)
  if(this.Background_formula.match(tester5))
  {this.Display_answer="Error!不正な式です!";return}
  //小数点が二つある場合
  //小数点の前後に数字が来ないパターン/式が小数点で開始もしくは終了するパターン/一つの数字に小数点が二つ以上含まれるパターン
  let tester6=(/[\+|\-|\*|\/]\.|\.[\+|\-|\*|\/]|\.$|[0-9]*\.[0-9]*\.[0-9]*|^\./)
  if(this.Background_formula.match(tester6))
  {this.Display_answer="Error!";return}
  
 
  try
  {  
    //入力された式への処理を実行する
    let result=eval(this.Background_formula) 
    this.kiroku="reset";
    Number(result);
    if(result>=10000000000){this.Display_answer="Error!桁数制限";return;}
    if(result<=-10000000000){this.Display_answer="Error!桁数制限";return;}
    if(result<0.0000000005 && result > 0){this.Display_answer="Error!四捨五入すると0になります";return;}
    if(result>-0.0000000005 && result < 0){this.Display_answer="Error!四捨五入すると0になります";return;}
  

     //result2へ小数点以下の桁調整を行った数値を代入
       this.result2=result.toLocaleString(undefined,{ maximumFractionDigits:9,useGrouping: false});
      //式計算の結果をディスプレーに出力
      if(this.result2.replace("\.","").replace("\-","").length >= 10)
      {
        if(this.result2.match(/\./)&&this.result2.slice(0, 11).endsWith("\.")&&!this.result2.match(/\-/))
        {this.Display_answer=this.result2.slice(0, 10);return}

        if(this.result2.match(/\./)&&this.result2.slice(0, 12).endsWith("\.")&&this.result2.match(/\-/))
        {this.Display_answer=this.result2.slice(0, 11);return;}

        if(this.result2.match(/\./)&&this.result2.slice(0, 11).endsWith("\.")&&this.result2.match(/\-/))
        {this.Display_answer=this.result2.slice(0, 12);console.log("",this.Display_answer);return;}

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
    }
  
    //計算が成り立たない場合はエラーメッセージを出力
  catch(error){ this.kiroku="error";;this.Display_answer='Error!'}
};  

;clear()
{
  let tester7=(/[0-9]*\.[0-9]*[\+|\-|\*|\/][0-9]*\.$/)
  let tester8=(/\[0-9]*\.[0-9]*[\+|\-|\*|\/]\-[0-9]*\.$/)

  //もし表示式の末尾が"."の場合
  if(this.Display_formula.endsWith('.')
    &&(this.Display_formula.match(tester7)
    ||(this.Display_formula.match(tester8))))
  {
    this.Display_formula = this.Display_formula.slice(0, -1);
    this.Background_formula = this.Background_formula.slice(0, -1);
    return;
  }


  if (this.Display_formula.endsWith('.'))
  {
    this.Display_formula = this.Display_formula.slice(0, -1);
    this.Background_formula = this.Background_formula.slice(0, -1)
    this.syousuu="";
    this.syousuu2="";
    return;
  }
  else
  {
    this.Display_formula = this.Display_formula.slice(0, -1);
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
  this.syousuu='';
  this.syousuu2='';
  this.switchs='';
  localStorage.removeItem('switchholder');
  localStorage.removeItem('DFkeeper1');
  localStorage.removeItem('BFkeeper2');
  localStorage.removeItem('DAkeeper3');
  localStorage.removeItem('DAkeeper4');
  localStorage.removeItem('SYkeeper5');
  localStorage.removeItem('SY2keeper6');
  localStorage.removeItem('SYkeeper7');
  localStorage.removeItem('REkeeper8');
  localStorage.removeItem('RE2keeper9');
};

}





