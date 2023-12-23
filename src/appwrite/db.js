import config from "../conf/config";
import { ID, Client, Databases, Storage, Query } from "appwrite";

export class DBService{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, body, image, status, userId}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,{
                title,
                body,
                image,
                status, 
                userId
            })
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, body, image, status}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,{
                title,
                body,
                image,
                status
            })
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
           await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
           return true;
        } catch (error) {
           console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries)
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // File uploading services for image

    async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwriteBucketId,ID.unique(), file);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    }
}

const dbService = new DBService();
export default dbService;
