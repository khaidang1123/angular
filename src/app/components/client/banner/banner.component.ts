import { Component, OnInit } from '@angular/core';
import { SliderService } from 'src/app/services/slider/slider.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  sliders: any
  constructor(
    private sls: SliderService
  ) { 
    this.runSlider()
  }

  ngOnInit(): void {
    this.sls.get().subscribe(data => {
      this.sliders = data
    }) 
    this.runSlider()
  }

  runSlider(){
    window.onload = () => {
      let counter = 1;
      let myslide = document.querySelectorAll('.main'),
      dot = document.querySelectorAll('.dot')
      function plusSlides(n: number) {
        counter += n;
        slidefun(counter);
        resetsetTime();
      }
      function currentSlide(n: number) {
        counter = n;
        slidefun(counter);
        resetsetTime();
      }
      function resetsetTime() {
        clearInterval(setTime);
        setTime = setInterval(autoSlide, 4000);
      }
  
      let setTime = setInterval(autoSlide, 4000);
      function autoSlide() {
        counter += 1;
        slidefun(counter);
      }
  
      (<HTMLDivElement>document.querySelector(".fa-chevron-left")).onclick = () => {
        plusSlides(-1)
      }
      (<HTMLDivElement>document.querySelector(".fa-chevron-right")).onclick = () => {
        plusSlides(1)
      }
      (<HTMLDivElement>document.querySelector("#dot1")).onclick = () => {
        currentSlide(1)
      }
      (<HTMLDivElement>document.querySelector("#dot2")).onclick = () => {
        currentSlide(2)
      }
      (<HTMLDivElement>document.querySelector("#dot3")).onclick = () => {
        currentSlide(3)
      }
  
      slidefun(counter)
      function slidefun(n: number): any {
        let i;
        for (i = 0; i < myslide.length; i++) {
          myslide[i].className = 'main';
        }
        for (i = 0; i < dot.length; i++) {
          dot[i].className = 'dot';
        }
        if (n > myslide.length) {
          counter = 1;
        }
        if (n < 1) {
          counter = myslide.length;
        }
        myslide[counter - 1].className = 'active_main';
        dot[counter - 1].className += " dot_active";
      };
    }
  }
  
}
