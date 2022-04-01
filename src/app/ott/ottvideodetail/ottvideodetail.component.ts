import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-ottvideodetail',
  templateUrl: './ottvideodetail.component.html',
  styleUrls: ['./ottvideodetail.component.css']
})
export class OttvideodetailComponent implements OnInit {

  env=environment;
  ottVideoData: any;
  id: string;
  video_link: string;
  video_name: string;
  video_starring: string;
  video_type: string;
  video_genere: string;
  final_video_url: string ;


  constructor(private dataService: ApiService,private route:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ottDetail();
  }
  
  ottDetail(){ 
    
    this.id= this.activatedRoute.snapshot.params['id']; 
    this.dataService.ottVideoDetail(this.id).subscribe((result) => {
      this.ottVideoData = result;

      this.video_link = this.ottVideoData[0].media;
      this.video_name = this.ottVideoData[0].name;
      this.video_starring = this.ottVideoData[0].stars;
      this.video_type = this.ottVideoData[0].type_name;
      this.video_genere = this.ottVideoData[0].genere_name;
      this.final_video_url = this.env.AWS_VIDEO_URL+this.video_link;

      const video = <HTMLVideoElement>(document.querySelector('#vidId'));
      video.src = this.final_video_url;
      video.addEventListener('ended',function() {
        if(this.played.end(0) - this.played.start(0) === this.duration) {
          console.log("Played all");
        }else {
          console.log("Some parts were skipped");
        }
      })
    });    
  }

}
