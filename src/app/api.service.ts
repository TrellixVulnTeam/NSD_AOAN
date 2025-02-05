import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  newlist: any;
  multiplex_id() {
    throw new Error('Method not implemented.');
  }
  removeWishList() {
    throw new Error('Method not implemented.');
  }
  recomendedWishList() {
    throw new Error('Method not implemented.');
  }
  redirectUrl: string;
  // env.env.baseUrl:string = "https://newocoin.app/php";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  user_data: any;
  previewData: object;  //knockout file

  data: any;
  env = environment;
  sanitizer: any;

  constructor(private httpClient: HttpClient, private route: Router, sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  public userlogin(email, password, lat, lng) {
    //alert(mobile);
    //alert(password);
    return this.httpClient.post<any>(this.env.baseUrl + '/login.php', { email, password, lat, lng })

  }

  public resetPassword(email) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'resetpass/' + email);
  }


  public userregistration(action_type, name, countryList, phone, email, pwd) {

    const signupFrmData: FormData = new FormData();
    signupFrmData.append('action_type', action_type);
    signupFrmData.append('name', name);
    signupFrmData.append('countryList', countryList);
    signupFrmData.append('phone', phone);
    signupFrmData.append('email', email);
    signupFrmData.append('pwd', pwd);

    return this.httpClient.post<any>(this.env.baseUrl + '/register.php', signupFrmData)
      .pipe(map(Users => {
        this.setToken(email);
        localStorage.setItem('country_code', countryList);
        return Users;
      }));
  }

  public getCountryList(action_type) {
    return this.httpClient.get<any>(this.env.baseUrl + '/register.php', { params: { action_type } });
  }
  public getISD(action_type) {
    return this.httpClient.get<any>(this.env.baseUrl + '/register.php', { params: { action_type } });
  }

  // public payment_subscription(type,referrarid) {
  //   var useremail:string = this.getToken();
  //   return this.httpClient.post<any>(this.env.baseUrl + '/payment.php', { type,referrarid,useremail });
  // }

  public handelCreateEncryption(objUserData) {
    return this.httpClient.post<any>(this.env.baseUrl + '/payment.php', { userdata: objUserData });
  }

  public usersubscribe(netwood_email, games_email, starhunt_email) {

    var primary: string = this.getToken();

    var netwoodemail: string = netwood_email;
    var gamesemail: string = games_email;
    var starhuntemail: string = starhunt_email;

    var count: number = 0;
    if (primary == netwoodemail) count++;
    if (primary == gamesemail) count++;
    if (primary == starhuntemail) count++;
    if (count == 0)
      alert("subscribe atleast one primary numbr");
    else
      return this.httpClient.post<any>(this.env.baseUrl + '/usersubscription.php', { primary, netwoodemail, gamesemail, starhuntemail });

  }

  public userSubcription() {
    var loggedEmail: string = this.getToken();
    let type: string = 'checkSubcription';
    return this.httpClient.post<any>(this.env.baseUrl + '/loginaccess.php', { type, loggedEmail });
  }

  public checkOtt(ott) {
    var loggedEmail: string = this.getToken();
    var type: string = ott;
    return this.httpClient.post<any>(this.env.baseUrl + '/loginaccess.php', { type, loggedEmail });
  }

  public checkGame(game) {
    var loggedEmail: string = this.getToken();
    var type: string = game;
    return this.httpClient.post<any>(this.env.baseUrl + '/loginaccess.php', { type, loggedEmail });
  }

  public ott_sso_register(ott_username) {
    var type: string = 'register';
    return this.httpClient.post<any>(this.env.baseUrl + '/ott_sso.php', { type, ott_username });
  }

  public ott_sso_login(ott_username) {
    return this.httpClient.post<any>(this.env.baseUrl + '/ott_sso.php', { ott_username });
  }

  public userInSubcription(loggedEmail) {
    let type: string = 'checkUserSubcription';
    return this.httpClient.post<any>(this.env.baseUrl + '/loginaccess.php', { type, loggedEmail });
  }




  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('country_code');
    localStorage.removeItem('subscription_end_date');

  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }

  /* list:any;
    this.taskapi.usersubscribe().subscribe((response)=>{
         this.list = response;
        //here you will get the response
    console.warn(list);
    }); */

  public sendData(data) {
    this.user_data = data;
  }
  public acceptData() {
    return this.user_data;
  }

  public getValueForPreview() {
    return this.previewData;
  }

  public fetchCreatorsDetails() {
    const action_type: string = "fetch_creators_details"
    return this.httpClient.post<any>(this.env.baseUrl + '/fetch_creatots_details.php', { action_type });

  }

  /*----------- Service Durba Start ------------ */

  public postCreatorForm(creator_user_name, email, creator_dob, creator_topic, creator_desc, creator_profile_pic) {

    const formData: FormData = new FormData();
    formData.append('creator_user_name', creator_user_name);
    formData.append('creator_topic', creator_topic);
    formData.append('creator_desc', creator_desc);
    formData.append('creator_dob', creator_dob);
    formData.append('email', email);
    formData.append('file', creator_profile_pic, creator_profile_pic.name);

    return this.httpClient.post<any>(this.env.baseUrl + '/creator_form_submit.php', formData).subscribe((res) => {
      alert(res.msg);
    })

  }

  public checkCreator(email) {
    // alert (email);
    const action_type = "check_creator";
    return this.httpClient.post<any>(this.env.baseUrl + '/creator_check.php', { email, action_type }).subscribe((res) => {
      if (res.status === "user_exists") {
        alert("You have already joined as creator");
        this.route.navigate(['/creatorcontent']);
      }
      else {
        alert("Welcome to creator page");
        this.route.navigate(['/joinascreator']);
      }
    })

  }


  public postAddCreatorForm(video, video_title, video_desc, image, genreList, languageList, year, cast, director, writer, camera, runtime, audiance) {

    const email = localStorage.getItem('token');
    const creatorformData: FormData = new FormData();

    creatorformData.append('email', email);

    creatorformData.append('action_type', "creatorVideoSubmit");
    creatorformData.append('file', video);
    creatorformData.append('video_title', video_title);
    creatorformData.append('video_desc', video_desc);
    creatorformData.append('img', image);
    creatorformData.append('genreList', genreList);
    creatorformData.append('languageList', languageList);
    creatorformData.append('year', year);
    creatorformData.append('cast', cast);
    creatorformData.append('director', director);
    creatorformData.append('writer', writer);
    creatorformData.append('camera', camera);
    creatorformData.append('runtime', runtime);
    creatorformData.append('audiance', audiance);
    // console.log(creatorformData);

    return this.httpClient.post<any>(this.env.baseUrl + '/add_creator_form_submit.php', creatorformData);

  }

  public getGenreList(action_type) {
    return this.httpClient.get<any>(this.env.baseUrl + '/add_creator_form_submit.php', { params: { action_type } });
  }

  public getLanguageList(action_type) {
    return this.httpClient.get<any>(this.env.baseUrl + '/add_creator_form_submit.php', { params: { action_type } });
  }

  public creatorList(action_type) {
    const email = localStorage.getItem('token');
    return this.httpClient.get<any>(this.env.baseUrl + '/creator_detail.php', { params: { email, action_type } });
  }

  public creatorContentDetail(id) {
    const action_type = "creator_content_details";
    const detailformData: FormData = new FormData();
    detailformData.append('action_type', action_type);
    detailformData.append('id', id);
    return this.httpClient.post<any>(this.env.baseUrl + '/creator_detail.php', detailformData);
  }

  public fetchCreatorData(id) {
    const action_type = "fetch_creator_data";
    return this.httpClient.get<any>(this.env.baseUrl + '/creator_detail.php', { params: { id, action_type } });

  }

  public postEditCreatorForm(id, video, video_title, video_desc, image, genreList, languageList, year, cast, director, writer, camera, runtime, audiance) {
    console.log("video_title" + video_title);
    const creatorformData: FormData = new FormData();
    creatorformData.append('id', id);
    creatorformData.append('action_type', "editCreatorVideo");
    creatorformData.append('file', video);
    creatorformData.append('video_title', video_title);
    creatorformData.append('video_desc', video_desc);
    creatorformData.append('img', image);
    creatorformData.append('genreList', genreList);
    creatorformData.append('languageList', languageList);
    creatorformData.append('year', year);
    creatorformData.append('cast', cast);
    creatorformData.append('director', director);
    creatorformData.append('writer', writer);
    creatorformData.append('camera', camera);
    creatorformData.append('runtime', runtime);
    creatorformData.append('audiance', audiance);
    return this.httpClient.post<any>(this.env.baseUrl + '/add_creator_form_submit.php', creatorformData);

  }
  /* ---------------- Service Durba End --------------------*/
  public fetchCreatorVideoData(video_code) {
    let action_type = "fetch_cretor_video";
    return this.httpClient.post<any>(this.env.baseUrl + '/fetch_creatots_details.php', { video_code, action_type });
  }

  public fetchVideoData(slug) {
    const action_type = "fetch_watch_details";
    return this.httpClient.get<any>(this.env.baseUrl + '/fetch_watch_details.php', { params: { action_type, slug } });

  }

  public paymentResponse() {
    return this.httpClient.get<any>(this.env.appUrl + '#/payment_success');
  }

  public profileData(local_email) {
    let action_type: string = "fetch_profile_data";
    let email: any = local_email;
    return this.httpClient.post<any>(this.env.baseUrl + '/profile.php', { action_type, email });

  }


  public chngpwdForm(email, old_password, new_password) {
    let action_type = "change_password";
    return this.httpClient.post<any>(this.env.baseUrl + '/profile.php', { action_type, email, old_password, new_password });

  }

  public chngphnForm(email, new_phone, otp) {

    let action_type = "change_phone";

    return this.httpClient.post<any>(this.env.baseUrl + '/profile.php', { action_type, email, new_phone, otp });

  }

  public otpGenerate(email) {
    let action_type = "otp";
    return this.httpClient.post<any>(this.env.baseUrl + '/profile.php', { action_type, email });
  }

  public businessList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'rssfeed');

    // return this.httpClient.get<any>('https://api.mediastack.com/v1/news?access_key=62267afed30842b7cc100cb529c9d316&keywords=business&countries=us');
  }


  public entertainmentList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'rssfeed');

    // return this.httpClient.get<any>(this.settings);

    // return this.httpClient.get<any>('https://api.mediastack.com/v1/news?access_key=62267afed30842b7cc100cb529c9d316&keywords=entertainment&countries=us');
  }

  // public entertainmentList(){
  //   // return this.httpClient.get<any>('https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=49c9715ef8634e48842df52e0451504f');

  //   return this.httpClient.get<any>('https://api.mediastack.com/v1/news?access_key=62267afed30842b7cc100cb529c9d316&keywords=entertainment&countries=us');
  // }

  public sportsList() {
    // return this.httpClient.get<any>('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=49c9715ef8634e48842df52e0451504f');

    return this.httpClient.get<any>('https://api.mediastack.com/v1/news?access_key=62267afed30842b7cc100cb529c9d316&keywords=sports&countries=us');
  }


  public topList() {
    //   return this.httpClient.get<any>('https://newsapi.org/v2/top-headlines?country=in&apiKey=49c9715ef8634e48842df52e0451504f');\
    return this.httpClient.get<any>('https://api.mediastack.com/v1/news?access_key=62267afed30842b7cc100cb529c9d316&countries=us');

  }

  public activeDateUpdate(active_date) {
    const userEmail = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'saveactivedate', { userEmail, active_date });
  }

  public getcountry(lat, lng) {
    return this.httpClient.get<any>('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lng);

  }

  public ottBannerList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showbanner');
  }

  public ottLatestList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showlatest');
  }

  public homeLatestPoster() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showhomeposter');
  }
  public ottQuickyList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showquicky');
  }

  public ottShortsList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showshorts');
  }

  public ottCNEList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showcne');
  }

  public ottWmdList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showwmd');
  }

  public ottMusicList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showmusic');
  }
  
  public ottWEBList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showwebs');
  }

  public ottVideoDetail(id) {
    const userEmail = localStorage.getItem('token');
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showvideodetail/' + id + '/' + userEmail);
  }

  public ottepisodeDetail(epId,typeId,seasonId) {
    if(typeId == 1){
      return this.httpClient.get<any>(this.env.laravel_api_url + 'showwebswpisode/' + seasonId);
    }
    else{
      return this.httpClient.get<any>(this.env.laravel_api_url + 'showcnepisode/' + epId);
    } 
  }

  public ottseriesDetail(epId,typeId,seasonId,seriesId) {    
      return this.httpClient.get<any>(this.env.laravel_api_url + 'showwebsseries/' + seriesId);
  }

  public ottseriesSeasonDetail(seasonId,seriesId) {    
    return this.httpClient.get<any>(this.env.laravel_api_url + 'showwebsseriesseason/' + seasonId+ '/' + seriesId);
}

  

  public walletAdd(vId, category, action, userEmail) {
    return this.httpClient.post<any>(this.env.laravel_api_url + 'addtowallet', { vId, category, action, userEmail });
  }

  public watchTime(video_id, play_time) {
    const userEmail = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'savepausetime', { video_id, userEmail, play_time });
  }


  public pauseTime(video_id) {
    const userEmail = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'getpausetime', { video_id, userEmail });
  }

  public resumeList() {
    const userEmail = localStorage.getItem('token');
    return this.httpClient.get<any>(this.env.laravel_api_url + 'getresumelist/' + userEmail);
  }

  public blogsList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'bloglist');
  }

  public blogsDetail(id) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'blogdetail/' + id);
  }

  getReferralList() {
    const email = localStorage.getItem('token');
    return this.httpClient.get<any>(this.env.laravel_api_url + 'getreferraldata/' + email);
  }

  public walletList() {
    const email = localStorage.getItem('token');
    return this.httpClient.get<any>(this.env.laravel_api_url + 'walletdetails/' + email);
  }

  public referralGenerate(email) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'referralcode/' + email);
  }

  public verifycode(code) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'verifycode/' + code);
  }

  public verifycoupon(code) {
    const email = localStorage.getItem('token');
    return this.httpClient.get<any>('https://dreamnewo.com/api/get-member-status?email=' + email + '&referral=' + code);
  }

  // public couponsubscription() {
  //   const email = localStorage.getItem('token');
  //   return this.httpClient.get<any>(this.env.laravel_api_url + 'couponsubscription/' + email);
  // }

  public couponsubscription(code) {
    const email = localStorage.getItem('token');
    // return this.httpClient.get<any>(this.env.laravel_api_url + 'couponsubscription/' + email);
    return this.httpClient.get<any>(this.env.laravel_api_url + 'couponsubscription/' + email + '/' + code);
  }


  /*--------------------------------------------------------------- Reward Start ------------------------------------------------*/
  public rewardList() {
    const email = localStorage.getItem('token');
    return this.httpClient.get<any>(this.env.laravel_api_url + 'rewardlist/' + email);
  }

  public getRewardData(id) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'rewarddata/' + id);
  }

  public activateReward(rewardId) {
    const email = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'activatereward', { rewardId, email });
  }
  /*---------------------------------------------------------------- Reward End -------------------------------------------------*/


  // public verifycoupon(code){
  //   const email = localStorage.getItem('token');    

  //   // const vcode=encodeURI(email);
  //   // return this.httpClient.get<any>('https://dreamnewo.com/api/get-member-status?email='+vcode+'&referral='+code);
  //   // const vcode=encodeURI('https://dreamnewo.com/api/get-member-status?email='+email+'&referral='+code);    
  //   // const vcode=this.getSafeUrl('https://dreamnewo.com/api/get-member-status?email='+email+'&referral='+code);

  //   const vcode= this.sanitizer.bypassSecurityTrustResourceUrl('https://dreamnewo.com/api/get-member-status?email='+email+'&referral='+code);
  //   return this.httpClient.get<any>(vcode);

  //   // return this.httpClient.get<any>('https://dreamnewo.com/api/get-member-status?email='+email+'&referral='+code);

  // }

  public gameList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'gamelist');
  }

  public gamePayment(game_id) {
    const user_email = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'gamepayment', { game_id, user_email });
  }
  public getGameUrl(game_id) {
    // const userEmail=localStorage.getItem('token');   
    return this.httpClient.post<any>(this.env.laravel_api_url + 'gameurl', { game_id });
  }


  public insertgamescore(game_id, score) {
    const userEmail = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'savegamescore', { userEmail, game_id, score });
  }

  public updatePflForm(user_name) {

    let action_type = 'updateProfile';
    const useremail = localStorage.getItem('token');
    const profileData: FormData = new FormData();
    profileData.append('action_type', action_type);
    profileData.append('user_name', user_name);
    profileData.append('email', useremail);
    //profileData.append('img',imgFile);

    //formData.append('file',profile_pic, profile_pic.name);profileData.append('action_type',action_type);

    // return this.httpClient.post<any>(this.env.baseUrl+'/profile_update.php',profileData);
    // return this.httpClient.post<any>(this.env.baseUrl+'/profile.php', {email,user_name,profile_pic});
    return this.httpClient.post<any>(this.env.baseUrl + '/profile.php', { action_type, user_name, useremail });

    

  }

  /*...........................Multiplex........................*/ 
  multiplexList(){
    const user_email = localStorage.getItem('token');
    
      return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-list?user_email='+user_email);
     }
    public addMultiplexWishlist(multiplex_id:any){
      //  alert(multiplex_id);
            const user_email = localStorage.getItem('token');
            // alert(user_email);
            return this.httpClient.post<any>(this.env.laravel_api_url+'add-multiplex-wishlist',{multiplex_id,user_email});
        }
public removeMultiplexWishlist(multiplex_id:any){
    //  alert(multiplex_id);
          const user_email = localStorage.getItem('token');
          // alert(user_email);
          return this.httpClient.post<any>(this.env.laravel_api_url+'remove-multiplex-wishlist',{multiplex_id,user_email});
      }

      wishList(){
        const user_email = localStorage.getItem('token');
        return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-wishlist?user_email='+user_email);
       } 

      
        multiplexCheckout(multiplex_id){

         const user_email = localStorage.getItem('token');
         return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-checkout?multiplex_id='+multiplex_id+'&user_email='+user_email);

        }


        viewAllWishList(){
          const user_email = localStorage.getItem('token');
          return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-recommended-view-all-list?user_email='+user_email);
         } 
  
         upcomingViewAllList()
         {
         
          return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-upcoming-view-all-list');
         }


  public multiplexCreateEncryption(objUserData) {
      return this.httpClient.post<any>(this.env.baseUrl + '/multiplex_payment.php', { userdata: objUserData });
  }



  public activateLeadBonus(leadCoupon) {
    const userEmail = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'saveleadcoupon', { userEmail, leadCoupon });
  }

  purchaseList(){
    const user_email = localStorage.getItem('token');
    // alert(user_email);
      return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-purchase-list?user_email='+user_email);
     }

multiplexVideoPlay(multiplex_id)
{
 
  const user_email = localStorage.getItem('token');
  return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-video-view-details?user_email='+user_email+'&multiplex_id='+multiplex_id);
}


multiplexTrendingList()
{
  const user_email = localStorage.getItem('token');
  return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-tending-list?user_email='+user_email);
}

multiplexNewList()
{
  const user_email = localStorage.getItem('token');
  return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-new-list?user_email='+user_email);
}


multiplexPurchaseList()
{
  const user_email = localStorage.getItem('token');
  return this.httpClient.get<any>(this.env.laravel_api_url+'multiplex-purchase-list?user_email='+user_email);
}

  /* Hashtag */
  hashtagcampaignList(email) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'campign-list/' + email);
  }

  hashtagcampaignDetailsList(id, userEmail) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'campign-details-list/' + id + '/' + userEmail);
  }

  addacceptcampaign(formdata,userid, campaignid) {
    return this.httpClient.post<any>(this.env.laravel_api_url + 'accept-campaign-by-user', { formdata,userid, campaignid });
  }

  categoryMasterList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'hashtag-category-master');
  }

  hashtagUserRegis(category, link, email) {
    return this.httpClient.post<any>(this.env.laravel_api_url + 'hashtag-user-registration', { category, link, email });
  }

  CountryList() {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'get-country-list');
  }

  addUserDetails(userdata, email) {
    return this.httpClient.post<any>(this.env.laravel_api_url + 'hashtag-user-details-add', { userdata, email });
  }

  hashtagmyallcampaignList(email) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'hashtag-my-all-campaign/' + email);
  }

  addSocialDetails(userdata, emails) {
    return this.httpClient.post<any>(this.env.laravel_api_url + 'add-hashtag-campaign-social-link', { userdata, emails });
  }

  getaddUserBankDetails(email) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'get-hashtag-user-bank-details/' + email);
  }

  addUserBankDetails(userdata, email) {
    return this.httpClient.post<any>(this.env.laravel_api_url + 'hashtag-user-bank-details-add', { userdata, email });
  }

  hashtagAddSocialAndAdress(userdata,campaign_id, email) {
    return this.httpClient.post<any>(this.env.laravel_api_url + 'hashtag-social-address-add', { userdata,campaign_id,email });
  }

  hashtagProfileGet(email) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'get-hashtag-user-details/' + email);
  }
  addAcceptCampaignBefore(email,campaign_id) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'hashtag-accept-campaign-before/' + email + '/' + campaign_id);
  }  
  getUserInterestAndSocial(email) {
    return this.httpClient.get<any>(this.env.laravel_api_url + 'hashtag-user-interest-social-get/' + email);
  }
    public spinPayment() {
    const user_email = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'spin-transaction', {user_email});
  }
  public priceToSpin() {
    const user_email = localStorage.getItem('token');
    return this.httpClient.get<any>(this.env.laravel_api_url + 'spin-use-coin/' + user_email);
  }

  rechagewallet(){
    return this.httpClient.get<any>(this.env.laravel_api_url+'recharge-wallet-list');
  }

  /*------------------------------------------------- Recharge Payment Start------------------------------------------------*/
  handelRechargeCreateEncryption(objUserData){
    return this.httpClient.post<any>(this.env.baseUrl + '/recharge_payment.php', { userdata: objUserData });
  }
  /*-------------------------------------------------- Recharge Payment End ------------------------------------------------*/

  public notificationList() {
    const email = localStorage.getItem('token');
    // return this.httpClient.get<any>(this.env.laravel_api_url + 'notificationList');
    return this.httpClient.get<any>(this.env.laravel_api_url + 'notificationList/' + email);
  }

  public notificationCount() {
    const email = localStorage.getItem('token');
    // return this.httpClient.get<any>(this.env.laravel_api_url + 'notificationCount');
     return this.httpClient.get<any>(this.env.laravel_api_url + 'notificationCount/' + email);
  }

  public redeemCoin(wallet,metamask,trust_wallet){
    const email = localStorage.getItem('token');
    return this.httpClient.post<any>(this.env.laravel_api_url + 'redeem_coin', {email,wallet,metamask,trust_wallet});
  }
  
}
function imgFile(arg0: string, imgFile: any) {
  throw new Error('Function not implemented.');
}

