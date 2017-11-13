import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HospedagemProvider } from '../../providers/hospedagem/hospedagem';

declare var google:any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;
  
  public hospedagens: any [];
  map: any;

  constructor(public navCtrl: NavController,
              public hosProvider: HospedagemProvider,) {

  }

  public getHospAll() {
    
    this.hosProvider.getAllHospedagem()
    .subscribe(
      (hospedagens) => {
        this.hospedagens = hospedagens.lista;
        this.getMarkers(this.hospedagens);  
      },
      (erros) => {
        console.log('Error', erros);
      }
    )  
  }

  public displayMap() {
    let latLng = new google.maps.LatLng(-3.7317914, -38.5114384);
    
        let mapOptions = {
          center: latLng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
  }

  public getMarkers(hospedagens) {
    console.log(hospedagens.length);
    for (let i = 0; i < hospedagens.length; i++) {
       this.addMarkers(hospedagens[i]);
    }

    
  }

  public addMarkers(hospedagem) {
    var infowindow = new google.maps.InfoWindow();
    var position = new google.maps.LatLng(hospedagem.latitude, hospedagem.longitude);
    var HospedagemMarker = new google.maps.Marker({position: position, title: hospedagem.nome});
    google.maps.event.addListener(HospedagemMarker, 'click', (function(HospedagemMarker) {
      return function() {
        infowindow.setContent(hospedagem.nome);
        console.log(hospedagem);
        infowindow.open(this.map, HospedagemMarker);
      }
    })(HospedagemMarker));
    console.log(hospedagem.nome);
    HospedagemMarker.setMap(this.map);

}

  ionViewDidLoad() {
    this.displayMap();
    this.getHospAll();
    console.log(this.mapRef);
    console.log('ionViewDidLoad Hospedagem');
  }

}
