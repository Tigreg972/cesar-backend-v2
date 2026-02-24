export const AUTH_USER_REGISTER_EVENT = 'auth.user.registered'

export class UserRegisteredEvent {
    static eventName = AUTH_USER_REGISTER_EVENT

    static create(payload: any){
        return{
            name: UserRegisteredEvent.eventName,
            payload
        }
    }
}