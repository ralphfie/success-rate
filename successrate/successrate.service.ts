import { HttpService, Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { plainToClass } from 'class-transformer';
import { stringify } from 'querystring';
import { OutputEntity } from './entities/output.entitiy';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJSMTAyMTgiLCJpYXQiOjE2MDAzMDg2MzIsImV4cCI6MTYwMDMxMjIzMn0.cn9zZwY9vEFsPQqh99KZveEK2VJUy-X_3PIwKtoHeow';
const fiberHttp = 'https://camelia.tm.com.my:1880/fylia/api/report/scheduler_successrate_service?date=17-09-2020';
const copperHttp = 'https://camelia.tm.com.my:1880/dylia/api/report/scheduler_successrate_service?date=17-09-2020&network=all';

@Injectable()
export class SuccessrateService {
    constructor(private readonly client:HttpService){}
    //fetch desired data
    async getSuccessRateFiber(){
        try {
            const obs$ = this.client.get(
              fiberHttp,
              {
                headers: {Authorization:token}
              }
            );
           const output = await obs$.toPromise();
           const test = plainToClass(OutputEntity,output.data) ;
           const high = [];
           const low = [];
           test.data.forEach(element => {
               if (element.poller_success_rate > 90) {
                   console.log(`The Highest Percentange | Region ${element.region} :` + element.poller_success_rate);
                   high.push(element.region , element.poller_success_rate);
               } else {
                   console.log(`The Lowers Percentage | Region ${element.region} :` + element.poller_success_rate);
                   low.push( element.region , element.poller_success_rate);
                }
           });
           var myJSON = JSON.stringify(low)  //convert object to json
           console.log(myJSON)
           return myJSON
         //return {Lowest_Percentange: low}; 
        } catch (e) {return e}
    }
    //
}