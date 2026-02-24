import { Injectable } from "@nestjs/common";
import { AUTH_USER_REGISTER_EVENT } from "../events/user-registered.event";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class SendUserRegisteredEventHandler {
    constructor(
        //notre config
        //@Inject(AUTH_MAILER)
    ){}

    @OnEvent(AUTH_USER_REGISTER_EVENT)
    async handle (payload){
        console.log(payload)
    }
}