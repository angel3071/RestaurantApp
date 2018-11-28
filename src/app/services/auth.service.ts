import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth,
    private router: Router) {
      this.user = _firebaseAuth.authState;
      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          } else {
            this.userDetails = null;
          }
        }
      );
     }


     signWithGoogle(){
       return this._firebaseAuth.auth.signInWithPopup(
         new firebase.auth.GoogleAuthProvider()
       )
     }

     isLoggedIn(){
       return this.userDetails != null;
     }

     logout(){
       this._firebaseAuth.auth.signOut()
       .then((res) => this.router.navigate(['/login']));
     }
     getDisplayName(){
       if(this.userDetails!=null)
        return this.userDetails.displayName;
        return '';
     }
     getProfileImg(){
       if(this.userDetails != null)
        return this.userDetails.photoURL;
       return 'assets/profile-photo.jpg';
     }
}
