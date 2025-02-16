import { Component, OnInit } from '@angular/core';

interface Song {
  title: string;
  artist: string;
  url: string;
}

@Component({
  selector: 'app-player',
  standalone: true,
  template: `
    <div class="card bg-base-100">
      <div class="card-body">
        <div class="text-center mb-4">
          <h2 class="card-title justify-center">{{ currentSong.title }}</h2>
          <p class="text-sm opacity-70">{{ currentSong.artist }}</p>
        </div>
        <audio
          #audioPlayer
          [src]="currentSong.url"
          (timeupdate)="onTimeUpdate()"
          (ended)="onSongEnd()"
        ></audio>
        <div
          class="w-full h-2 bg-base-200 rounded-full cursor-pointer"
          (click)="seek($event)"
        >
          <div
            class="bg-primary h-2 rounded-full"
            [style.width.%]="(currentTime / duration) * 100"
          ></div>
        </div>

        <div class="flex justify-between text-sm opacity-70">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>

        <div class="flex justify-center items-center gap-4 mt-4">
          <button
            class="btn btn-circle btn-sm btn-secondary"
            (click)="previousSong()"
          >
            <svg
              class="w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </button>

          <button class="btn btn-circle btn-primary" (click)="togglePlay()">
            @if (!isPlaying) {
            <svg
              class="w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
              />
            </svg>
            } @else {
            <svg
              class="w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
              />
            </svg>
            }
          </button>

          <button
            class="btn btn-circle btn-sm btn-secondary"
            (click)="nextSong()"
          >
            <svg
              class="w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              />
            </svg>
          </button>
        </div>

        <!--         <div class="mt-4 max-h-48 overflow-y-auto">
          @for (song of playlist; track song.url; let i = $index) {
          <div
            class="flex items-center p-2 hover:bg-base-200 rounded-lg cursor-pointer"
            [class.bg-base-200]="currentSongIndex === i"
            (click)="playSong(i)"
          >
            <div class="flex-1">
              <div class="font-medium">{{ song.title }}</div>
              <div class="text-sm opacity-70">{{ song.artist }}</div>
            </div>
          </div>
          }
        </div> -->
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
      }
    `,
  ],
})
export class PlayerComponent implements OnInit {
  playlist: Song[] = [
    {
      title: 'Song 1',
      artist: 'Artist 1',
      url: 'music/song01.mp3',
    },
    {
      title: 'Song 2',
      artist: 'Artist 2',
      url: 'music/song02.mp3',
    },
    {
      title: 'Song 3',
      artist: 'Artist 3',
      url: 'music/song03.mp3',
    },
    {
      title: 'Song 4',
      artist: 'Artist 4',
      url: 'music/song04.mp3',
    },
    {
      title: 'Song 5',
      artist: 'Artist 5',
      url: 'music/song05.mp3',
    },
    {
      title: 'Song 6',
      artist: 'Artist 6',
      url: 'music/song06.mp3',
    },
    {
      title: 'Song 7',
      artist: 'Artist 7',
      url: 'music/song07.mp3',
    },
    {
      title: 'Song 8',
      artist: 'Artist 8',
      url: 'music/song08.mp3',
    },
  ];

  currentSongIndex = 0;
  currentSong: Song = this.playlist[0];
  isPlaying = false;
  currentTime = 0;
  duration = 0;

  private audio!: HTMLAudioElement;

  ngOnInit() {
    this.audio = document.querySelector('audio')!;
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  playSong(index: number) {
    this.currentSongIndex = index;
    this.currentSong = this.playlist[index];
    this.isPlaying = true;
    setTimeout(() => {
      this.audio.play();
    });
  }

  previousSong() {
    const newIndex =
      this.currentSongIndex > 0
        ? this.currentSongIndex - 1
        : this.playlist.length - 1;
    this.playSong(newIndex);
  }

  nextSong() {
    const newIndex =
      this.currentSongIndex < this.playlist.length - 1
        ? this.currentSongIndex + 1
        : 0;
    this.playSong(newIndex);
  }

  onTimeUpdate() {
    this.currentTime = this.audio.currentTime;
  }

  onSongEnd() {
    this.nextSong();
  }

  seek(event: MouseEvent) {
    const element = event.currentTarget as HTMLDivElement;
    const rect = element.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    this.audio.currentTime = percent * this.duration;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
