import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

declare var require: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  people = require('../../audios.json');

  constructor(public navCtrl: NavController) {}

  openAudioList(audioList, name, slug) {
    this.navCtrl.push(AudioListPage, { audioList, name, slug });
  }
}

@Component({
  selector: 'audio-list',
  templateUrl: 'audio-list.html',
})
export class AudioListPage {
  audioList;
  name;
  slug;
  audiosPlayed = [];

  constructor(params: NavParams, private nativeAudio: NativeAudio) {
    this.audioList = params.data.audioList;
    this.name = params.data.name;
    this.slug = params.data.slug;
  }

  ionViewWillEnter() {
    for(let i = 0; i <= this.audioList.length - 1; i++){
      this.nativeAudio.preloadSimple(this.audioList[i].name, `assets/audios/${this.slug}/${this.audioList[i].file}`);
    }
  }

  ionViewWillLeave() {
    for(let i = 0; i <= this.audioList.length - 1; i++){
      this.nativeAudio.unload(this.audioList[i].name);
    }
  }

  playAudio(audioName){
    this.destroyAudios();
    this.audiosPlayed.push(audioName);
    this.nativeAudio.play(audioName, () => this.audiosPlayed = []);
  }

  destroyAudios() {
    if(this.audiosPlayed.length > 0){
      this.nativeAudio.stop(this.audiosPlayed[0]);
    }

    this.audiosPlayed = [];
  }
}