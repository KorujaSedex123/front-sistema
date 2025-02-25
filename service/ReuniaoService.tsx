import axios from "axios";
import { BaseService } from "./BaseService";


export class ReuniaoService extends BaseService {

    constructor(){
        super("/reuniao");
    }

}