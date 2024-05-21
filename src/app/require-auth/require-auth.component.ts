import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import {jsPDF} from 'jspdf';

import { Tutorial22 } from '../models/tutorial.model';
import { TutorialService } from '../services/tutorial.service';
import { getAuth, updateCurrentUser } from 'firebase/auth';
import { map } from 'rxjs';
import firebase from 'firebase/compat';


@Component({
  selector: 'app-require-auth',
  templateUrl: './require-auth.component.html',
  styleUrl: './require-auth.component.scss'
})




export class RequireAuthComponent {  

  tutorials?: Tutorial22[];

  currentTutorial: Tutorial22 = {};

  
  retrieveTutorials(): void {
    let auth = getAuth();
    let User = auth.currentUser;
 console.log(User?.displayName,"です2")
 if(!User){
  console.log(this.tutorialService.getAll().doc(),"を参照できませんでした")
  return;}
else{  
  this.tutorialService.getAll().doc(User.uid).snapshotChanges()
  .pipe(map(change => ({  id: change.payload.id,...change.payload.data() })))
  .subscribe((data:any) => {
    this.currentTutorial = data;

    console.log(data,"が現在の内容です");
    console.log(this.Display_formula,"が現在の内蔵式です");

    })};
  }





  Authcheck(): void {getAuth().onAuthStateChanged((currentUser) => {
    if (!currentUser) {
      return;
    } else { 

  this.retrieveTutorials();

}
  });  }  
  ngOnInit(): void {
    this.Authcheck();

    this.retrieveTutorials();

  }

add(){this.currentTutorial.Display_formula += "3"};

  ngOnChanges(): void {
    this.currentTutorial = { ...this.tutorial22 };
  }
;




  tutorial22: Tutorial22 = new Tutorial22();
  constructor(private tutorialService: TutorialService) {}

  updateTutorial(): void {

    let data:any = {
      result:this.currentTutorial.result,
      result2:this.currentTutorial.result2,
      Display_formula :this.currentTutorial.Display_formula ,
      Background_formula :this.currentTutorial.Background_formula ,
      Display_answer :this.currentTutorial.Display_answer ,
      syousuu:this.currentTutorial.syousuu,
      syousuu2:this.currentTutorial.syousuu2,
      switchs:this.currentTutorial.switchs,
      keepview:this.currentTutorial.keepview,
      keepview_background:this.currentTutorial.keepview_background,
      testtest:this.currentTutorial.testtest,
      testtesttest:this.currentTutorial.testtesttest,
    }
    if (this.currentTutorial) {
      for (const key in data) {
        if (data[key] == null) delete data[key];
      }
      this.tutorialService.update(data)
      .catch(err => console.log(err));
    }
  }

  testtest:string="";
  testtesttest:string="";
  testtest3=this.testtest;

  
  dt = new Date();
  y = this.dt.getFullYear();
  m = ("00" + (this.dt.getMonth()+1)).slice(-2);
  d = ("00" + (this.dt.getDate())).slice(-2);
  today = this.y  + this.m +  this.d + '_log.pdf';
     
  logging1()
  {
    if(this.currentTutorial.switchs=="switching!")
      {alert('式記録モードです！');return;}
    //式が入力されていない場合終了
    if(!this.currentTutorial.Display_formula){return;}
    //正しい式でない場合終了
    //kiroku変数はcalc関数実行時に式が正しくないと判断された場合フラグが立つ
    if(this.currentTutorial.kiroku=="error"){return;}
    //下記の5行を追加 同じ式をに連続で記録しようとした際にアラート
    let cutter = (this.currentTutorial.Display_formula + "=" + this.currentTutorial.Display_answer + "\n");
    if(this.currentTutorial.testtest == cutter)
      {alert('直前の入力と同じ式です');return;}
    if(!(!this.currentTutorial.testtest)&&cutter 
    == (this.currentTutorial.testtest.slice(-(cutter.length))))
    {alert('直前の入力と同じ式です');return;}
    if(!this.currentTutorial.Display_answer)       
      {return;} 
    if(this.currentTutorial.Display_answer.match(/Error/))
    {return;} 
    //既定の行数以上の履歴がある場合、アラートを出し、記録を行わない
  
    if(!this.currentTutorial.testtest){
      this.currentTutorial.testtest = 
      (this.currentTutorial.Display_formula + "=" + this.currentTutorial.Display_answer + "\n");  
    }


    if(!this.currentTutorial.testtesttest){
      this.currentTutorial.testtest = 
      (this.currentTutorial.Display_formula + "=" + this.currentTutorial.Display_answer + "\n"); 
      this.currentTutorial.testtesttest = this.currentTutorial.testtest ;return;
    }



    if(this.currentTutorial.testtest !== null 
      &&(((this.currentTutorial.testtesttest.match(/\n/g) || []).length + 1) > 50))
      {alert('記録可能上限です！');return;}     
  
    else
      {
      this.currentTutorial.testtest = (this.currentTutorial.Display_formula + "=" + this.currentTutorial.Display_answer + "\n");
      if(!this.currentTutorial.testtesttest)
        {this.currentTutorial.testtesttest = 
          this.currentTutorial.testtest}
      else{
      this.currentTutorial.testtesttest = (this.currentTutorial.testtesttest += this.currentTutorial.testtest);
    }}
  };
  
  logging2()
  {
    if(this.kiroku=="error"){return;}  
    // if(!this.testtest3){return;}
    // else{}
    // localStorage.setItem('logger',(this.testtest3))
  };
       
       
  logging3()
  {
    this.currentTutorial.testtest='';
    this.currentTutorial.testtesttest=''!;
  };
  
  public convetToPDF()
  {
    if(!this.currentTutorial.testtesttest){return;}
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.setFontSize(13);
    pdf.text( this.currentTutorial.testtesttest , 20, 20);
    pdf.save( this.today );
  };
  
  //すべての変数の中身をローカルストレージに送る
  // keep2(){ localStorage.clear();};
  // keep()
  // {
  //   if(this.Display_formula.match(/null/))
  //   {
  //     this.Display_formula=this.Display_formula.slice(-1);
  //     this.Background_formula=this.Background_formula.slice(-1);
  //   }
  //   localStorage.setItem('DFkeeper1',this.Display_formula
  //   ?.replaceAll("null",""))
  
  //   ;localStorage.setItem('BFkeeper2',this.Background_formula
  //   ?.replaceAll("null",""))
  
  //   ;localStorage.setItem('DAkeeper3',
  //   this.currentTutorial.Display_answer?.replaceAll("null",""))
  //   // ;localStorage.setItem('DAkeeper4',
  //   // this.currentTutorial.Display_answer?.replaceAll("null",""))
  //   ;localStorage.setItem('SYkeeper5',this.syousuu?.replaceAll("null",""))
  //   ;localStorage.setItem('SY2keeper6',this.syousuu2?.replaceAll("null",""))
  //   ;localStorage.setItem('SYkeeper7',this.syousuu?.replaceAll("null",""))
  //   ;localStorage.setItem('REkeeper8',this.result?.replaceAll("null",""))
  //   ;localStorage.setItem('RE2keeper9',this.result2?.replaceAll("null",""))
  // };
  
  switchs:string="";

  keepview:string=""; 
  keepview_background:string="";
  
  switcher()  
  {
    if(!this.currentTutorial.Display_formula&&this.currentTutorial.switchs=="switching!")
    {
      this.currentTutorial.switchs="";
      this.currentTutorial.Display_answer="";
      this.currentTutorial.Background_formula="";
      return;
    }
  
    if(!this.currentTutorial.Display_formula&&!this.currentTutorial.switchs)
      {
        this.currentTutorial.switchs="switching!";
        this.currentTutorial.Display_answer="式記録モードです";
        this.currentTutorial.Background_formula="\ "; 
        return;          
      }  
      if(!this.currentTutorial.switchs)
{alert("計算機をリセット後にモード切替をしてください");return;}
  };
  
  ;favkeep()
  {
    if(!this.currentTutorial.Background_formula){return;}
    if(!this.currentTutorial.switchs){alert("式保存モードにしてください");return;}
    if(!this.currentTutorial.Background_formula&&this.currentTutorial.switchs=="switching!")
    {alert("値が入力されていません！！！  ");return;}    
    if(this.currentTutorial.Background_formula.endsWith("\.")&&this.currentTutorial.switchs=="switching!")
      {alert("小数点での終了！！！");return;}
    
    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length > 29&&this.currentTutorial.switchs=="switching!")
      {alert("文字数が多すぎます");return;}

    if(this.currentTutorial.switchs=="switching!"
    &&!this.currentTutorial.Background_formula)
  {this.currentTutorial.Background_formula="\ ";}
    if(this.currentTutorial.switchs=="switching!")
    {
      this.currentTutorial.switchs="switching!";
      this.currentTutorial.Display_answer="式記録モードです";
  
      this.currentTutorial.switchs="switching!";  

      this.currentTutorial.keepview_background=this.currentTutorial.Background_formula
      this.currentTutorial.keepview=this.currentTutorial.Display_formula
    };
  }
    
  ;output()
  {
    if(!this.currentTutorial.Background_formula){return;}  
    if(!this.currentTutorial.Display_formula){return;}
    if(this.currentTutorial.switchs=="switching!"){return;}
    if(!this.currentTutorial.keepview){return;}
        if(this.currentTutorial.Display_formula.endsWith('\+')||
    this.currentTutorial.Display_formula.endsWith('\^')||
    this.currentTutorial.Display_formula.endsWith('\÷')||
    this.currentTutorial.Display_formula.endsWith('\×')||
    this.currentTutorial.Display_formula.endsWith('\-')){
      if(this.currentTutorial.keepview.startsWith('\-')){}
      else{return;}}
    if(this.currentTutorial.Display_formula.endsWith('\.')){return;}


    
    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length + this.currentTutorial.keepview.replaceAll("\ ","").length > 30){return;}
    else
    {
      this.currentTutorial.Background_formula += this.currentTutorial.keepview_background?.slice(1);
      ;this.currentTutorial.Display_formula += this.currentTutorial.keepview
      }

  }
    
  ;reset()
  {
  
    ;this.currentTutorial.keepview=""
    this.currentTutorial.keepview_background=""
};

  //表示する式の値を保持する変数  
  Display_formula:string='';
  //計算する式を保持する変数
  Background_formula:string='';
  //計算結果を出力するための変数
  Display_answer:string='';
  //計算結果の誤差補正用の変数
  result_pre:string='';
  result:string=' ';
  
  //計算結果の桁数調整用の変数
 
  result2:string='';
  
  //小数点カウンター用関数

  syousuu:string='';    
  syousuu2:string='';
  
  zero1:string='';
  zero2:string='';
  //数字桁数counter
  ketasuu:string='';
  
  saidaiketasuu: number =10;
  resetter()
  {
    if(!this.currentTutorial.Display_formula&&!this.currentTutorial.Display_answer)
    {
      this.currentTutorial.result2="";
      this.currentTutorial.Display_formula ="";
      this.currentTutorial.Background_formula ="";
      this.currentTutorial.Display_answer ="";
      this.currentTutorial.result ="";
      this.currentTutorial.syousuu='';
      this.currentTutorial.syousuu2='';
    }
  };
  
  //押下された数字/計算記号をディスプレイへと入力する関数
  Formula(value:string)
  {
    //let syousuusyori = ( this.Display_formula.match( /\./g ) || [] ).length
    if(this.currentTutorial.switchs == "switching!" && !this.currentTutorial.Display_formula){return;}
  
    if(!this.currentTutorial.Display_formula)
      {this.currentTutorial.Display_formula += value; return}

    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length >= 30){return;}
  
    if(this.currentTutorial.Display_formula.endsWith('\.00000000') && value == ('0') )
      {return;}
  
    if(this.currentTutorial.Display_formula.length==1&&this.currentTutorial.Display_formula.endsWith('0'))
      {return;}
    
    if((this.currentTutorial.Display_formula.endsWith('\×0'))||
    (this.currentTutorial.Display_formula.endsWith('\÷0'))||
    (this.currentTutorial.Display_formula.endsWith('\+0'))||
    (this.currentTutorial.Display_formula.endsWith('\-0')))
    {return;}
  
    if(!isNaN(Number(this.currentTutorial.Display_formula.slice(-1))))
    {
      let kakuninnyou1 = this.currentTutorial.Display_formula.lastIndexOf('+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('÷'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('×'));
      let kakuninnyou2 =this.currentTutorial.Display_formula.replace("\.","").length - (kakuninnyou1+1);
  
      
      if (kakuninnyou2   >= this.saidaiketasuu)
      {return;}
    }
    {this.currentTutorial.Display_formula += value; return}
  }
  
  Formula00(value:string)
  {  
if(!this.currentTutorial.Display_formula){!this.currentTutorial.Display_formula ;return}

    if(this.currentTutorial.Display_formula.endsWith('\.0000000')){return;}  

    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length >= 29){return;}
  
    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length==1&&this.currentTutorial.Display_formula.endsWith('0')){return;}
    
    if(this.currentTutorial.Display_formula.endsWith('\×')||
    this.currentTutorial.Display_formula.endsWith('\÷')||
    this.currentTutorial.Display_formula.endsWith('\+')||
    this.currentTutorial.Display_formula.endsWith('\-'))
    {return;}
  
    if(this.currentTutorial.Display_formula.endsWith('\×0')||
    this.currentTutorial.Display_formula.endsWith('\÷0')||
    this.currentTutorial.Display_formula.endsWith('\+0')||
    this.currentTutorial.Display_formula.endsWith('\-0'))
    {return;}
  
    if(!isNaN(Number(this.currentTutorial.Display_formula.slice(-1))))
    {
      let kakuninnyou1 = this.currentTutorial.Display_formula.lastIndexOf('+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('÷'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('×'));
      let kakuninnyou2 =this.currentTutorial.Display_formula.replace("\.","").length - (kakuninnyou1 + 1);

        if (kakuninnyou2 >= this.saidaiketasuu -1){return;}
    }
  
    this.currentTutorial.Display_formula += value;
  };
  
  Formula000(value:string)
  {  
    if(!this.currentTutorial.Display_formula){return;}

    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length >= 28){return;}
    if(this.currentTutorial.Display_formula.endsWith('\.000000')){return;}
    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length==1&&this.currentTutorial.Display_formula.endsWith('0')){return;}
    if(this.currentTutorial.Display_formula.endsWith('\×')||
    this.currentTutorial.Display_formula.endsWith('\÷')||
    this.currentTutorial.Display_formula.endsWith('\+')||
    this.currentTutorial.Display_formula.endsWith('\-'))
    {return;}
  
    if(this.currentTutorial.Display_formula.endsWith('\×0')||
    this.currentTutorial.Display_formula.endsWith('\÷0')||
    this.currentTutorial.Display_formula.endsWith('\+0')||
    this.currentTutorial.Display_formula.endsWith('\-0'))
    {return;}
  
    if(!isNaN(Number(this.currentTutorial.Display_formula.slice(-1))))
    {
      let kakuninnyou1 = this.currentTutorial.Display_formula.lastIndexOf('\+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('\-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('\÷'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('\×'));
      let kakuninnyou2 =this.currentTutorial.Display_formula.replace("\.","").length - (kakuninnyou1 + 1);
  
      if(kakuninnyou2.toString().includes('\.'))
      {kakuninnyou2 = kakuninnyou2 -1}
  
      if (kakuninnyou2 >= this.saidaiketasuu -2){return;}  
    }
    this.currentTutorial.Display_formula += value;
  }
  //実際に計算を行う式を保持するための関数
  Formula_Background(value:string)
  {

    if(this.currentTutorial.switchs == "switching!" && !this.currentTutorial.Display_formula){return;}
    if(this.currentTutorial.switchs == "switching!" && this.currentTutorial.Display_formula =="\ "){return;}
    if(!this.currentTutorial.Background_formula)
      {this.currentTutorial.Background_formula += value ;return}
    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length==1&&this.currentTutorial.Background_formula.endsWith('0')){return;}
    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length  >= 30){return;}
    if(this.currentTutorial.Background_formula.endsWith('\.00000000')&&value == ('0'))
    {return;}
  
    if((this.currentTutorial.Background_formula.endsWith('\*0'))||
      (this.currentTutorial.Background_formula.endsWith('\/0'))||
      (this.currentTutorial.Background_formula.endsWith('\+0'))||
      (this.currentTutorial.Background_formula.endsWith('\-0')))
    {return;}
  
    if(!isNaN(Number(this.currentTutorial.Background_formula.slice(-1))))
    {
      let kakuninnyou1 = this.currentTutorial.Background_formula.lastIndexOf('\+');
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\/'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\*'));
      let kakuninnyou2 =this.currentTutorial.Background_formula.replace("\.","").length - (kakuninnyou1 + 1);
        
      if (kakuninnyou2 >= this.saidaiketasuu){return;}
      
    }
    this.currentTutorial.Background_formula += value;
  }
   
  Formula_Background00(value:string)
  {
    if(!this.currentTutorial.Background_formula){return;}
   
    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length >= 29){return;}
    if(this.currentTutorial.Background_formula.endsWith('\.0000000')){return;}
  

    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length==1
      &&this.currentTutorial.Background_formula.endsWith('0')){return;}  
    if(this.currentTutorial.Background_formula.endsWith('\*')||
      this.currentTutorial.Background_formula.endsWith('\/')||
      this.currentTutorial.Background_formula.endsWith('\+')||
      this.currentTutorial.Background_formula.endsWith('\-'))
    {return;}
    
    if
      (this.currentTutorial.Background_formula.endsWith('\*0')||
      this.currentTutorial.Background_formula.endsWith('\/0')||
      this.currentTutorial.Background_formula.endsWith('\+0')||
      this.currentTutorial.Background_formula.endsWith('\-0'))
    {return;}
  
    if(!isNaN(Number(this.currentTutorial.Background_formula.slice(-1))))
      {
        let kakuninnyou1 = this.currentTutorial.Background_formula.lastIndexOf('+')
        kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\-'));
        kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\/'));
        kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\*'));
        
        let kakuninnyou2 =this.currentTutorial.Background_formula.replace("\.","").length 
        - (kakuninnyou1 + 1);  
        if (kakuninnyou2 >= this.saidaiketasuu -1)
        {return;}
      }
    this.currentTutorial.Background_formula += value;
  };
  
  Formula_Background000(value:string)
  {
    if(!this.currentTutorial.Background_formula){return;}
    if(this.currentTutorial.Background_formula.endsWith('\.000000')){return;}
    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length >= 28){return;}
    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length==1&&this.currentTutorial.Background_formula.endsWith('0')){return;}
    if(this.currentTutorial.Background_formula.endsWith('\*')||
      this.currentTutorial.Background_formula.endsWith('\/')||
      this.currentTutorial.Background_formula.endsWith('\+')||
      this.currentTutorial.Background_formula.endsWith('\-'))
    {return;}
  
    if(this.currentTutorial.Background_formula.endsWith('\/0')||
      this.currentTutorial.Background_formula.endsWith('\*0')||
      this.currentTutorial.Background_formula.endsWith('\+0')||
      this.currentTutorial.Background_formula.endsWith('\-0'))
    {return;}
  
    if(!isNaN(Number(this.currentTutorial.Background_formula.slice(-1))))
    {
      let kakuninnyou1 = this.currentTutorial.Background_formula.lastIndexOf('\+')
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\-'));
      kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\/'));
      kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Background_formula.lastIndexOf('\*'));
      let kakuninnyou2 =this.currentTutorial.Background_formula.replace("\.","").length - (kakuninnyou1 + 1);
        
      if (kakuninnyou2 >= this.saidaiketasuu -2){return;}
      if(this.currentTutorial.Background_formula.replace("\.","").length>28){return;}
      
      
    }
    this.currentTutorial.Background_formula += value;
  };
  
  //押下された数字/計算記号をディスプレイへと入力する関数
  Formula2(value:string)
  {
    if(this.currentTutorial.switchs=="switching!"&&!this.currentTutorial.Display_formula)
    {this.currentTutorial.Display_formula += value;return;}
    //いきなりマイナス以外を押下すると何もしない



    if(!this.currentTutorial.Display_formula&&value == '\-')
      {this.currentTutorial.Display_formula += value
      this.currentTutorial.syousuu='';
      this.currentTutorial.syousuu2='';return}
      if(!this.currentTutorial.Display_formula){;return;} 

    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length == 1&&
        this.currentTutorial.Display_formula.endsWith('\-')&&!this.currentTutorial.switchs){;return;}
    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length>28){;console.log("5");return;}
    //マイナスの計算を可能にする
    if(this.currentTutorial.Display_formula.endsWith('\+')&&value =='\-'||
      this.currentTutorial.Display_formula.endsWith('\^')&&value =='\-'||
      this.currentTutorial.Display_formula.endsWith('\÷')&&value =='\-'||
      this.currentTutorial.Display_formula.endsWith('\×')&&value =='\-')
    {this.currentTutorial.Display_formula += value
      this.currentTutorial.syousuu='';
      this.currentTutorial.syousuu2='';return}
  
    if(this.currentTutorial.Display_formula.endsWith('\+\-')||
      this.currentTutorial.Display_formula.endsWith('\^\-')||
      this.currentTutorial.Display_formula.endsWith('\÷\-')||
      this.currentTutorial.Display_formula.endsWith('\×\-')||
      this.currentTutorial.Display_formula.endsWith('\-\-'))
    {
      this.currentTutorial.Display_formula=this.currentTutorial.Display_formula.slice(0,-2)
      ;this.currentTutorial.Display_formula += value;
      this.currentTutorial.syousuu='';
      this.currentTutorial.syousuu2=''
    }
  
    //前が数字ではない
    if(this.currentTutorial.Display_formula.endsWith('\.')){return;}  
  
    if(this.currentTutorial.Display_formula.endsWith('\+')||
      this.currentTutorial.Display_formula.endsWith('\÷')||
      this.currentTutorial.Display_formula.endsWith('\×')||
      this.currentTutorial.Display_formula.endsWith('\-'))
    {
      this.currentTutorial.Display_formula=this.currentTutorial.Display_formula.slice(0,-1)
      ;this.currentTutorial.Display_formula += value;
      this.currentTutorial.syousuu='';
      this.currentTutorial.syousuu2=''
    }
    else
    {this.currentTutorial.Display_formula += value
    this.currentTutorial.syousuu='';
    this.currentTutorial.syousuu2=''  
    ;return}
  };
  
  //実際に計算を行う式を保持するための関数
  Formula_Background2(value:string)
  { 
  
  
    if(this.currentTutorial.switchs=="switching!"&&!this.currentTutorial.Background_formula)
      {this.currentTutorial.Background_formula += value;return;}
  
    //いきなりマイナス以外を押下すると何もしない
    if(!this.currentTutorial.Background_formula&&value == '\-')
    {this.currentTutorial.Background_formula += value
      ;this.currentTutorial.syousuu=''
      ;this.currentTutorial.syousuu2=''
      ;return
    }
    if(!this.currentTutorial.Background_formula){return;}

    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length == 1&&
      this.currentTutorial.Background_formula.endsWith('\-')){return;}
    if(this.currentTutorial.Background_formula.replaceAll("\ ","").length>28){return;}
  //マイナスの計算を可能にする
    if(this.currentTutorial.Background_formula.endsWith('\+')&&value =='\-'||
      this.currentTutorial.Background_formula.endsWith('\^')&&value =='\-'||
      this.currentTutorial.Background_formula.endsWith('\/')&&value =='\-'||
      this.currentTutorial.Background_formula.endsWith('\*')&&value =='\-')
    {
      this.currentTutorial.Background_formula += value
      this.currentTutorial.syousuu='';
      this.currentTutorial.syousuu2=''
      ;return
    }
  
    if(this.currentTutorial.Background_formula.endsWith('\+\-')||
      this.currentTutorial.Background_formula.endsWith('\^\-')||
      this.currentTutorial.Background_formula.endsWith('\/\-')||
      this.currentTutorial.Background_formula.endsWith('\*\-')||
      this.currentTutorial.Background_formula.endsWith('\-\-'))
    {
      this.currentTutorial.Background_formula=this.currentTutorial.Background_formula.slice(0,-2)
      ;this.currentTutorial.Background_formula += value
      ;this.currentTutorial.syousuu=''
      ;this.currentTutorial.syousuu2=''
    }
    //前が数字ではない
    if(this.currentTutorial.Background_formula.endsWith('\.')){return;}
    if(this.currentTutorial.Background_formula.endsWith('\+')||
      this.currentTutorial.Background_formula.endsWith('\/')||
      this.currentTutorial.Background_formula.endsWith('\*')||
      this.currentTutorial.Background_formula.endsWith('\-'))
    {
      this.currentTutorial.Background_formula
      =this.currentTutorial.Background_formula.slice(0,-1)
      ;this.currentTutorial.Background_formula += value;
      this.currentTutorial.syousuu='';
      this.currentTutorial.syousuu2=''
    }
    else
    {
      this.currentTutorial.Background_formula += value
      ;this.currentTutorial.syousuu=''
      ;this.currentTutorial.syousuu2=''
      ;return
    }
  };
  
  ;Formula3(value:string)
  { 
    //空白の時小数点は記入しない
    if(!this.currentTutorial.Display_formula){return;}
    if(this.currentTutorial.Display_formula.replaceAll("\ ","").length>=29){return;}
  
    if(!isNaN(Number(this.currentTutorial.Display_formula.slice(-1))))
      {
        let kakuninnyou1 = this.currentTutorial.Display_formula.lastIndexOf('+')
        kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('-'));
        kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('÷'));
        kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1, this.currentTutorial.Display_formula.lastIndexOf('×'));
        let kakuninnyou2 =this.currentTutorial.Display_formula.replaceAll("\ ","").length - (kakuninnyou1 + 1);
          
        if (kakuninnyou2   >= this.saidaiketasuu){return;}       
      }   
        
    if(this.currentTutorial.Display_formula.endsWith('\×')||
      this.currentTutorial.Display_formula.endsWith('\÷')||
      this.currentTutorial.Display_formula.endsWith('\-')||
      this.currentTutorial.Display_formula.endsWith('\+'))
    {return;}
  
    let tester10=(/\.[0-9]*$/);
    if(this.currentTutorial.Display_formula.match(tester10)){;return;}
  
    let tester9=(/[\+|\-|\×|\÷][0-9]*$/);
    if(this.currentTutorial.Display_formula.match(tester9))
      {
        this.currentTutorial.Display_formula += value
        ;this.currentTutorial.syousuu = 'checked!';return;}
        if(this.currentTutorial.syousuu == 'checked!'){return;}
        else{this.currentTutorial.Display_formula += value
        ;this.currentTutorial.syousuu = 'checked!' ;
  
      }
  };
  ;Formula_Background3(value:string)
    { 
      //空白の時小数点は記入しない

      if(this.currentTutorial.Background_formula=="\n"){return;}      
      if(!this.currentTutorial.Background_formula){return;}
      if(this.currentTutorial.Background_formula.replaceAll("\ ","").length>=29){return;}
      
      if(!isNaN(Number(this.currentTutorial.Background_formula.slice(-1)))){
        let kakuninnyou1 = this.currentTutorial.Background_formula.lastIndexOf('\+')
        kakuninnyou1 = Math.max(kakuninnyou1, 
        this.currentTutorial.Background_formula.lastIndexOf('\-'));
        kakuninnyou1 = Math.max(kakuninnyou1,
        this.currentTutorial.Background_formula.lastIndexOf('\/'));
        kakuninnyou1 = kakuninnyou1 = Math.max(kakuninnyou1,
        this.currentTutorial.Background_formula.lastIndexOf('\*'));
        let kakuninnyou2 =this.currentTutorial.Background_formula.replaceAll("\ ","").length - (kakuninnyou1 + 1);
          
        if (kakuninnyou2  >= this.saidaiketasuu)
          {return;}         
      }   
  
    if(this.currentTutorial.Background_formula.endsWith('\*')||
      this.currentTutorial.Background_formula.endsWith('\/')||
      this.currentTutorial.Background_formula.endsWith('\-')||
      this.currentTutorial.Background_formula.endsWith('\+'))
    {return;}
  
    let tester10=(/\.[0-9]*$/);
    if(this.currentTutorial.Background_formula.match(tester10)){;return;}
  
    let tester9=(/[\+|\-|\/|\*][0-9]*$/);
    if(this.currentTutorial.Background_formula.match(tester9))
    {
      this.currentTutorial.Background_formula += value;
      this.currentTutorial.syousuu2 = 'checked!';return;
    }
  
    if(this.currentTutorial.syousuu2 == 'checked!'){return;}
    else
    {
      this.currentTutorial.Background_formula += value;
      this.currentTutorial.syousuu2 = 'checked!';
    }
  };
  
  //入力文字数制限超えている場合にはエラーを返す関数
  wordcount()
  { if(!this.currentTutorial.Display_formula){return;}
     if(this.currentTutorial.Display_formula.length>30){return;}
  };
  
  kiroku:string=""
  
  //=ボタンが押された際に直前までに入力された式を計算し、答えをディスプレイに出力する関数
  calculate()
  {
    //式記録モード時には起動しない
    if(this.currentTutorial.switchs == "switching!"){return;}
    //式が入力されていないときにボタンが押下された際は何もしない
    if(!this.currentTutorial.Display_formula){return;};
    if(!this.currentTutorial.Background_formula){return;};
    //掛け算と割り算が連続する場合
    let tester1=(/\×\×|\÷\÷/)
    if(this.currentTutorial.Display_formula.match(tester1))
    {this.currentTutorial.Display_answer="Error!不正な式です!";return}
    //式が0で割られている場合
    let tester2=
    (/\/0\.0*[\+|\-|\*|\/]|\/0$|\/0.0*$|\/0.0*$|\/0[\+|\-|\*|\/]|\/\-0[\+|\-|\*|\/]|\/\-0\.0*[\+|\-|\*|\/]|\/\-0[\+|\-|\*|\/]|\/\-0$|\/\-0\.0*$/)
    if(this.currentTutorial.Background_formula.match(tester2))
    {this.currentTutorial.Display_answer="Error!0で割ることはできません";return}
   //式が計算記号で終了する場合
    let tester3=(/[\+|\-|\*|\/|\.]$/)
    if(this.currentTutorial.Background_formula.match(tester3))
    {this.currentTutorial.kiroku="error";return;}
    //小数点が二つ連続する場合
    let tester4=(/\.\./)
    if(this.currentTutorial.Background_formula.match(tester4))
    {this.currentTutorial.Display_answer="Error!不正な式です!";this.currentTutorial.kiroku="error";
    return}
    //小数点が二つ連続する場合
    let tester5=(/\.\./)
    if(this.currentTutorial.Background_formula.match(tester5))
    {this.currentTutorial.Display_answer="Error!不正な式です!";this.currentTutorial.kiroku="error";
    return}
    //小数点が二つある場合
    //小数点の前後に数字が来ないパターン/式が小数点で開始もしくは終了するパターン/一つの数字に小数点が二つ以上含まれるパターン
    let tester6=(/[\+|\-|\*|\/]\.|\.[\+|\-|\*|\/]|\.$|[0-9]*\.[0-9]*\.[0-9]*|^\./)
    if(this.currentTutorial.Background_formula.match(tester6))
    {this.currentTutorial.Display_answer="Error!";
    this.currentTutorial.kiroku="error";return}
    
   
    try
    {  
      //入力された式への処理を実行する
      let result=eval(this.currentTutorial.Background_formula) 
      this.currentTutorial.kiroku="reset";
      Number(result);
      if(result>=10000000000){this.currentTutorial.Display_answer="Error!桁数制限";return;}
      if(result<=-10000000000){this.currentTutorial.Display_answer="Error!桁数制限";return;}
    //   if(result<0.0000000005 && result > 0){this.currentTutorial.Display_answer="Error!四捨五入すると0になります";return;}
    //   if(result>-0.0000000005 && result < 0){this.currentTutorial.Display_answer="Error!四捨五入すると0になります";return;}
    
  
       //result2へ小数点以下の桁調整を行った数値を代入
         this.result2=result.toLocaleString(undefined,{ maximumFractionDigits:9,useGrouping: false});
        //式計算の結果をディスプレーに出力
        if(this.result2.replace("\.","").replace("\-","").length >= 10)
        {
          if(this.result2.match(/\./)&&this.result2.slice(0, 11).endsWith("\.")
            &&!this.result2.match(/\-/))
          {this.currentTutorial.Display_answer=this.result2.slice(0, 10);return}
  
          if(this.result2.match(/\./)&&this.result2.slice(0, 12).endsWith("\.")
            &&this.result2.match(/\-/))
          {this.currentTutorial.Display_answer=this.result2.slice(0, 11);return;}
  
          if(this.result2.match(/\./)&&this.result2.slice(0, 11).endsWith("\.")&&this.result2.match(/\-/))
          {this.currentTutorial.Display_answer=this.result2.slice(0, 12);console.log("",this.currentTutorial.Display_answer);return;}
  
          if(this.result2.match(/\./)&&this.result2.slice(0, 10).endsWith("\.")&&!this.result2.match(/\-/))
          {this.currentTutorial.Display_answer=this.result2.slice(0, 11);return}  
        
          if(this.result2.match(/\./)&&this.result2.match(/\-/))
          {this.currentTutorial.Display_answer=this.result2.slice(0,12);return}  
    
  
          if(!this.result2.match(/\./)&&this.result2.match(/\-/))
          {this.currentTutorial.Display_answer=this.result2.slice(0, 11);return;}
  
  
          if(this.result2.match(/\./))
          {this.currentTutorial.Display_answer=this.result2.slice(0,11);return}      
          else{this.currentTutorial.Display_answer=this.result2.slice(0, 10);return;}
        }
        else 
        {this.currentTutorial.Display_answer=this.result2;}
      }
    
      //計算が成り立たない場合はエラーメッセージを出力
    catch(error){ this.currentTutorial.kiroku="error";;this.currentTutorial.Display_answer='Error!'}
  };  
  
  ;clear()
  {
    let tester7=(/[0-9]*\.[0-9]*[\+|\-|\*|\/][0-9]*\.$/)
    let tester8=(/\[0-9]*\.[0-9]*[\+|\-|\*|\/]\-[0-9]*\.$/)
    if (!this.currentTutorial.Display_formula){return;}  
    if (!this.currentTutorial.Background_formula){return;}
    //もし表示式の末尾が"."の場合
    if(this.currentTutorial.Display_formula.endsWith('.')
      &&(this.currentTutorial.Display_formula.match(tester7)
      ||(this.currentTutorial.Display_formula.match(tester8))))
    {
      this.currentTutorial.Display_formula = this.currentTutorial.Display_formula.slice(0, -1);
      this.currentTutorial.Background_formula = this.currentTutorial.Background_formula.slice(0, -1);
      return;
    }
  
  
    if (this.currentTutorial.Display_formula.endsWith('.'))
    {
      this.currentTutorial.Display_formula = this.currentTutorial.Display_formula.slice(0, -1);
      this.currentTutorial.Background_formula = this.currentTutorial.Background_formula.slice(0, -1)
      this.currentTutorial.syousuu="";
      this.currentTutorial.syousuu2="";
      return;
    }
    else
    {
      this.currentTutorial.Display_formula = this.currentTutorial.Display_formula.slice(0, -1);
      this.currentTutorial.Background_formula = this.currentTutorial.Background_formula.slice(0, -1)
    };
  }
  //電卓を初期状態に戻すための関数
  ;allclear():  void {
    this.currentTutorial.result2="";
    this.currentTutorial.Display_formula ="";
    this.currentTutorial.Background_formula ="";
    this.currentTutorial.Display_answer ="";
    this.currentTutorial.result ="";
    this.currentTutorial.syousuu='';
    this.currentTutorial.syousuu2='';
    this.currentTutorial.switchs='';
  };  
  
  
}