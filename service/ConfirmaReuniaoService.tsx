import axios from "axios";
import { BaseService } from "./BaseService";


export class ConfirmaReuniaoService extends BaseService {

    constructor(){
        super("/confirma-presenca");
    }

}