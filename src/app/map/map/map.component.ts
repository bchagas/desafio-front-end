import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusService } from '../../services/event-bus.service';
import { AppConsts } from '../../app.consts';

declare var L: any;
declare var mplk: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  subscription: any;

  mapOptions = {
    selector: 'map',
    startZoom: 13,
    center: [ -23.55392, -46.63078 ]
  };

  routeOptions = {
    from: null,
    to: null,
    results: ['summary.tolls', 'summary.distance', 'summary.duration']
  };

  public mapLocation = this.mapOptions.selector;
  public map = null;

  constructor(
    public eventBus: EventBusService
  ) { }

  ngOnInit() {
    const zoom = this.mapOptions.startZoom;
    const center = this.mapOptions.center;

    this.map = L.map(this.mapLocation);
    this.map.setView(center, zoom);

    mplk.mapLayer().addTo(this.map);

    this.subscription = this.eventBus.receivedData.subscribe(event => {
      if (event.action === AppConsts.SET_DIRECTION) {
        const location = event.data.location;
        this.routeOptions[event.direction] = `${location.lat},${location.lng}`;

        if (!this.routeOptions.from || !this.routeOptions.to) { return; };
        this.setRoute(this.routeOptions);
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setRoute(routeOptions) {
    const myRoute = mplk.route(routeOptions);

    myRoute.on('done', function (event) {
      this.eventBus.post({ action: AppConsts.UPDATE_INFO, data: event.routes[0].summary });
    }.bind(this));

    myRoute.removeFromMap();
    myRoute.addTo(this.map);
  }
}

