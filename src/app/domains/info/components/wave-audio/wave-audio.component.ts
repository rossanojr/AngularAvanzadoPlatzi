import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  signal,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import WaveSurfer from "wavesurfer.js";

@Component({
  selector: "app-wave-audio",
  imports: [CommonModule],
  templateUrl: "./wave-audio.component.html",
})
export class WaveAudioComponent implements AfterViewInit {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild("wave") container!: ElementRef;
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit() {
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement,
    });
    this.ws.on("play", () => this.isPlaying.set(true));
    this.ws.on("pause", () => this.isPlaying.set(false));
  }

  playPause() {
    this.ws.playPause();
  }
}
