import { Component } from '@angular/core';
import { TutorialService } from '../services/tutorial.service';
import { map } from 'rxjs';
import {getDoc } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrl: './genre-create.component.scss'
})
export class GenreCreateComponent {
genre="";
tag1="";
tag2="";
tag3="";
tag4="";
tag5="";
constructor(private TutorialService:TutorialService,){}
validateTagName0() {
   if (/[/,:.;]/.test(this.genre)) {
    alert("使用不可能な文字が含まれています");
    this.genre = this.genre.replaceAll(/[/,:.;]/g,'');
    
  }
}

validateTagName1() {
  if (/[/:.,;]/.test(this.tag1)) {
    alert("使用不可能な文字が含まれています");
    this.tag1 = this.tag1.replace(/[,/:.;]/g, '');
  }
}

validateTagName2() {
  if (/[/:,.;]/.test(this.tag2)) {
    alert("使用不可能な文字が含まれています");
    this.tag2 = this.tag2.replace(/[,/:.;]/g, '');
  }
}
validateTagName3() {
  if (/[/,:.;]/.test(this.tag3)) {
    alert("使用不可能な文字が含まれています");
    this.tag3 = this.tag3.replace(/[,/:.;]/g, '');
  }
}

validateTagName4() {
  if (/[,/:.;]/.test(this.tag4)) {
    alert("使用不可能な文字が含まれています");
    this.tag4 = this.tag4.replace(/[,/:.;]/g, '');
  }
}
fullWidthRegex = /[０-９Ａ-Ｚａ-ｚ]/;;

isHalfWidthOnly(text: any) {
  return !this.fullWidthRegex.test(text);
}  

validateTagName5() {
  if (/[/:.;,]/.test(this.tag5)) {
    alert("コロン(:)やスラッシュ(/)を含むことはできません。");
    this.tag5 = this.tag5.replace(/[/:,.;]/g, '');
  }
}
async Getter(){

  if(!this.genre){return}
  if((await getDoc(this.TutorialService.getAll().doc(this.genre).ref)).exists() 
  )
  { 
    alert("重複しないようにタスク名をつけてください");return
   }
   if (!this.isHalfWidthOnly(this.genre)||!this.isHalfWidthOnly(this.tag1)||!this.isHalfWidthOnly(this.tag2)||!this.isHalfWidthOnly(this.tag3)
    ||!this.isHalfWidthOnly(this.tag4)||!this.isHalfWidthOnly(this.tag5)) {
    alert('半角文字のみを使用してください');
    return; 
  }

else{
  console.log((await getDoc(this.TutorialService.getAll().doc(this.genre).ref)).exists())
  console.log((await getDoc(this.TutorialService.getAll().doc(this.genre.replaceAll(/[/:,.;]/g,'')).ref)).exists())
  console.log("ダブりなし");this.makeGenre()}
  this.tag1.replaceAll(/[/:,.;]/g, '')
  this.tag2.replaceAll(/[/:,.;]/g, '')
  this.tag3.replaceAll(/[/:,.;]/g, '')
  this.tag4.replaceAll(/[/:,.;]/g, '')
  this.tag5.replaceAll(/[/:,.;]/g, '')
  this.genre.replaceAll(/[/:,.;]/g, '')
};
  subCollections:any
  doublechecker=true
makeGenre(){
  let auth = getAuth();

  let UserAddress = auth.currentUser?.email
  if(!UserAddress){return}
 if(this.doublechecker==false){this.doublechecker=true;return}
if(this.tag1){
   this.TutorialService.getAll().doc(this.genre).collection("tagList").doc(this.tag1).set({})}
   if(this.tag2){this.TutorialService.getAll().doc(this.genre).collection("tagList").doc(this.tag2).set({})}
   if(this.tag3){this.TutorialService.getAll().doc(this.genre).collection("tagList").doc(this.tag3).set({})}
   if(this.tag4){   this.TutorialService.getAll().doc(this.genre).collection("tagList").doc(this.tag4).set({})}
   if(this.tag5){ this.TutorialService.getAll().doc(this.genre).collection("tagList").doc(this.tag5).set({})}
   this.TutorialService.getAll().doc(this.genre).set({user:UserAddress})
  
  
  
  
  }




}
