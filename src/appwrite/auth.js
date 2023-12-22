import config from "../conf/config";
import { ID, Client, Account } from "appwrite";


export class AuthService{
     client = new Client();
     account;

     constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
     }

     async createAccount({email, password, name}){
        try {
           const userAccount = await this.account.create(ID.unique, email, password, name);

           if (userAccount) {
                // calling login method if the user is successfully registered so that the user can login directly.
                this.login({email, password});
                // this will login the user if the user is successfully registered.
           } else {
            return userAccount;
           }

        } catch (error) {
            throw error;
        }
     }

     async login({email, password}){
        try {
           return this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
     }

     async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
     }

     async getCurrentLogin(){
        try {
            return this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
     }
}

const authService = new AuthService();

export default authService;